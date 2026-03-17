import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const repoRoot = process.cwd();
const artifactDir = path.join(
  repoRoot,
  "docs",
  "automation",
  "artifacts",
  "2026-03-17-studio-notes-shelf",
);
const serverUrl = "http://127.0.0.1:4173";
const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForServer(url, attempts = 40) {
  for (let index = 0; index < attempts; index += 1) {
    const ready = await new Promise((resolve) => {
      const request = http.get(url, (response) => {
        response.resume();
        resolve(response.statusCode && response.statusCode < 500);
      });
      request.on("error", () => resolve(false));
      request.setTimeout(1000, () => {
        request.destroy();
        resolve(false);
      });
    });

    if (ready) {
      return;
    }

    await wait(1000);
  }

  throw new Error(`Server at ${url} did not become ready in time.`);
}

async function captureState(page, fileName, selector) {
  const target = page.locator(selector);
  await target.scrollIntoViewIfNeeded();
  await target.screenshot({
    path: path.join(artifactDir, fileName),
  });
}

async function collectOverflow(page) {
  return page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyClientWidth: document.body.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));
}

async function main() {
  await fs.mkdir(artifactDir, { recursive: true });

  const server = spawn(
    "python",
    ["-m", "http.server", "4173", "--directory", "build", "--bind", "127.0.0.1"],
    {
      cwd: repoRoot,
      stdio: "ignore",
    },
  );

  try {
    await waitForServer(serverUrl);

    const browser = await chromium.launch({
      executablePath: chromePath,
      headless: true,
    });

    try {
      const desktopPage = await browser.newPage({
        viewport: { width: 1440, height: 1800 },
      });

      await desktopPage.goto(serverUrl, { waitUntil: "networkidle" });
      await captureState(desktopPage, "desktop-studio-notes-dark.png", "#studio-notes");
      await desktopPage.locator(".studio-notes-link").click();
      await desktopPage.waitForTimeout(500);
      await captureState(desktopPage, "desktop-games-dark.png", "#games");
      const desktopOverflowDark = await collectOverflow(desktopPage);

      await desktopPage.locator('button[aria-label="Toggle dark mode"]').click();
      await desktopPage.waitForTimeout(500);
      await captureState(desktopPage, "desktop-studio-notes-light.png", "#studio-notes");
      const desktopOverflowLight = await collectOverflow(desktopPage);
      await desktopPage.close();

      const mobilePage = await browser.newPage({
        viewport: { width: 390, height: 1440 },
        isMobile: true,
      });

      await mobilePage.goto(serverUrl, { waitUntil: "networkidle" });
      await captureState(mobilePage, "mobile-studio-notes-dark.png", "#studio-notes");
      await mobilePage.locator(".studio-notes-link").click();
      await mobilePage.waitForTimeout(500);
      await captureState(mobilePage, "mobile-games-dark.png", "#games");
      const mobileOverflowDark = await collectOverflow(mobilePage);

      await mobilePage.locator('button[aria-label="Toggle dark mode"]').click();
      await mobilePage.waitForTimeout(500);
      await captureState(mobilePage, "mobile-studio-notes-light.png", "#studio-notes");
      const mobileOverflowLight = await collectOverflow(mobilePage);
      await mobilePage.close();

      const verification = {
        desktop: {
          dark: desktopOverflowDark,
          light: desktopOverflowLight,
        },
        mobile: {
          dark: mobileOverflowDark,
          light: mobileOverflowLight,
        },
      };

      await fs.writeFile(
        path.join(artifactDir, "verification.json"),
        JSON.stringify(verification, null, 2),
      );
    } finally {
      await browser.close();
    }
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

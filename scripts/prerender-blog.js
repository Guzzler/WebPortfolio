/* eslint-disable no-console */
/**
 * Generates per-route static HTML stubs in build/ so social crawlers
 * (LinkedIn, WhatsApp, Twitter, Facebook, iMessage) get correct OG /
 * Twitter Card meta tags when /blog or /blog/<slug> URLs are shared.
 *
 * How it works:
 *   1. CRA writes build/index.html (the SPA shell with bundled scripts).
 *   2. This script copies that shell to build/blog/index.html and
 *      build/blog/<slug>/index.html for each post, swapping in
 *      route-specific <title>, description, og:* and twitter:* tags.
 *   3. Firebase Hosting serves matching static files BEFORE applying the
 *      SPA rewrite, so a crawler hitting /blog/the-immigrants-dilemma/
 *      reads the correct meta tags. Real visitors get the same shell, the
 *      React bundle hydrates, and the SPA renders the post normally.
 *
 * Posts are listed inline because the runtime files are ES modules and
 * this script is plain Node. Add a new entry here whenever you add a
 * post under src/react-app/components/blog/posts/.
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://sharangpai.me";
const SITE_TITLE = "Sharang Pai";
const DEFAULT_OG_IMAGE = `${SITE_URL}/static/favicon/android-icon-192x192.png`;

const buildDir = path.resolve(__dirname, "..", "build");
const indexPath = path.join(buildDir, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error(
    `prerender: ${indexPath} not found — run "npm run build" first.`
  );
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, "utf8");

const posts = [
  {
    slug: "the-immigrants-dilemma",
    title: "The Immigrant's Dilemma",
    excerpt:
      "What makes sense for an individual and what might be good for the world are not always the same thing. And increasingly, in a world being shaped by AI, they feel pulled in different directions.",
    date: "2026-04-26",
  },
];

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const buildMeta = ({
  title,
  description,
  url,
  type = "website",
  publishedTime,
  image = DEFAULT_OG_IMAGE,
}) => {
  const lines = [
    `    <title>${escapeAttr(title)}</title>`,
    `    <meta name="description" content="${escapeAttr(description)}" />`,
    `    <link rel="canonical" href="${escapeAttr(url)}" />`,
    `    <meta property="og:type" content="${escapeAttr(type)}" />`,
    `    <meta property="og:site_name" content="${escapeAttr(SITE_TITLE)}" />`,
    `    <meta property="og:title" content="${escapeAttr(title)}" />`,
    `    <meta property="og:description" content="${escapeAttr(description)}" />`,
    `    <meta property="og:url" content="${escapeAttr(url)}" />`,
    `    <meta property="og:image" content="${escapeAttr(image)}" />`,
  ];
  if (publishedTime) {
    lines.push(
      `    <meta property="article:published_time" content="${escapeAttr(publishedTime)}" />`
    );
  }
  lines.push(
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `    <meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `    <meta name="twitter:image" content="${escapeAttr(image)}" />`
  );
  return lines.join("\n");
};

const inject = (html, meta) => {
  const stripped = html.replace(/<title>[^<]*<\/title>/i, "");
  return stripped.replace("</head>", `${meta}\n  </head>`);
};

const writeStub = (segments, meta) => {
  const dir = path.join(buildDir, ...segments);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), inject(baseHtml, meta));
  console.log(`prerender: /${segments.join("/")}/index.html`);
};

writeStub(
  ["blog"],
  buildMeta({
    title: `Writing — ${SITE_TITLE}`,
    description:
      "Long-form notes on AI, products, and the systems they sit inside.",
    url: `${SITE_URL}/blog`,
  })
);

for (const post of posts) {
  writeStub(
    ["blog", post.slug],
    buildMeta({
      title: `${post.title} — ${SITE_TITLE}`,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    })
  );
}

console.log(`prerender: done (${posts.length + 1} stub${posts.length === 0 ? "" : "s"}).`);

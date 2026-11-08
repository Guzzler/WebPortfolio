// A short burst of square "pixel" confetti. No dependencies, cleans up after itself.
const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const burstConfetti = (count = 56) => {
  if (prefersReducedMotion()) return;

  const layer = document.createElement("div");
  layer.className = "confetti-layer";
  layer.setAttribute("aria-hidden", "true");

  const colors = ["var(--gold)", "var(--accent)", "var(--ink)", "var(--coral)"];
  for (let i = 0; i < count; i += 1) {
    const bit = document.createElement("span");
    const size = 4 + Math.round(Math.random() * 3) * 2;
    bit.style.left = `${Math.random() * 100}vw`;
    bit.style.width = `${size}px`;
    bit.style.height = `${size}px`;
    bit.style.background = colors[i % colors.length];
    bit.style.setProperty("--drift", `${(Math.random() - 0.5) * 160}px`);
    bit.style.animationDelay = `${Math.random() * 0.35}s`;
    bit.style.animationDuration = `${1.4 + Math.random() * 0.9}s`;
    layer.appendChild(bit);
  }

  document.body.appendChild(layer);
  window.setTimeout(() => layer.remove(), 2800);
};

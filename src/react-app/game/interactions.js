import { useEffect } from "react";

// Pointer-driven micro-interactions, wired once with a single delegated
// listener. Elements opt in with data attributes:
//   data-glow    soft light that follows the cursor inside the element (--mx, --my)
//   data-tilt    slight 3D tilt toward the cursor (--rx, --ry)
//   data-magnet  element leans a few px toward the cursor (--tx, --ty)
// Off for touch input and reduced motion.

const reducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (v, max) => Math.max(-max, Math.min(max, v));

export const useMicroInteractions = () => {
  useEffect(() => {
    if (reducedMotion()) return undefined;
    let frame = null;
    let last = null;
    let tilted = null;
    let magnet = null;

    const release = (el, props) => {
      if (el) props.forEach((p) => el.style.removeProperty(p));
    };

    const apply = () => {
      frame = null;
      const event = last;
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const glow = target.closest("[data-glow]");
      if (glow) {
        const r = glow.getBoundingClientRect();
        glow.style.setProperty("--mx", `${event.clientX - r.left}px`);
        glow.style.setProperty("--my", `${event.clientY - r.top}px`);
      }

      const tilt = target.closest("[data-tilt]");
      if (tilt !== tilted) {
        release(tilted, ["--rx", "--ry"]);
        tilted = tilt;
      }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (event.clientX - r.left) / r.width - 0.5;
        const py = (event.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
      }

      const mag = target.closest("[data-magnet]");
      if (mag !== magnet) {
        release(magnet, ["--tx", "--ty"]);
        magnet = mag;
      }
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = event.clientX - (r.left + r.width / 2);
        const dy = event.clientY - (r.top + r.height / 2);
        mag.style.setProperty("--tx", `${clamp(dx * 0.18, 6).toFixed(1)}px`);
        mag.style.setProperty("--ty", `${clamp(dy * 0.3, 5).toFixed(1)}px`);
      }
    };

    const onMove = (event) => {
      if (event.pointerType === "touch") return;
      last = event;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const onLeaveWindow = () => {
      release(tilted, ["--rx", "--ry"]);
      release(magnet, ["--tx", "--ty"]);
      tilted = null;
      magnet = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
};

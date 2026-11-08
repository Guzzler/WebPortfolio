import React, { useEffect, useRef } from "react";

// Level-editor cursor for the hero grid. A highlight eases toward the pointer
// (no snapping), and the tiles it passes over light up and fade out behind it.
// Runs only while something is visible; off for touch and reduced motion.

const TILE = 32; // must match the grid in Home.css
const EASE = 0.22;
const FADE = 0.93;
const INTERACTIVE = "a, button, [role='button'], input, .player-card, .title-links";

const reducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const TileTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas && canvas.parentElement;
    if (!canvas || !host || reducedMotion()) return undefined;

    const ctx = canvas.getContext("2d");
    const lit = new Map(); // "col,row" -> intensity
    const pos = { x: 0, y: 0, tx: 0, ty: 0, alpha: 0, inside: false, ready: false };
    let dpr = 1;
    let frame = null;
    let gold = "#e2a419";

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gold = getComputedStyle(document.documentElement).getPropertyValue("--gold").trim() || gold;
    };

    const tick = () => {
      frame = null;
      pos.x += (pos.tx - pos.x) * EASE;
      pos.y += (pos.ty - pos.y) * EASE;
      pos.alpha += ((pos.inside ? 1 : 0) - pos.alpha) * 0.12;

      // Light the tile under the gliding cursor so the trail follows a smooth path.
      if (pos.inside) {
        const key = `${Math.floor((pos.x + TILE / 2) / TILE)},${Math.floor((pos.y + TILE / 2) / TILE)}`;
        lit.set(key, Math.max(lit.get(key) || 0, 0.85));
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gold;

      lit.forEach((value, key) => {
        const next = value * FADE;
        if (next < 0.02) {
          lit.delete(key);
          return;
        }
        lit.set(key, next);
        const [c, r] = key.split(",").map(Number);
        ctx.globalAlpha = next * 0.22;
        ctx.fillRect(c * TILE + 1, r * TILE + 1, TILE - 1, TILE - 1);
      });

      // The cursor itself: an outlined tile that slides from cell to cell.
      if (pos.alpha > 0.01) {
        ctx.globalAlpha = pos.alpha * 0.95;
        ctx.strokeStyle = gold;
        ctx.lineWidth = 2;
        ctx.strokeRect(pos.x + 1.5, pos.y + 1.5, TILE - 2, TILE - 2);
      }
      ctx.globalAlpha = 1;

      const settled =
        Math.abs(pos.tx - pos.x) < 0.3 && Math.abs(pos.ty - pos.y) < 0.3 && !pos.inside && pos.alpha < 0.01;
      if (lit.size || !settled) frame = window.requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event) => {
      if (event.pointerType === "touch") return;
      // Stay out of the way over things you can click.
      const target = event.target instanceof Element ? event.target : null;
      if (target && target.closest(INTERACTIVE)) {
        pos.inside = false;
        wake();
        return;
      }
      const box = canvas.getBoundingClientRect();
      pos.tx = Math.floor((event.clientX - box.left) / TILE) * TILE;
      pos.ty = Math.floor((event.clientY - box.top) / TILE) * TILE;
      if (!pos.ready) {
        pos.x = pos.tx;
        pos.y = pos.ty;
        pos.ready = true;
      }
      pos.inside = true;
      wake();
    };

    const onLeave = () => {
      pos.inside = false;
      pos.ready = false;
      wake();
    };

    resize();
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    const themeWatch = new MutationObserver(resize);
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      themeWatch.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="tile-trail" aria-hidden="true" />;
};

export default TileTrail;

import React, { useEffect, useRef, useState } from "react";

// Swaps between two "forms" (e.g. photo and sprite) with a pixel transition:
// the old form breaks into bigger and bigger blocks, flips, and the new form
// resolves from blocks back to full detail. Children render the live form.
//
//   <PixelSwap form="sprite" width={248} height={272} draw={(ctx, form, w, h) => ...}>
//     {(shown) => (shown === "sprite" ? <Sprite /> : <img />)}
//   </PixelSwap>

const OUT = [3, 6, 11, 18];
const IN = [18, 11, 6, 3, 0];
const STEP_MS = 62;

const reducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PixelSwap = ({ form, width, height, draw, onSwapped, className, children }) => {
  const [shown, setShown] = useState(form);
  const [animating, setAnimating] = useState(false);
  const canvasRef = useRef(null);
  const previous = useRef(form);
  const drawRef = useRef(draw);
  const doneRef = useRef(onSwapped);
  drawRef.current = draw;
  doneRef.current = onSwapped;

  useEffect(() => {
    const from = previous.current;
    const to = form;
    if (from === to) return undefined;
    previous.current = to;

    if (reducedMotion() || !canvasRef.current) {
      setShown(to);
      if (doneRef.current) doneRef.current(to);
      return undefined;
    }

    const canvas = canvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(width * dpr);
    const H = Math.round(height * dpr);
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const comp = document.createElement("canvas");
    comp.width = W;
    comp.height = H;
    const cctx = comp.getContext("2d");
    const small = document.createElement("canvas");
    const sctx = small.getContext("2d");

    const render = (which, block) => {
      cctx.clearRect(0, 0, W, H);
      drawRef.current(cctx, which, W, H);
      ctx.clearRect(0, 0, W, H);
      if (!block) {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(comp, 0, 0);
        return;
      }
      const sw = Math.max(1, Math.round(width / block));
      const sh = Math.max(1, Math.round(height / block));
      small.width = sw;
      small.height = sh;
      sctx.imageSmoothingEnabled = true;
      sctx.drawImage(comp, 0, 0, sw, sh);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(small, 0, 0, sw, sh, 0, 0, W, H);
    };

    const sequence = [...OUT.map((b) => [from, b]), ...IN.map((b) => [to, b])];
    render(from, 0);
    setAnimating(true);
    const timers = sequence.map(([which, block], i) =>
      window.setTimeout(() => {
        if (i === OUT.length) setShown(to);
        render(which, block);
      }, (i + 1) * STEP_MS)
    );
    timers.push(
      window.setTimeout(() => {
        setAnimating(false);
        if (doneRef.current) doneRef.current(to);
      }, (sequence.length + 1) * STEP_MS)
    );
    return () => timers.forEach(clearTimeout);
  }, [form, width, height]);

  return (
    <div className={className} style={{ position: "relative", width, height }}>
      <div style={{ visibility: animating ? "hidden" : "visible", width: "100%", height: "100%" }}>
        {children(shown)}
      </div>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: animating ? "block" : "none",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
};

export default PixelSwap;

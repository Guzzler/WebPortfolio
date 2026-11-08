import React, { useEffect, useRef, useState } from "react";
import strip from "../../assets/sprite/sharang-sprite.webp";
import meta from "./spriteSheet.json";

// Sharang's sprite: one horizontal strip of frames (see spriteSheet.json),
// shown by moving the background. Idle blinks, talking flaps between mouth
// shapes at slightly uneven timing so it reads as speech, "joy" is the
// eyes-closed grin used for reactions.

export const FRAME_INDEX = meta.frames.reduce((acc, name, i) => ({ ...acc, [name]: i }), {});
export const SPRITE_META = meta;
export const SPRITE_SRC = strip;

const MOUTHS = ["talkA", "talkB", "talkC", "smile", "talkB"];

const reducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let stripPromise;
export const loadSpriteImage = () => {
  if (!stripPromise) {
    stripPromise = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = strip;
    });
  }
  return stripPromise;
};

const useBlink = () => {
  const [blinking, setBlinking] = useState(false);
  useEffect(() => {
    if (reducedMotion()) return undefined;
    let timer;
    const blinkOnce = (then) => {
      setBlinking(true);
      timer = window.setTimeout(() => {
        setBlinking(false);
        then();
      }, 110);
    };
    const schedule = () => {
      timer = window.setTimeout(() => {
        // Sometimes a quick double blink, like people do.
        if (Math.random() < 0.25) {
          blinkOnce(() => {
            timer = window.setTimeout(() => blinkOnce(schedule), 140);
          });
        } else {
          blinkOnce(schedule);
        }
      }, 2200 + Math.random() * 3200);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, []);
  return blinking;
};

const useMouth = (talking) => {
  const [mouth, setMouth] = useState(null);
  const last = useRef(null);
  useEffect(() => {
    if (!talking || reducedMotion()) {
      setMouth(null);
      return undefined;
    }
    let timer;
    const step = () => {
      let next = MOUTHS[Math.floor(Math.random() * MOUTHS.length)];
      if (next === last.current) next = "smile";
      last.current = next;
      setMouth(next);
      timer = window.setTimeout(step, 80 + Math.random() * 70);
    };
    step();
    return () => window.clearTimeout(timer);
  }, [talking]);
  return mouth;
};

/**
 * height: rendered height of the full sprite in CSS px.
 * head: render only the head, fitted into a square of this many px.
 */
const Sprite = ({ height = 236, head, talking = false, mood, className }) => {
  const blinking = useBlink();
  const mouth = useMouth(talking);
  const frame = mood === "joy" ? "joy" : mouth || (blinking ? "blink" : "idle");
  const i = FRAME_INDEX[frame];
  const { frameWidth: fw, frameHeight: fh, frames } = meta;

  let style;
  if (head) {
    const [hx, hy, hw, hh] = meta.head;
    const s = head / hh;
    style = {
      width: head,
      height: head,
      backgroundSize: `${fw * frames.length * s}px ${fh * s}px`,
      backgroundPosition: `${(head - hw * s) / 2 - (i * fw + hx) * s}px ${-hy * s}px`,
    };
  } else {
    const s = height / fh;
    style = {
      width: fw * s,
      height,
      backgroundSize: `${fw * frames.length * s}px ${height}px`,
      backgroundPosition: `${-i * fw * s}px 0`,
    };
  }

  return (
    <span
      className={`sprite${className ? ` ${className}` : ""}`}
      style={{ ...style, backgroundImage: `url(${strip})` }}
      aria-hidden="true"
    />
  );
};

export default Sprite;

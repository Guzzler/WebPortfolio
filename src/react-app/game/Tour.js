import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Sprite, { FRAME_INDEX, SPRITE_META, loadSpriteImage } from "./Sprite";
import PixelSwap from "./PixelSwap";
import portrait from "../../assets/images/sharang.jpeg";
import { requestForm } from "../components/home/PlayerCard";
import { track } from "../../analytics";
import { useAchievements } from "./achievements";

// The guided tour: a spotlight "camera" moves between sections while an
// RPG-style dialog box narrates. Keyboard: → / Enter next, ← back, Esc exit.

export const TOUR_STEPS = [
  {
    target: "#top",
    place: "Title screen",
    text:
      "Oh, hi! I'm Sharang, well, the 8-bit version. I'll walk you around, it takes about a minute. Use → or Enter to move on, Esc if you'd rather explore alone.",
    touchText:
      "Oh, hi! I'm Sharang, well, the 8-bit version. I'll walk you around in about a minute. Hit Next to come along, or Skip to explore on your own.",
  },
  {
    target: "#work",
    place: "Work",
    text:
      "Right now I'm at Luma AI, leading Evaluations Engineering. I figure out how good our models really are, evaluate self-improving agents, and build pretty much anything agent-shaped. Before this I was a founding engineer at Persona, and I've been early at a few startups, including the YC ride with RedBrick AI.",
  },
  {
    target: "#impact",
    place: "Impact",
    text:
      "Okay, this one matters most to me. Classrooms in India, vaccine slots during COVID, WWF conservation teams, and lately shelter dogs. Every skill I pick up is really an attempt to build more things like these, and build them well.",
  },
  {
    target: "#games",
    place: "Games",
    text:
      "And here's where I goof off. Small games, mostly made at game jams. They're my favourite way to learn design. Go on, pick one, they all run right here.",
    touchText:
      "And here's where I goof off. Small games, mostly made at game jams. They're my favourite way to learn design. Pick one to try after the tour.",
  },
  {
    target: "#writing",
    place: "Writing",
    text:
      "Sometimes a thought needs more room than a tweet. These are my longer pieces on AI and the choices that come with building it.",
  },
  {
    target: "#background",
    place: "Background",
    text:
      "A bit about where I come from: a master's in AI at Carnegie Mellon, engineering at Manipal before that. And when I'm off the clock, you'll find me on a football pitch or deep in a board game.",
  },
  {
    target: "#contact",
    place: "Credits",
    text:
      "And that's the real me. Thanks for sticking around! If something here clicked, say hi. Oh, and there are still a few achievements hiding on this site.",
  },
];

const AVATAR = 64;

const avatarImages = {};
loadSpriteImage().then((img) => {
  avatarImages.sprite = img;
});
const photoImg = new Image();
photoImg.onload = () => {
  avatarImages.photo = photoImg;
};
photoImg.src = portrait;

// Draws the avatar for the pixel swap: the sprite's head, or a face crop of the photo.
const drawAvatar = (ctx, form, W, H) => {
  if (form === "sprite" && avatarImages.sprite) {
    const { frameWidth: fw } = SPRITE_META;
    const [hx, hy, hw, hh] = SPRITE_META.head;
    const s = H / hh;
    ctx.drawImage(avatarImages.sprite, FRAME_INDEX.idle * fw + hx, hy, hw, hh, (W - hw * s) / 2, 0, hw * s, H);
  } else if (form === "photo" && avatarImages.photo) {
    const img = avatarImages.photo;
    const side = Math.min(img.naturalWidth, img.naturalHeight) * 0.62;
    const sx = img.naturalWidth * 0.5 - side / 2;
    const sy = img.naturalHeight * 0.36 - side / 2;
    ctx.drawImage(img, sx, Math.max(sy, 0), side, side, 0, 0, W, H);
  }
};
const reducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const sameRect = (a, b) =>
  a === b ||
  (a && b &&
    Math.abs(a.top - b.top) < 0.5 &&
    Math.abs(a.left - b.left) < 0.5 &&
    Math.abs(a.width - b.width) < 0.5 &&
    Math.abs(a.height - b.height) < 0.5);

const Tour = ({ onClose }) => {
  const { unlock } = useAchievements();
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(reducedMotion() ? Infinity : 0);
  const [rect, setRect] = useState(null);
  const dialogRef = useRef(null);
  const textRef = useRef(null);
  const nextRef = useRef(null);

  const current = TOUR_STEPS[step];
  const compact = window.matchMedia("(max-width: 760px), (hover: none)").matches;
  const narration = compact && current.touchText ? current.touchText : current.text;
  const fullLength = narration.length;
  const isLast = step === TOUR_STEPS.length - 1;
  const doneTyping = typed >= fullLength;

  useEffect(() => {
    unlock("start");
    track("Tour Start");
    requestForm("sprite");
  }, [unlock]);

  useLayoutEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useLayoutEffect(() => {
    nextRef.current.focus({ preventScroll: true });
    textRef.current.scrollTop = 0;
  }, [step]);

  // Typewriter.
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const id = window.setInterval(() => {
      setTyped((n) => {
        if (n >= fullLength) {
          window.clearInterval(id);
          return n;
        }
        return n + (compact ? 4 : 2);
      });
    }, compact ? 20 : 22);
    return () => window.clearInterval(id);
  }, [step, fullLength, compact]);

  // Start the camera at the section's content, below the measured sticky HUD.
  useLayoutEffect(() => {
    const section = document.querySelector(current.target);
    const hud = document.querySelector(".hud");
    const dialog = dialogRef.current;
    if (!section || !hud || !dialog) return undefined;

    let frame;
    const contentTop = (bounds) =>
      bounds.top + (parseFloat(window.getComputedStyle(section).paddingTop) || 0);

    const measure = () => {
      frame = null;
      const bounds = section.getBoundingClientRect();
      const viewportWidth = document.documentElement.clientWidth;
      const top = Math.max(contentTop(bounds) - 8, hud.getBoundingClientRect().bottom + 8);
      const bottom = Math.min(bounds.bottom, dialog.offsetTop - 12);
      const left = Math.max(bounds.left - 8, 12);
      const right = Math.min(bounds.right + 8, viewportWidth - 12);
      const next = bottom > top
        ? { top, left, width: right - left, height: bottom - top }
        : null;
      setRect((prev) => (sameRect(prev, next) ? prev : next));
    };

    const scheduleMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    const moveCamera = (behavior) => {
      const top = current.target === "#top" ? 0
        : contentTop(section.getBoundingClientRect()) + window.scrollY - hud.offsetHeight - 20;
      window.scrollTo({ top, behavior });
      scheduleMeasure();
    };
    const onResize = () => moveCamera("instant");
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(dialog);
    observer.observe(section);
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", onResize);
    moveCamera(reducedMotion() ? "instant" : "smooth");

    return () => {
      window.scrollTo({ top: window.scrollY, behavior: "instant" });
      observer.disconnect();
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [current.target]);

  const finish = useCallback(
    (completed) => {
      track(completed ? "Tour Complete" : "Tour Exit", { step });
      if (completed) unlock("tour");
      onClose(current.target);
    },
    [current.target, onClose, step, unlock]
  );

  const goTo = useCallback((index) => {
    setTyped(reducedMotion() ? Infinity : 0);
    setStep(index);
  }, []);

  const next = useCallback(() => {
    if (!compact && !doneTyping) {
      setTyped(fullLength);
      return;
    }
    if (isLast) finish(true);
    else goTo(step + 1);
  }, [compact, doneTyping, finish, fullLength, goTo, isLast, step]);

  const back = useCallback(() => {
    if (step > 0) goTo(step - 1);
  }, [goTo, step]);

  useLayoutEffect(() => {
    const onKey = (event) => {
      if (event.key === "Tab") {
        const stops = dialogRef.current.querySelectorAll("button");
        const first = stops[0];
        const last = stops[stops.length - 1];
        const active = document.activeElement;
        if ((event.shiftKey && active === first) || (!event.shiftKey && active === last)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        }
      } else if (event.key === "Escape") finish(false);
      else if (event.key === "ArrowRight" && !event.repeat) {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft" && !event.repeat) {
        event.preventDefault();
        back();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, back, finish]);

  return (
    <div className={`tour${rect ? "" : " is-dimmed"}`}>
      {rect ? (
        <div
          className="tour-spotlight"
          style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
          aria-hidden="true"
        />
      ) : null}

      <div
        ref={dialogRef}
        className="tour-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Guided tour"
        aria-describedby="tour-narration"
        onClick={(event) => {
          if (!compact && !event.target.closest(".tour-controls")) next();
        }}
      >
        <div className={`tour-avatar${doneTyping ? "" : " is-talking"}`} aria-hidden="true">
          <PixelSwap form={isLast ? "photo" : "sprite"} width={AVATAR} height={AVATAR} draw={drawAvatar}>
            {(shown) =>
              shown === "sprite" ? (
                <Sprite head={AVATAR} talking={!doneTyping} />
              ) : (
                <img className="tour-photo" src={portrait} alt="" width={AVATAR} height={AVATAR} />
              )
            }
          </PixelSwap>
        </div>
        <div className="tour-meta" aria-hidden="true">
          <span className="tour-name">Sharang</span>
          <span className="tour-place">{current.place}</span>
        </div>
        <div className="sr-only" id="tour-narration" aria-live="polite" aria-atomic="true">
          {`Step ${step + 1} of ${TOUR_STEPS.length}, ${current.place}. ${narration}`}
        </div>
        <div className="tour-copy" ref={textRef}>
          <p className="tour-text" aria-hidden="true">
            {narration.slice(0, typed)}
            <span className="tour-ghost" aria-hidden="true">
              {narration.slice(typed)}
            </span>
          </p>
        </div>
        <div className="tour-controls">
          <div className="tour-progress" aria-hidden="true">
            <span>{step + 1} / {TOUR_STEPS.length}</span>
            <ol className="tour-pips">
              {TOUR_STEPS.map((s, i) => (
                <li key={s.target} className={i === step ? "is-on" : i < step ? "is-done" : ""} />
              ))}
            </ol>
          </div>
          <div className="tour-actions">
            <button type="button" className="tour-btn is-quiet" onClick={() => finish(false)}>
              Skip
            </button>
            {step > 0 ? (
              <button type="button" className="tour-btn is-quiet" onClick={back}>
                Back
              </button>
            ) : null}
            <button ref={nextRef} type="button" className="tour-btn" onClick={next}>
              {isLast ? "Finish" : "Next"}
              <span className={`tour-caret${doneTyping ? " is-ready" : ""}`} aria-hidden="true">
                ▶
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;

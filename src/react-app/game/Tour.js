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
  },
  {
    target: "#work",
    place: "Work",
    text:
      "Right now I'm at Luma AI, leading Evaluations Engineering. Basically, I figure out how good our models really are. Before this I was a founding engineer at Persona, and I've been early at a few startups, including the YC ride with RedBrick AI.",
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
      "The origin story: CMU for my master's in AI, Manipal before that. Plus the stuff that keeps me sane, like football, board games and far too much League.",
  },
  {
    target: "#contact",
    place: "Credits",
    text:
      "And that's the real me. Thanks for sticking around! If something here clicked, say hi. Oh, and there are still a few achievements hiding on this site.",
  },
];

const HUD_OFFSET = 76;
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
  a &&
  b &&
  Math.abs(a.top - b.top) < 0.5 &&
  Math.abs(a.left - b.left) < 0.5 &&
  Math.abs(a.width - b.width) < 0.5 &&
  Math.abs(a.height - b.height) < 0.5;

const Tour = ({ onClose }) => {
  const { unlock } = useAchievements();
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [rect, setRect] = useState(null);
  const dialogRef = useRef(null);
  const nextRef = useRef(null);

  const current = TOUR_STEPS[step];
  const fullLength = current.text.length;
  const isLast = step === TOUR_STEPS.length - 1;
  const doneTyping = typed >= fullLength;

  useEffect(() => {
    unlock("start");
    track("Tour Start");
    requestForm("sprite");
    if (nextRef.current) nextRef.current.focus();
  }, [unlock]);

  // Move the camera to the step's section.
  useEffect(() => {
    const el = document.querySelector(current.target);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HUD_OFFSET;
    window.scrollTo({ top, behavior: reducedMotion() ? "auto" : "smooth" });
  }, [current.target]);

  // Typewriter.
  useEffect(() => {
    if (reducedMotion()) {
      setTyped(fullLength);
      return undefined;
    }
    setTyped(0);
    const id = window.setInterval(() => {
      setTyped((n) => {
        if (n >= fullLength) {
          window.clearInterval(id);
          return n;
        }
        return n + 2;
      });
    }, 22);
    return () => window.clearInterval(id);
  }, [step, fullLength]);

  // Keep the spotlight glued to the section while the page scrolls.
  useLayoutEffect(() => {
    let frame;
    const measure = () => {
      const el = document.querySelector(current.target);
      const dialog = dialogRef.current;
      if (el && dialog) {
        const r = el.getBoundingClientRect();
        const pad = 10;
        const floor = window.innerHeight - dialog.offsetHeight - 28;
        const top = Math.max(r.top - pad, HUD_OFFSET - 8);
        const bottom = Math.min(r.bottom + pad, floor);
        const next = {
          top,
          left: Math.max(r.left - pad, 8),
          width: Math.min(r.width + pad * 2, window.innerWidth - 16),
          height: Math.max(bottom - top, 48),
        };
        setRect((prev) => (sameRect(prev, next) ? prev : next));
      }
      frame = window.requestAnimationFrame(measure);
    };
    measure();
    return () => window.cancelAnimationFrame(frame);
  }, [current.target]);

  const finish = useCallback(
    (completed) => {
      track(completed ? "Tour Complete" : "Tour Exit", { step });
      if (completed) unlock("tour");
      onClose();
    },
    [onClose, step, unlock]
  );

  const next = useCallback(() => {
    if (!doneTyping) {
      setTyped(fullLength);
      return;
    }
    if (isLast) finish(true);
    else setStep((s) => s + 1);
  }, [doneTyping, fullLength, isLast, finish]);

  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") finish(false);
      else if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        back();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, back, finish]);

  return (
    <div className="tour" aria-live="polite">
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
        aria-label={`Guided tour, step ${step + 1} of ${TOUR_STEPS.length}: ${current.place}`}
        onClick={next}
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
        <div className="tour-body">
          <div className="tour-meta">
            <span className="tour-name">Sharang</span>
            <span className="tour-place">{current.place}</span>
          </div>
          <p className="tour-text">
            {current.text.slice(0, typed)}
            <span className="tour-ghost" aria-hidden="true">
              {current.text.slice(typed)}
            </span>
          </p>
          <div className="tour-controls" onClick={(event) => event.stopPropagation()}>
            <ol className="tour-pips" aria-hidden="true">
              {TOUR_STEPS.map((s, i) => (
                <li key={s.target} className={i === step ? "is-on" : i < step ? "is-done" : ""} />
              ))}
            </ol>
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

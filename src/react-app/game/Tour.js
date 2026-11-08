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
      "Hey, I'm Sharang, or at least my 8-bit self. Welcome in. This is a quick tour of the site, about a minute. Press → or Enter to keep going, and Esc whenever you want to leave.",
  },
  {
    target: "#work",
    place: "Work",
    text:
      "The main quest. At Luma AI I lead Evaluations Engineering, which means working out how good our multimodal models really are, and I build agent infrastructure. Before that I was the first ML engineer at Persona, which Luma acquired.",
  },
  {
    target: "#impact",
    place: "Impact",
    text:
      "This is the part I care about most. Since 2015 I've built tools for people the tech industry tends to skip: classrooms in India, vaccine access during COVID, conservation teams at WWF, and most recently shelter dogs waiting for a home. It's the work I want to do more of.",
  },
  {
    target: "#games",
    place: "Games",
    text:
      "The arcade. I make small games, mostly at game jams, because it's the most fun way I know to practise design. Pick any of them to play it right here in your browser.",
  },
  {
    target: "#writing",
    place: "Writing",
    text:
      "Longer thinking lives here: essays on AI, technology, and the choices that come with building it.",
  },
  {
    target: "#contact",
    place: "Credits",
    text:
      "That's the tour, and that's the real me. If anything here resonated, I'd like to hear from you. There are a few achievements still hidden around the site, too.",
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

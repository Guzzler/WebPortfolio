import React, { useCallback, useEffect, useRef, useState } from "react";
import Sprite, { FRAME_INDEX, SPRITE_META, loadSpriteImage } from "../../game/Sprite";
import PixelSwap from "../../game/PixelSwap";
import portrait from "../../../assets/images/sharang.jpeg";
import { track } from "../../../analytics";
import { profile } from "../../content";

const STAGE_W = 248;
const STAGE_H = 272;
const GROUND = 24;
const SPRITE_H = 236;

const LINES = [
  "Hi! I'm Sharang. Well, the 8-bit version.",
  "Press start and I'll show you around.",
  "Every game in the arcade is playable.",
  "The work I care most about is under Impact.",
  "I'm happiest when tech reaches people it usually skips.",
  "Psst. Try the Konami code.",
];

// Other parts of the site (the tour) can ask the card to change form.
export const requestForm = (form) =>
  window.dispatchEvent(new CustomEvent("sp:form", { detail: form }));

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

const reducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Draws a form onto a canvas the size of the stage (used for the pixel swap).
const drawForm = (images) => (ctx, form, W, H) => {
  const k = W / STAGE_W;
  if (form === "photo" && images.photo) {
    const img = images.photo;
    const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (W - dw) / 2, (H - dh) * 0.4, dw, dh);
  } else if (form === "sprite" && images.sprite) {
    const { frameWidth: fw, frameHeight: fh } = SPRITE_META;
    const sh = SPRITE_H * k;
    const sw = fw * (sh / fh);
    ctx.drawImage(
      images.sprite,
      FRAME_INDEX.idle * fw,
      0,
      fw,
      fh,
      (W - sw) / 2,
      H - GROUND * k - sh,
      sw,
      sh
    );
  }
};

const useSpeech = () => {
  const [line, setLine] = useState(null);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!line) return undefined;
    const full = line.text.length;
    setTyped(reducedMotion() ? full : 0);
    const type = window.setInterval(() => {
      setTyped((n) => {
        if (n >= full) {
          window.clearInterval(type);
          return n;
        }
        return n + 1;
      });
    }, 30);
    const hide = window.setTimeout(() => setLine(null), 2600 + full * 30);
    return () => {
      window.clearInterval(type);
      window.clearTimeout(hide);
    };
  }, [line]);

  const say = useCallback((text) => setLine({ text, key: Date.now() }), []);
  const hush = useCallback(() => setLine(null), []);
  const talking = Boolean(line) && typed < line.text.length;
  return { line, typed, talking, say, hush };
};

const PlayerCard = () => {
  const [form, setForm] = useState("photo");
  const [mood, setMood] = useState(null);
  const images = useRef({});
  const [ready, setReady] = useState(false);
  const touched = useRef(false);
  const nextLine = useRef(0);
  const { line, typed, talking, say, hush } = useSpeech();

  useEffect(() => {
    let alive = true;
    Promise.all([loadImage(portrait), loadSpriteImage()]).then(([photo, sprite]) => {
      if (!alive) return;
      images.current = { photo, sprite };
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Intro: the photo turns into the sprite once the title screen settles.
  useEffect(() => {
    if (!ready) return undefined;
    const id = window.setTimeout(() => {
      if (!touched.current) setForm("sprite");
    }, 1300);
    return () => window.clearTimeout(id);
  }, [ready]);

  useEffect(() => {
    const onRequest = (event) => {
      touched.current = true;
      setForm(event.detail);
    };
    window.addEventListener("sp:form", onRequest);
    return () => window.removeEventListener("sp:form", onRequest);
  }, []);

  const onSwapped = useCallback(
    (to) => {
      if (to !== "sprite") return;
      setMood("joy");
      window.setTimeout(() => setMood(null), 650);
      window.setTimeout(() => {
        say(LINES[nextLine.current % LINES.length]);
        nextLine.current += 1;
      }, 350);
    },
    [say]
  );

  const toggle = () => {
    if (!ready) return;
    touched.current = true;
    hush();
    const next = form === "sprite" ? "photo" : "sprite";
    track("Portrait Switch", { to: next });
    setForm(next);
  };

  return (
    <figure className="player-card">
      <div className="player-frame">
        <span className="player-tag" aria-hidden="true">
          P1
        </span>

        <button
          type="button"
          className={`stage is-${form}`}
          onClick={toggle}
          aria-label={form === "sprite" ? "Show Sharang's photo" : "Show Sharang's 8-bit sprite"}
        >
          <span className="stage-sky" aria-hidden="true">
            <span className="stage-cloud" />
            <span className="stage-cloud is-far" />
            <span className="stage-ground" />
          </span>

          <PixelSwap
            form={form}
            width={STAGE_W}
            height={STAGE_H}
            draw={drawForm(images.current)}
            onSwapped={onSwapped}
            className="stage-swap"
          >
            {(shown) =>
              shown === "sprite" ? (
                <span className="actor">
                  <span className="actor-body">
                    <Sprite height={SPRITE_H} talking={talking} mood={mood} />
                  </span>
                  <span className="actor-shadow" />
                </span>
              ) : (
                <img className="stage-photo" src={portrait} alt="" width={STAGE_W} height={STAGE_H} />
              )
            }
          </PixelSwap>

          <span className="stage-hint" aria-hidden="true">
            {form === "sprite" ? "Click for the real me" : "Click for 8-bit me"}
          </span>
        </button>

        {line && form === "sprite" ? (
          <p key={line.key} className="bubble" aria-live="polite">
            {line.text.slice(0, typed)}
            <span className="bubble-ghost" aria-hidden="true">
              {line.text.slice(typed)}
            </span>
          </p>
        ) : null}
      </div>

      <figcaption>
        <strong>{profile.name}</strong>
        <span>{profile.role}</span>
      </figcaption>
    </figure>
  );
};

export default PlayerCard;

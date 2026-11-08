import React, { useCallback, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { track } from "../../../analytics";
import { useAchievements } from "../../game/achievements";
import Icon from "../common/Icon";
import { games } from "../../content";

const HEAD_H = 46; // height of the window's title bar
const EDGE = 24; // space kept around the window
const UNITY_FOOTER = 38; // Unity template footer under the canvas (has the fullscreen button)
const ITCH_BAR = 21; // itch.io's bar under the embed; cropped out

// The games are Unity builds with a fixed-size canvas centered in the page.
// Size the iframe so that canvas + Unity footer fill it exactly, show it at
// native resolution, and only scale down when the screen is too small.
const useFitScale = ([w, h]) => {
  const compute = useCallback(() => {
    const availW = window.innerWidth - EDGE * 2 - 4;
    const availH = window.innerHeight - EDGE * 2 - HEAD_H - 4;
    return Math.min(availW / w, availH / h, 1);
  }, [w, h]);
  const [scale, setScale] = useState(compute);

  useEffect(() => {
    const onResize = () => setScale(compute());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [compute]);

  return scale;
};

const GameModal = ({ game, onClose }) => {
  const closeRef = useRef(null);
  const w = game.size[0];
  const h = game.size[1] + UNITY_FOOTER;
  const scale = useFitScale([w, h]);

  useEffect(() => {
    if (closeRef.current) closeRef.current.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="crt-backdrop" onClick={onClose}>
      <div
        className="crt"
        role="dialog"
        aria-modal="true"
        aria-label={game.title}
        style={{ width: Math.round(w * scale) + 4 }}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="crt-head">
          <span className="crt-title">
            <span className="crt-led" aria-hidden="true" />
            {game.title}
          </span>
          <span className="crt-actions">
            <a href={game.url} target="_blank" rel="noopener noreferrer">
              Open on itch.io <Icon name="arrowUpRight" size={14} />
            </a>
            <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close game">
              <Icon name="close" size={18} />
            </button>
          </span>
        </header>
        <div
          className="crt-screen"
          style={{ width: Math.round(w * scale), height: Math.round(h * scale) }}
        >
          <iframe
            src={game.embedUrl}
            title={game.title}
            width={w}
            height={h + ITCH_BAR}
            frameBorder="0"
            allow="autoplay; fullscreen; gamepad"
            allowFullScreen
            style={{ transform: `scale(${scale})` }}
          />
        </div>
      </div>
    </div>
  );
};

const Arcade = () => {
  const { unlock } = useAchievements();
  const [active, setActive] = useState(null);

  const launch = (game) => {
    track("Game Click", { game_name: game.title, device: isMobile ? "mobile" : "desktop" });
    unlock("player");
    if (isMobile) {
      window.open(game.url, "_blank", "noopener,noreferrer");
      return;
    }
    setActive(game);
  };

  const close = useCallback(() => {
    if (active) track("Game Modal Close", { game_name: active.title });
    setActive(null);
  }, [active]);

  return (
    <>
      <ul className="arcade">
        {games.map((game, i) => (
          <li key={game.title}>
            <button
              type="button"
              className="cart select-frame"
              data-tilt
              onClick={() => launch(game)}
              aria-label={`Play ${game.title}`}
            >
              <span className="cart-screen">
                <img src={game.thumbnail} alt="" loading="lazy" width="315" height="250" />
                <span className="cart-play" aria-hidden="true">
                  ▶ {isMobile ? "Open" : "Play"}
                </span>
                {i === 0 ? <span className="cart-new">New</span> : null}
              </span>
              <span className="cart-meta">
                <span className="cart-title">{game.title}</span>
                <span className="cart-year">{game.year}</span>
              </span>
              <span className="cart-desc">{game.description}</span>
            </button>
          </li>
        ))}
      </ul>
      {active ? <GameModal game={active} onClose={close} /> : null}
    </>
  );
};

export default Arcade;

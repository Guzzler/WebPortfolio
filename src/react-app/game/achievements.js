import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { track } from "../../analytics";
import { PixelIcon } from "../components/common/Icon";
import { burstConfetti } from "./confetti";
import "./game.css";

export const ACHIEVEMENTS = [
  { id: "start", title: "Press start", desc: "Started the guided tour." },
  { id: "tour", title: "Completionist", desc: "Finished the whole tour." },
  { id: "explorer", title: "Explorer", desc: "Scrolled through every part of the home page." },
  { id: "player", title: "Player one", desc: "Launched one of my games." },
  { id: "night", title: "Day and night", desc: "Switched the theme." },
  { id: "reader", title: "Bookworm", desc: "Read an essay to the end." },
  { id: "hello", title: "Say hello", desc: "Started an email to me." },
  {
    id: "konami",
    title: "Old habits",
    desc: "Entered the Konami code. Some things you never forget.",
    secret: true,
  },
];

const STORAGE_KEY = "sp:achievements";
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const readUnlocked = () => {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
};

const AchievementsContext = createContext({
  unlocked: {},
  unlock: () => {},
  openPanel: () => {},
});

export const useAchievements = () => useContext(AchievementsContext);

const Toast = ({ achievement }) => (
  <div className="toast" role="status">
    <span className="toast-icon">
      <PixelIcon name="trophy" size={22} />
    </span>
    <span className="toast-text">
      <span className="toast-kicker">Achievement unlocked</span>
      <span className="toast-title">{achievement.title}</span>
    </span>
  </div>
);

const Panel = ({ unlocked, onClose, onReset }) => {
  const closeRef = useRef(null);
  const count = Object.keys(unlocked).length;

  useEffect(() => {
    if (closeRef.current) closeRef.current.focus();
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="panel-backdrop" onClick={onClose}>
      <div
        className="trophy-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="trophy-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="trophy-panel-head">
          <div>
            <h2 id="trophy-heading">Achievements</h2>
            <p>
              {count} of {ACHIEVEMENTS.length} unlocked. Progress is saved in this
              browser only.
            </p>
          </div>
          <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close achievements">
            ×
          </button>
        </header>
        <div className="trophy-meter" aria-hidden="true">
          <span style={{ width: `${(count / ACHIEVEMENTS.length) * 100}%` }} />
        </div>
        <ul className="trophy-grid">
          {ACHIEVEMENTS.map((a) => {
            const got = Boolean(unlocked[a.id]);
            const hidden = a.secret && !got;
            return (
              <li key={a.id} className={`trophy${got ? " is-got" : ""}`}>
                <span className="trophy-badge">
                  <PixelIcon name={got ? "trophy" : "star"} size={20} />
                </span>
                <span>
                  <strong>{hidden ? "Secret" : a.title}</strong>
                  <span>{hidden ? "Some codes are older than this website." : a.desc}</span>
                </span>
              </li>
            );
          })}
        </ul>
        {count > 0 ? (
          <button type="button" className="text-btn" onClick={onReset}>
            Reset progress
          </button>
        ) : null}
      </div>
    </div>
  );
};

export const AchievementsProvider = ({ children }) => {
  const [unlocked, setUnlocked] = useState(readUnlocked);
  const [toasts, setToasts] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const unlockedRef = useRef(unlocked);

  const persist = (next) => {
    unlockedRef.current = next;
    setUnlocked(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      /* storage blocked */
    }
  };

  const unlock = useCallback((id, { silent = false } = {}) => {
    if (unlockedRef.current[id]) return;
    const achievement = ACHIEVEMENTS.find((a) => a.id === id);
    if (!achievement) return;

    persist({ ...unlockedRef.current, [id]: Date.now() });
    track("Achievement Unlocked", { id });

    if (silent) return;
    const key = `${id}-${Date.now()}`;
    setToasts((list) => [...list, { key, achievement }]);
    window.setTimeout(() => {
      setToasts((list) => list.filter((t) => t.key !== key));
    }, 4200);
  }, []);

  // Konami code, anywhere on the site.
  useEffect(() => {
    let position = 0;
    const onKey = (event) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      position = key === KONAMI[position] ? position + 1 : key === KONAMI[0] ? 1 : 0;
      if (position === KONAMI.length) {
        position = 0;
        burstConfetti();
        unlock("konami");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlock]);

  const openPanel = useCallback(() => {
    track("Achievements Open");
    setPanelOpen(true);
  }, []);
  const closePanel = useCallback(() => setPanelOpen(false), []);

  return (
    <AchievementsContext.Provider value={{ unlocked, unlock, openPanel }}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {toasts.map((t) => (
          <Toast key={t.key} achievement={t.achievement} />
        ))}
      </div>
      {panelOpen ? (
        <Panel unlocked={unlocked} onClose={closePanel} onReset={() => persist({})} />
      ) : null}
    </AchievementsContext.Provider>
  );
};

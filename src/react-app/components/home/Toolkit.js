import React from "react";
import { aiSystems, languages, technologies } from "../../content";
import "./Toolkit.css";

// Each skill or interest has a tiny glyph that animates on hover/focus.
// The glyphs are plain spans; the motion lives in Toolkit.css (.fx-<name>).

const dots = (n) => Array.from({ length: n }, (_, i) => <i key={i} style={{ "--k": i }} />);

const GLYPHS = {
  // AI systems
  tokens: () => (
    <>
      <span className="fx-caret" />
      <span className="fx-tokenrow">
        {["predict", "the", "next", "token"].map((t, i) => (
          <i key={t} style={{ "--k": i }}>
            {t}
          </i>
        ))}
      </span>
    </>
  ),
  agents: () => (
    <>
      <span className="fx-hub" />
      <span className="fx-orbit">{dots(3)}</span>
    </>
  ),
  versions: () => (
    <span className="fx-odo">
      <span>
        {["v1", "v2", "v3", "v4", "v5"].map((v) => (
          <b key={v}>{v}</b>
        ))}
      </span>
    </span>
  ),
  meter: () => (
    <span className="fx-meter">
      <i />
    </span>
  ),
  rank: () => (
    <span className="fx-odo">
      <span>
        {["#9", "#7", "#5", "#4", "#3"].map((v) => (
          <b key={v}>{v}</b>
        ))}
      </span>
    </span>
  ),
  latency: () => (
    <span className="fx-odo is-wide">
      <span>
        {["900ms", "640ms", "380ms", "210ms", "120ms"].map((v) => (
          <b key={v}>{v}</b>
        ))}
      </span>
    </span>
  ),
  shield: () => (
    <span className="fx-shield">
      <i />
    </span>
  ),
  layers: () => <span className="fx-layers">{dots(4)}</span>,

  // Interests
  sprout: () => (
    <span className="fx-sprout">
      <i className="stem" />
      <i className="leaf l" />
      <i className="leaf r" />
      <i className="soil" />
    </span>
  ),
  coin: () => (
    <span className="fx-coin">
      <i />
      <b>+1</b>
    </span>
  ),
  click: () => (
    <span className="fx-click">
      <i className="ring" />
      <svg viewBox="0 0 10 14" aria-hidden="true">
        <path d="M1 1v11l3-3 2 4 2-1-2-4h4z" />
      </svg>
    </span>
  ),
  signal: () => <span className="fx-signal">{dots(4)}</span>,
  heart: () => (
    <span className="fx-heart">
      <svg viewBox="0 0 7 6" shapeRendering="crispEdges" aria-hidden="true">
        <path d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z" />
      </svg>
    </span>
  ),
  dpad: () => (
    <span className="fx-dpad">
      {["u", "r", "d", "l"].map((d, i) => (
        <i key={d} className={d} style={{ "--k": i }} />
      ))}
    </span>
  ),

  // Project motifs (Impact cards)
  pencil: () => (
    <span className="fx-pencil">
      <i className="line" />
      <i className="tip" />
    </span>
  ),
  bell: () => (
    <span className="fx-bell">
      <svg viewBox="0 0 12 13" aria-hidden="true">
        <path d="M6 1a4 4 0 0 0-4 4v3L1 10h10L10 8V5a4 4 0 0 0-4-4zM4.5 11a1.5 1.5 0 0 0 3 0z" />
      </svg>
      <i className="badge" />
    </span>
  ),
  radar: () => (
    <span className="fx-radar">
      <i className="ring" />
      <i className="ring two" />
      <i className="blip" />
    </span>
  ),
  notebook: () => <span className="fx-notebook">{dots(3)}</span>,
  paws: () => <span className="fx-paws">{dots(3)}</span>,

  // Off screen
  blocks: () => <span className="fx-blocks">{dots(3)}</span>,
  football: () => (
    <span className="fx-ball is-football">
      <i />
    </span>
  ),
  basketball: () => (
    <span className="fx-ball is-basketball">
      <i />
    </span>
  ),
  dice: () => (
    <span className="fx-dice">
      <i>
        {dots(3)}
      </i>
    </span>
  ),
  gg: () => <span className="fx-gg">gg</span>,
  wasd: () => (
    <span className="fx-wasd">
      {["W", "A", "S", "D"].map((k, i) => (
        <i key={k} style={{ "--k": i }}>
          {k}
        </i>
      ))}
    </span>
  ),
};

export const Glyph = ({ type }) => {
  const Render = GLYPHS[type];
  return Render ? (
    <span className={`fx fx-${type}-box`} aria-hidden="true">
      <Render />
    </span>
  ) : null;
};

/** Small chip with an animated glyph (interests, off-screen). */
export const FxChips = ({ items, label }) => (
  <ul className="fx-chips" aria-label={label}>
    {items.map((item) => (
      <li key={item.label} className={`fx-chip fx-host is-${item.fx}`} tabIndex={0}>
        <Glyph type={item.fx} />
        <span>{item.label}</span>
      </li>
    ))}
  </ul>
);

const Toolkit = () => (
  <div className="toolkit">
    <section aria-labelledby="ai-heading">
      <h3 id="ai-heading" className="sub-title">
        AI systems
      </h3>
      <ul className="ai-grid">
        {aiSystems.map((item) => (
          <li key={item.label} className={`ai-tile fx-host is-${item.fx}`} tabIndex={0} data-glow>
            <Glyph type={item.fx} />
            <strong>{item.label}</strong>
            <span>{item.note}</span>
          </li>
        ))}
      </ul>
    </section>

    <div className="toolkit-split">
      <section aria-labelledby="lang-heading">
        <h3 id="lang-heading" className="sub-title">
          Languages
        </h3>
        <ul className="tag-list">
          {languages.map((item) => (
            <li key={item.label} className="tag has-code" tabIndex={0}>
              {item.label}
              <span className="tag-tip is-code" style={{ "--n": item.code.length }} aria-hidden="true">
                <code>{item.code}</code>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tech-heading">
        <h3 id="tech-heading" className="sub-title">
          Technologies
        </h3>
        <ul className="tag-list">
          {technologies.map((item) => (
            <li key={item.label} className="tag has-used" tabIndex={0} title={`Used in: ${item.used}`}>
              {item.label}
              <span className="tag-tip is-used" aria-hidden="true">
                <small>Used in</small>
                {item.used}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  </div>
);

export default Toolkit;

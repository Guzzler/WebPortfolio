import React from "react";

// Small inline icon set; replaces the Font Awesome kit script.
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const paths = {
  github: (
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z"
    />
  ),
  mail: (
    <g {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </g>
  ),
  gamepad: (
    <g {...stroke}>
      <path d="M7 8h10a4 4 0 0 1 4 4v1.5a3.5 3.5 0 0 1-6.3 2.1L14 14.5h-4l-.7 1.1A3.5 3.5 0 0 1 3 13.5V12a4 4 0 0 1 4-4Z" />
      <path d="M8 11v3M6.5 12.5h3" />
      <circle cx="15.5" cy="11.5" r=".6" fill="currentColor" />
      <circle cx="17.5" cy="13.5" r=".6" fill="currentColor" />
    </g>
  ),
  sun: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </g>
  ),
  moon: (
    <g {...stroke}>
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
    </g>
  ),
  arrowLeft: (
    <g {...stroke}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </g>
  ),
  arrowUpRight: (
    <g {...stroke}>
      <path d="M7 17 17 7M8 7h9v9" />
    </g>
  ),
  close: (
    <g {...stroke}>
      <path d="M6 6l12 12M18 6 6 18" />
    </g>
  ),
};

// Pixel-art trophy, drawn on an 11x11 grid.
const TROPHY = [
  ".#########.",
  "##.#####.##",
  "#..#####..#",
  "##.#####.##",
  "..#######..",
  "...#####...",
  "....###....",
  ".....#.....",
  ".....#.....",
  "...#####...",
  "..#######..",
];

const STAR = [
  "....#....",
  "....#....",
  "...###...",
  "#########",
  ".#######.",
  "..#####..",
  "..##.##..",
  ".##...##.",
  ".#.....#.",
];

const pixelRects = (grid) =>
  grid.flatMap((row, y) =>
    row.split("").map((cell, x) =>
      cell === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null
    )
  );

export const PixelIcon = ({ name, size = 16, className }) => {
  const grid = name === "star" ? STAR : TROPHY;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${grid[0].length} ${grid.length}`}
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {pixelRects(grid)}
    </svg>
  );
};

const Icon = ({ name, size = 18, className }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    {paths[name]}
  </svg>
);

export default Icon;

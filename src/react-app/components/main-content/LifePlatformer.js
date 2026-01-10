import React, { useEffect, useRef } from 'react';
import { initGame, destroyGame } from '../../../life-platformer/game';
import mixpanel from 'mixpanel-browser';

const LifePlatformer = () => {
  const gameContainerRef = useRef(null);
  const gameInstanceRef = useRef(null);

  useEffect(() => {
    // Track page view
    if (mixpanel) {
      mixpanel.track('Life Platformer - Page View');
    }

    // Initialize game
    if (gameContainerRef.current && !gameInstanceRef.current) {
      gameInstanceRef.current = initGame();
    }

    // Cleanup on unmount
    return () => {
      if (gameInstanceRef.current) {
        destroyGame();
        gameInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="life-platformer-container">
      <style>
        {`
          .life-platformer-container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to bottom, #0f172a, #1e293b);
            padding: 20px;
          }

          .life-platformer-header {
            text-align: center;
            margin-bottom: 20px;
            color: #ffffff;
          }

          .life-platformer-header h1 {
            font-family: monospace;
            font-size: 2.5rem;
            color: #3b82f6;
            margin-bottom: 10px;
          }

          .life-platformer-header p {
            font-family: monospace;
            font-size: 1rem;
            color: #94a3b8;
            margin-bottom: 5px;
          }

          #life-platformer-game {
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            border-radius: 8px;
            overflow: hidden;
            max-width: 100%;
          }

          #life-platformer-game canvas {
            display: block;
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
          }

          .life-platformer-footer {
            margin-top: 30px;
            text-align: center;
            color: #94a3b8;
            font-family: monospace;
            font-size: 0.875rem;
            max-width: 600px;
          }

          .life-platformer-controls {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid #3b82f6;
            border-radius: 8px;
            padding: 15px;
            margin-top: 15px;
          }

          .life-platformer-controls h3 {
            color: #3b82f6;
            margin-bottom: 10px;
            font-size: 1rem;
          }

          .life-platformer-controls ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .life-platformer-controls li {
            margin: 5px 0;
            color: #cbd5e1;
          }

          .life-platformer-controls li strong {
            color: #60a5fa;
          }

          @media (max-width: 768px) {
            .life-platformer-header h1 {
              font-size: 2rem;
            }

            .life-platformer-header p {
              font-size: 0.875rem;
            }

            #life-platformer-game {
              width: 100% !important;
              height: auto !important;
            }
          }
        `}
      </style>

      <div className="life-platformer-header">
        <h1>Life.run()</h1>
        <p>A pixelated journey through my life and career</p>
        <p style={{ fontSize: '0.875rem', color: '#64748b', fontStyle: 'italic' }}>
          "Every life is a journey. This is mine."
        </p>
      </div>

      <div id="life-platformer-game" ref={gameContainerRef}></div>

      <div className="life-platformer-footer">
        <div className="life-platformer-controls">
          <h3>Controls</h3>
          <ul>
            <li><strong>Arrow Keys / WASD:</strong> Move left/right</li>
            <li><strong>SPACE:</strong> Jump</li>
            <li><strong>E / ENTER:</strong> Interact with NPCs and dialogue</li>
            <li><strong>ESC:</strong> Pause (future feature)</li>
          </ul>
        </div>

        <p style={{ marginTop: '20px', lineHeight: '1.6' }}>
          This game chronicles my journey from school in Pune through college at MIT Manipal,
          into the startup world, and eventually to Carnegie Mellon and San Francisco.
          Collect achievements and talk to people who've been part of the journey!
        </p>

        <p style={{ marginTop: '15px', color: '#64748b', fontSize: '0.75rem' }}>
          Built with Phaser 3 and React | Pixel art aesthetic | 15-25 min playtime
        </p>
      </div>
    </div>
  );
};

export default LifePlatformer;

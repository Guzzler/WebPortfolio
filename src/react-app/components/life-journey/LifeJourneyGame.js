import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PhaserGameContainer from './PhaserGameContainer';
import './LifeJourneyGame.css';

const LifeJourneyGame = () => {
  const [currentLevel, setCurrentLevel] = useState('menu');

  const handleGameEvent = useCallback((eventType, data) => {
    switch (eventType) {
      case 'levelChange':
        setCurrentLevel(data.level);
        break;
      case 'levelComplete':
        setCurrentLevel(data.nextLevel);
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="life-journey-container">
      <Link to="/" className="back-to-portfolio">
        <i className="fa fa-arrow-left" /> Back to Portfolio
      </Link>

      <div className="game-wrapper">
        <PhaserGameContainer
          onGameEvent={handleGameEvent}
          isPaused={false}
        />
      </div>

      {currentLevel !== 'menu' && (
        <div className="level-indicator">
          <span className="level-dot"></span>
          {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
        </div>
      )}

      <div className="game-controls-hint">
        <span><kbd>Arrow Keys</kbd> or <kbd>WASD</kbd> to move</span>
        <span><kbd>Space</kbd> or <kbd>Up</kbd> to jump</span>
      </div>
    </div>
  );
};

export default LifeJourneyGame;

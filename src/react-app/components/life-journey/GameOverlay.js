import React from 'react';
import './GameOverlay.css';

const GameOverlay = ({ dialogContent, showDialog, onCloseDialog, currentLevel }) => {
  if (!showDialog || !dialogContent) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      e.preventDefault();
      onCloseDialog();
    }
  };

  return (
    <div
      className="game-overlay"
      onClick={onCloseDialog}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="story-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-header">
          {dialogContent.year && (
            <span className="dialog-year">{dialogContent.year}</span>
          )}
          <button
            className="dialog-close"
            onClick={onCloseDialog}
            aria-label="Close dialog"
          >
            <i className="fa fa-times" />
          </button>
        </div>

        <h3 className="dialog-title">{dialogContent.title}</h3>
        <p className="dialog-text">{dialogContent.text}</p>

        {dialogContent.skills && (
          <div className="dialog-skills">
            {dialogContent.skills.map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
            ))}
          </div>
        )}

        <button className="dialog-continue" onClick={onCloseDialog}>
          Continue Journey
          <i className="fa fa-arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default GameOverlay;

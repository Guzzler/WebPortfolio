import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { gameConfig } from './game/config';

const PhaserGameContainer = ({ onGameEvent, isPaused }) => {
  const gameContainerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config = {
      ...gameConfig,
      parent: gameContainerRef.current,
      callbacks: {
        postBoot: (game) => {
          // Set up event listeners for React communication
          game.events.on('storyTrigger', (data) => {
            if (onGameEvent) onGameEvent('storyTrigger', data);
          });

          game.events.on('levelChange', (data) => {
            if (onGameEvent) onGameEvent('levelChange', data);
          });

          game.events.on('levelComplete', (data) => {
            if (onGameEvent) onGameEvent('levelComplete', data);
          });

          // Store reference to pass pause state
          game.reactBridge = {
            isPaused: false
          };
        }
      }
    };

    gameRef.current = new Phaser.Game(config);

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [onGameEvent]);

  // Handle pause state changes
  useEffect(() => {
    if (gameRef.current && gameRef.current.reactBridge) {
      gameRef.current.reactBridge.isPaused = isPaused;

      // Pause/resume all scenes
      if (isPaused) {
        gameRef.current.scene.scenes.forEach(scene => {
          if (scene.scene.isActive()) {
            scene.scene.pause();
          }
        });
      } else {
        gameRef.current.scene.scenes.forEach(scene => {
          if (scene.scene.isPaused()) {
            scene.scene.resume();
          }
        });
      }
    }
  }, [isPaused]);

  return (
    <div
      ref={gameContainerRef}
      id="phaser-game-container"
      style={{
        width: '960px',
        height: '540px',
        maxWidth: '100vw'
      }}
    />
  );
};

export default PhaserGameContainer;

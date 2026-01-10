import Phaser from 'phaser';
import config from './config';

let gameInstance = null;

export const initGame = () => {
  if (gameInstance) {
    gameInstance.destroy(true);
  }
  gameInstance = new Phaser.Game(config);
  return gameInstance;
};

export const destroyGame = () => {
  if (gameInstance) {
    gameInstance.destroy(true);
    gameInstance = null;
  }
};

export const getGame = () => gameInstance;

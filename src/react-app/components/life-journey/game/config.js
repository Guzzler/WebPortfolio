import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import MenuScene from './scenes/MenuScene';
import SchoolScene from './scenes/SchoolScene';

export const gameConfig = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  pixelArt: true,
  roundPixels: true,
  antialias: false,
  backgroundColor: '#0f172a',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [
    BootScene,
    MenuScene,
    SchoolScene
  ],
  render: {
    pixelArt: true,
    antialias: false
  }
};

export default gameConfig;

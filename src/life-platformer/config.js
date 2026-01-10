import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import Phase1School from './scenes/Phase1School';
import Phase2College from './scenes/Phase2College';
import Phase3Work from './scenes/Phase3Work';
import Phase4USA from './scenes/Phase4USA';

const config = {
  type: Phaser.AUTO,
  parent: 'life-platformer-game',
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scene: [
    BootScene,
    TitleScene,
    Phase1School,
    Phase2College,
    Phase3Work,
    Phase4USA
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

export default config;

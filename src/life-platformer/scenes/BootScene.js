import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    const { width, height } = this.cameras.main;

    // Loading bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    // Update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0x3b82f6, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    // Load placeholder assets (will be replaced with actual pixel art)
    this.loadPlaceholderAssets();
  }

  loadPlaceholderAssets() {
    // Create placeholder graphics for development
    // These will be replaced with actual pixel art sprites

    // Player sprites for each phase (32x32)
    this.createPlaceholderSprite('player-phase1', 0x3b82f6); // Blue
    this.createPlaceholderSprite('player-phase2', 0x10b981); // Green
    this.createPlaceholderSprite('player-phase3', 0xf59e0b); // Orange
    this.createPlaceholderSprite('player-phase4', 0x8b5cf6); // Purple

    // Collectibles (16x16)
    this.createPlaceholderCollectible('collectible-trophy', 0xffd700);
    this.createPlaceholderCollectible('collectible-badge', 0x60a5fa);
    this.createPlaceholderCollectible('collectible-certificate', 0xfbbf24);

    // NPCs (32x32)
    this.createPlaceholderSprite('npc-teacher', 0x8b4513);
    this.createPlaceholderSprite('npc-mentor', 0x6366f1);
    this.createPlaceholderSprite('npc-colleague', 0x22c55e);

    // Particle for effects
    this.createParticle();

    // Tileset placeholder (16x16)
    this.createPlaceholderTile('tile-ground', 0x4b5563);
    this.createPlaceholderTile('tile-platform', 0x6b7280);
    this.createPlaceholderTile('tile-wall', 0x374151);
  }

  createPlaceholderSprite(key, color) {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(color);
    graphics.fillRect(0, 0, 32, 32);
    graphics.lineStyle(2, 0xffffff);
    graphics.strokeRect(0, 0, 32, 32);
    graphics.generateTexture(key, 32, 32);
    graphics.destroy();
  }

  createPlaceholderCollectible(key, color) {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(color);
    graphics.fillCircle(8, 8, 7);
    graphics.lineStyle(2, 0xffffff);
    graphics.strokeCircle(8, 8, 7);
    graphics.generateTexture(key, 16, 16);
    graphics.destroy();
  }

  createPlaceholderTile(key, color) {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(color);
    graphics.fillRect(0, 0, 16, 16);
    graphics.lineStyle(1, 0x000000);
    graphics.strokeRect(0, 0, 16, 16);
    graphics.generateTexture(key, 16, 16);
    graphics.destroy();
  }

  createParticle() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xffffff);
    graphics.fillCircle(4, 4, 4);
    graphics.generateTexture('particle', 8, 8);
    graphics.destroy();
  }

  create() {
    // Move to title screen
    this.scene.start('TitleScene');
  }
}

export default BootScene;

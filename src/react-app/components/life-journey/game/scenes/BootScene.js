import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Create loading bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0f172a);

    // Loading text
    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: '24px',
      color: '#e2e8f0'
    }).setOrigin(0.5);

    // Progress bar background
    const progressBarBg = this.add.rectangle(width / 2, height / 2, 400, 20, 0x1e293b);
    progressBarBg.setStrokeStyle(2, 0x3b82f6);

    // Progress bar fill
    const progressBar = this.add.rectangle(width / 2 - 195, height / 2, 0, 16, 0x3b82f6);
    progressBar.setOrigin(0, 0.5);

    // Percentage text
    const percentText = this.add.text(width / 2, height / 2 + 40, '0%', {
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: '16px',
      color: '#94a3b8'
    }).setOrigin(0.5);

    // Update progress bar
    this.load.on('progress', (value) => {
      progressBar.width = 390 * value;
      percentText.setText(`${Math.round(value * 100)}%`);
    });

    this.load.on('complete', () => {
      loadingText.setText('Ready!');
      percentText.setText('100%');
    });

    // Generate placeholder assets programmatically
    this.createPlaceholderAssets();
  }

  createPlaceholderAssets() {
    // Create a simple player sprite (32x32 placeholder)
    const playerGraphics = this.make.graphics({ x: 0, y: 0, add: false });

    // Body (blue rectangle)
    playerGraphics.fillStyle(0x3b82f6, 1);
    playerGraphics.fillRect(8, 8, 16, 20);

    // Head (lighter blue circle)
    playerGraphics.fillStyle(0x60a5fa, 1);
    playerGraphics.fillCircle(16, 8, 6);

    // Eyes (white dots)
    playerGraphics.fillStyle(0xffffff, 1);
    playerGraphics.fillCircle(14, 7, 2);
    playerGraphics.fillCircle(18, 7, 2);

    // Generate texture
    playerGraphics.generateTexture('player-placeholder', 32, 32);
    playerGraphics.destroy();

    // Create a simple platform tile (32x32)
    const platformGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    platformGraphics.fillStyle(0x475569, 1);
    platformGraphics.fillRect(0, 0, 32, 32);
    platformGraphics.fillStyle(0x64748b, 1);
    platformGraphics.fillRect(2, 2, 28, 4);
    platformGraphics.lineStyle(1, 0x334155, 1);
    platformGraphics.strokeRect(0, 0, 32, 32);
    platformGraphics.generateTexture('platform-tile', 32, 32);
    platformGraphics.destroy();

    // Create unique collectible icons for School level (24x24)
    this.createSchoolCollectibles();

    // Create a simple background gradient
    const bgGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    bgGraphics.fillGradientStyle(0x1e293b, 0x1e293b, 0x0f172a, 0x0f172a, 1);
    bgGraphics.fillRect(0, 0, 960, 540);
    bgGraphics.generateTexture('menu-bg', 960, 540);
    bgGraphics.destroy();
  }

  createSchoolCollectibles() {
    // Basketball (orange ball with lines)
    const basketball = this.make.graphics({ x: 0, y: 0, add: false });
    basketball.fillStyle(0xf97316, 1);
    basketball.fillCircle(12, 12, 10);
    basketball.lineStyle(2, 0x7c2d12, 1);
    basketball.strokeCircle(12, 12, 10);
    basketball.lineBetween(2, 12, 22, 12);
    basketball.lineBetween(12, 2, 12, 22);
    basketball.generateTexture('icon-basketball', 24, 24);
    basketball.destroy();

    // Trophy (gold cup shape)
    const trophy = this.make.graphics({ x: 0, y: 0, add: false });
    trophy.fillStyle(0xfbbf24, 1);
    trophy.fillRect(8, 4, 8, 10);
    trophy.fillRect(6, 4, 12, 4);
    trophy.fillStyle(0xf59e0b, 1);
    trophy.fillRect(10, 14, 4, 4);
    trophy.fillRect(7, 18, 10, 3);
    trophy.fillStyle(0xfef3c7, 1);
    trophy.fillRect(10, 6, 4, 3);
    trophy.generateTexture('icon-trophy', 24, 24);
    trophy.destroy();

    // Computer (monitor shape)
    const computer = this.make.graphics({ x: 0, y: 0, add: false });
    computer.fillStyle(0x475569, 1);
    computer.fillRect(3, 3, 18, 12);
    computer.fillStyle(0x3b82f6, 1);
    computer.fillRect(5, 5, 14, 8);
    computer.fillStyle(0x475569, 1);
    computer.fillRect(9, 15, 6, 2);
    computer.fillRect(6, 17, 12, 2);
    computer.generateTexture('icon-computer', 24, 24);
    computer.destroy();

    // Code book (book with code symbol)
    const codebook = this.make.graphics({ x: 0, y: 0, add: false });
    codebook.fillStyle(0x8b5cf6, 1);
    codebook.fillRect(4, 3, 16, 18);
    codebook.fillStyle(0x6d28d9, 1);
    codebook.fillRect(4, 3, 3, 18);
    codebook.fillStyle(0xfef3c7, 1);
    codebook.fillRect(9, 7, 2, 6);
    codebook.fillRect(13, 7, 2, 6);
    codebook.lineBetween(8, 8, 10, 10);
    codebook.lineBetween(14, 8, 16, 10);
    codebook.generateTexture('icon-codebook', 24, 24);
    codebook.destroy();

    // Scholar badge (star/medal)
    const scholar = this.make.graphics({ x: 0, y: 0, add: false });
    scholar.fillStyle(0x22c55e, 1);
    scholar.fillCircle(12, 10, 8);
    scholar.fillStyle(0x16a34a, 1);
    scholar.fillRect(10, 16, 4, 5);
    scholar.fillStyle(0xfef3c7, 1);
    // Star shape approximation
    scholar.fillTriangle(12, 4, 14, 9, 10, 9);
    scholar.fillTriangle(12, 14, 14, 9, 10, 9);
    scholar.fillTriangle(6, 10, 11, 8, 11, 12);
    scholar.fillTriangle(18, 10, 13, 8, 13, 12);
    scholar.generateTexture('icon-scholar', 24, 24);
    scholar.destroy();
  }

  create() {
    // Small delay for visual feedback, then start menu
    this.time.delayedCall(500, () => {
      this.scene.start('MenuScene');
    });
  }
}

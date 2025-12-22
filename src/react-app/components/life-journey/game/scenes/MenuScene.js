import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add.image(width / 2, height / 2, 'menu-bg');

    // Animated background particles
    this.createParticles();

    // Title with pixel-style effect
    const titleText = this.add.text(width / 2, height / 3, 'LIFE JOURNEY', {
      fontFamily: '"Press Start 2P", "Courier New", monospace',
      fontSize: '48px',
      color: '#3b82f6',
      stroke: '#1e40af',
      strokeThickness: 4,
      shadow: {
        offsetX: 4,
        offsetY: 4,
        color: '#0f172a',
        blur: 0,
        fill: true
      }
    }).setOrigin(0.5);

    // Subtle title animation
    this.tweens.add({
      targets: titleText,
      y: height / 3 - 5,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Subtitle
    this.add.text(width / 2, height / 3 + 60, 'A journey through Sharang\'s life', {
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: '18px',
      color: '#94a3b8'
    }).setOrigin(0.5);

    // Start button
    const buttonBg = this.add.rectangle(width / 2, height / 2 + 80, 200, 50, 0x3b82f6)
      .setInteractive({ useHandCursor: true });

    const buttonText = this.add.text(width / 2, height / 2 + 80, 'START GAME', {
      fontFamily: '"Press Start 2P", "Courier New", monospace',
      fontSize: '14px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Button hover effects
    buttonBg.on('pointerover', () => {
      buttonBg.setFillStyle(0x2563eb);
      this.tweens.add({
        targets: [buttonBg, buttonText],
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 100
      });
    });

    buttonBg.on('pointerout', () => {
      buttonBg.setFillStyle(0x3b82f6);
      this.tweens.add({
        targets: [buttonBg, buttonText],
        scaleX: 1,
        scaleY: 1,
        duration: 100
      });
    });

    buttonBg.on('pointerdown', () => {
      this.startGame();
    });

    // Keyboard support
    this.input.keyboard.on('keydown-SPACE', () => {
      this.startGame();
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      this.startGame();
    });

    // Level preview cards
    this.createLevelPreviews();
  }

  createParticles() {
    // Create floating particle effect
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(0, 960);
      const y = Phaser.Math.Between(0, 540);
      const particle = this.add.circle(x, y, Phaser.Math.Between(1, 3), 0x3b82f6, 0.3);

      this.tweens.add({
        targets: particle,
        y: y - Phaser.Math.Between(50, 150),
        alpha: 0,
        duration: Phaser.Math.Between(3000, 6000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000),
        onRepeat: () => {
          particle.y = Phaser.Math.Between(540, 600);
          particle.x = Phaser.Math.Between(0, 960);
          particle.alpha = 0.3;
        }
      });
    }
  }

  createLevelPreviews() {
    const levels = [
      { name: 'School', year: '2003-2015', color: 0x22c55e },
      { name: 'University', year: '2015-2019', color: 0x3b82f6 },
      { name: 'Work', year: '2019-2022', color: 0x8b5cf6 },
      { name: 'Now', year: '2022-Present', color: 0xf59e0b }
    ];

    const startX = 240;
    const spacing = 180;
    const y = this.cameras.main.height / 2 + 170;

    levels.forEach((level, index) => {
      const x = startX + (index * spacing);

      // Card background
      this.add.rectangle(x, y, 140, 60, 0x1e293b)
        .setStrokeStyle(2, level.color, 0.5);

      // Level indicator dot
      this.add.circle(x - 50, y, 6, level.color);

      // Level name
      this.add.text(x + 10, y - 10, level.name, {
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: '14px',
        color: '#e2e8f0',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Year
      this.add.text(x + 10, y + 10, level.year, {
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: '11px',
        color: '#64748b'
      }).setOrigin(0.5);
    });
  }

  startGame() {
    // Prevent multiple triggers
    if (this.isStarting) return;
    this.isStarting = true;

    // Fade out and start the first level
    this.cameras.main.fadeOut(500, 15, 23, 42);

    this.cameras.main.once('camerafadeoutcomplete', () => {
      // Start the School level
      this.scene.start('SchoolScene');
    });
  }
}

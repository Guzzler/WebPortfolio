import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background gradient effect
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0x0f172a, 0x0f172a, 0x1e293b, 0x1e293b, 1);
    graphics.fillRect(0, 0, width, height);

    // Title
    const title = this.add.text(width / 2, height / 3, 'Life.run()', {
      fontSize: '64px',
      fill: '#3b82f6',
      fontFamily: 'monospace',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    // Subtitle
    const subtitle = this.add.text(
      width / 2,
      height / 3 + 60,
      'A Journey Through Code and Life',
      {
        fontSize: '16px',
        fill: '#60a5fa',
        fontFamily: 'monospace'
      }
    );
    subtitle.setOrigin(0.5);

    // Author
    const author = this.add.text(
      width / 2,
      height / 3 + 90,
      'by Sharang Pai',
      {
        fontSize: '14px',
        fill: '#94a3b8',
        fontFamily: 'monospace',
        fontStyle: 'italic'
      }
    );
    author.setOrigin(0.5);

    // Start button
    const startButton = this.add.text(
      width / 2,
      height / 2 + 80,
      'Press SPACE to Start',
      {
        fontSize: '20px',
        fill: '#ffffff',
        fontFamily: 'monospace',
        backgroundColor: '#3b82f6',
        padding: { x: 20, y: 10 }
      }
    );
    startButton.setOrigin(0.5);

    // Blinking animation for start button
    this.tweens.add({
      targets: startButton,
      alpha: 0.5,
      duration: 800,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    // Instructions
    const instructions = this.add.text(
      width / 2,
      height - 60,
      'Arrow Keys / WASD: Move | SPACE: Jump | E: Interact',
      {
        fontSize: '12px',
        fill: '#94a3b8',
        fontFamily: 'monospace'
      }
    );
    instructions.setOrigin(0.5);

    // Quote
    const quote = this.add.text(
      width / 2,
      height / 2 + 20,
      '"Every life is a journey. This is mine."',
      {
        fontSize: '14px',
        fill: '#cbd5e1',
        fontFamily: 'monospace',
        fontStyle: 'italic'
      }
    );
    quote.setOrigin(0.5);

    // Input to start game
    this.input.keyboard.once('keydown-SPACE', () => {
      this.startGame();
    });

    this.input.keyboard.once('keydown-ENTER', () => {
      this.startGame();
    });

    // Add decorative elements
    this.addDecorativeElements();
  }

  addDecorativeElements() {
    const { width, height } = this.cameras.main;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const particle = this.add.circle(x, y, 2, 0x3b82f6, 0.3);

      this.tweens.add({
        targets: particle,
        y: y - Phaser.Math.Between(50, 150),
        alpha: 0,
        duration: Phaser.Math.Between(2000, 4000),
        ease: 'Sine.easeOut',
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000)
      });
    }

    // Four phase indicators
    const phases = [
      { text: '2003-2015\nSchool', color: 0xfbbf24 },
      { text: '2015-2019\nUndergrad', color: 0x10b981 },
      { text: '2019-2022\nWork', color: 0x3b82f6 },
      { text: '2022-Now\nUSA', color: 0x8b5cf6 }
    ];

    const startX = width / 2 - 300;
    const y = height - 120;

    phases.forEach((phase, index) => {
      const x = startX + index * 200;
      const phaseCircle = this.add.circle(x, y, 12, phase.color, 0.5);
      const phaseText = this.add.text(x, y + 25, phase.text, {
        fontSize: '10px',
        fill: '#94a3b8',
        fontFamily: 'monospace',
        align: 'center'
      });
      phaseText.setOrigin(0.5);

      // Pulse animation
      this.tweens.add({
        targets: phaseCircle,
        scaleX: 1.2,
        scaleY: 1.2,
        alpha: 0.8,
        duration: 1000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        delay: index * 250
      });
    });
  }

  startGame() {
    // Fade out
    this.cameras.main.fadeOut(500, 0, 0, 0);

    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('Phase1School');
    });
  }
}

export default TitleScene;

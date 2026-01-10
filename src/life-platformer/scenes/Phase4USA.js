import Phaser from 'phaser';
import Player from '../entities/Player';
import NPC from '../entities/NPC';
import Collectible from '../entities/Collectible';
import DialogueManager from '../managers/DialogueManager';
import ProgressTracker from '../managers/ProgressTracker';
import AudioManager from '../managers/AudioManager';

class Phase4USA extends Phaser.Scene {
  constructor() {
    super({ key: 'Phase4USA' });
  }

  create() {
    const { width, height } = this.cameras.main;

    this.dialogueManager = new DialogueManager(this);
    this.progressTracker = new ProgressTracker(this);
    this.progressTracker.changePhase(4);
    this.audioManager = new AudioManager(this);

    this.createBackground();
    this.createLevel();
    this.player = new Player(this, 100, height - 100, 4);
    this.createCollectibles();
    this.createNPCs();
    this.createFutureDoor();

    this.cameras.main.setBounds(0, 0, width * 2.5, height);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.physics.world.setBounds(0, 0, width * 2.5, height);

    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }

  createBackground() {
    const { width, height } = this.cameras.main;
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0x1e1b4b, 0x1e1b4b, 0x7c3aed, 0x7c3aed, 1);
    graphics.fillRect(0, 0, width * 2.5, height);

    // CMU section
    const cmuText = this.add.text(400, 100, 'Carnegie Mellon\n2022-2024', {
      fontSize: '20px',
      fill: '#dc2626',
      fontFamily: 'monospace',
      align: 'center',
      fontStyle: 'bold'
    });
    cmuText.setOrigin(0.5);

    // SF section
    const sfText = this.add.text(1200, 100, 'San Francisco\nPersona AI\n2024-Present', {
      fontSize: '20px',
      fill: '#8b5cf6',
      fontFamily: 'monospace',
      align: 'center',
      fontStyle: 'bold'
    });
    sfText.setOrigin(0.5);

    // Add stars for futuristic feel
    for (let i = 0; i < 50; i++) {
      const star = this.add.circle(
        Phaser.Math.Between(0, width * 2.5),
        Phaser.Math.Between(0, height / 2),
        Phaser.Math.Between(1, 3),
        0xffffff,
        0.6
      );

      this.tweens.add({
        targets: star,
        alpha: 0.2,
        duration: Phaser.Math.Between(1000, 3000),
        yoyo: true,
        repeat: -1
      });
    }
  }

  createLevel() {
    const { width, height } = this.cameras.main;
    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < width * 2.5; i += 16) {
      const ground = this.add.rectangle(i + 8, height - 8, 16, 16, 0x4c1d95);
      this.platforms.add(ground);
    }

    // CMU campus platforms
    const platformData = [
      { x: 300, y: height - 150, w: 180, h: 16 },
      { x: 500, y: height - 220, w: 150, h: 16 },
      { x: 700, y: height - 280, w: 160, h: 16 },
      // Transition area
      { x: 900, y: height - 200, w: 140, h: 16 },
      // SF Persona AI
      { x: 1100, y: height - 240, w: 200, h: 16 },
      { x: 1350, y: height - 180, w: 180, h: 16 },
      { x: 1600, y: height - 260, w: 160, h: 16 },
      { x: 1850, y: height - 200, w: 150, h: 16 }
    ];

    platformData.forEach(p => {
      const platform = this.add.rectangle(p.x, p.y, p.w, p.h, 0x6d28d9);
      this.platforms.add(platform);
    });
  }

  createCollectibles() {
    const { height } = this.cameras.main;
    this.collectibles = this.physics.add.group();

    const collectiblesData = [
      { x: 300, y: height - 200, key: 'collectible-trophy', name: 'MS AI Degree', description: 'Carnegie Mellon University' },
      { x: 500, y: height - 270, key: 'collectible-certificate', name: 'Machine Learning', description: 'Advanced ML coursework' },
      { x: 650, y: height - 150, key: 'collectible-badge', name: 'LLM Research', description: 'Large Language Models study' },
      { x: 800, y: height - 250, key: 'collectible-certificate', name: 'On-Device ML', description: 'Mobile AI optimization' },
      { x: 1100, y: height - 290, key: 'collectible-trophy', name: 'Persona AI Founding Engineer', description: 'Building AI avatars' },
      { x: 1250, y: height - 120, key: 'collectible-badge', name: '3D Avatar Hologram', description: 'Advanced AI systems' },
      { x: 1400, y: height - 230, key: 'collectible-certificate', name: 'SwiftUI', description: 'iOS development' },
      { x: 1600, y: height - 310, key: 'collectible-badge', name: 'FastAPI', description: 'Modern Python APIs' },
      { x: 1750, y: height - 150, key: 'collectible-trophy', name: 'Social Entrepreneurship', description: 'Tech for underserved communities' },
      { x: 1900, y: height - 250, key: 'collectible-certificate', name: 'Future Compass', description: 'The journey continues...' }
    ];

    collectiblesData.forEach(data => {
      const collectible = new Collectible(this, data.x, data.y, data.key, {
        name: data.name,
        description: data.description,
        phase: 4
      });
      this.collectibles.add(collectible);
    });

    this.physics.add.overlap(this.player, this.collectibles, (player, collectible) => {
      collectible.collect(this.progressTracker);
    });
  }

  createNPCs() {
    const { height } = this.cameras.main;
    this.npcs = this.physics.add.group();

    const npcsData = [
      {
        x: 550,
        y: height - 252,
        key: 'npc-mentor',
        dialogue: {
          speaker: 'CMU Professor',
          lines: [
            'Excellent work in Advanced NLP!',
            'Your research on LLMs is cutting-edge.',
            'I see a bright future in AI for you.'
          ]
        }
      },
      {
        x: 1150,
        y: height - 272,
        key: 'npc-colleague',
        dialogue: {
          speaker: 'Persona AI Team',
          lines: [
            'Welcome to the team!',
            'Your work on behavioral systems is amazing.',
            'We\'re building the future of AI avatars together.'
          ]
        }
      }
    ];

    npcsData.forEach(data => {
      const npc = new NPC(this, data.x, data.y, data.key, data.dialogue);
      this.npcs.add(npc);
    });

    this.physics.add.collider(this.npcs, this.platforms);
    this.physics.add.overlap(this.player, this.npcs, (player, npc) => {
      npc.showIndicator();
      if (Phaser.Input.Keyboard.JustDown(this.player.interactKey)) {
        npc.interact(this.dialogueManager);
      }
    });
  }

  createFutureDoor() {
    const { width, height } = this.cameras.main;

    // Future door at the end
    this.futureDoor = this.add.rectangle(
      width * 2.5 - 80,
      height - 150,
      60,
      200,
      0xffffff,
      0
    );
    this.physics.add.existing(this.futureDoor);
    this.futureDoor.body.setAllowGravity(false);

    // Glowing door visualization
    const doorGlow = this.add.rectangle(
      width * 2.5 - 80,
      height - 150,
      60,
      200,
      0xffffff,
      0.3
    );

    this.tweens.add({
      targets: doorGlow,
      alpha: 0.7,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    const doorSign = this.add.text(
      width * 2.5 - 80,
      height - 280,
      'FUTURE\n✨',
      {
        fontSize: '24px',
        fill: '#ffffff',
        fontFamily: 'monospace',
        fontStyle: 'bold',
        align: 'center'
      }
    );
    doorSign.setOrigin(0.5);

    this.physics.add.overlap(
      this.player,
      this.futureDoor,
      () => {
        this.showEnding();
      },
      null,
      this
    );
  }

  showEnding() {
    if (this.isEnding) return;
    this.isEnding = true;

    const { width, height } = this.cameras.main;

    // Full screen overlay
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0);
    overlay.setScrollFactor(0);
    overlay.setDepth(3000);

    // Ending text
    const endingText = this.add.text(
      width / 2,
      height / 2,
      'The journey continues...\n\nThank you for playing!\n\n- Sharang',
      {
        fontSize: '24px',
        fill: '#ffffff',
        fontFamily: 'monospace',
        align: 'center'
      }
    );
    endingText.setOrigin(0.5);
    endingText.setScrollFactor(0);
    endingText.setDepth(3001);
    endingText.setAlpha(0);

    // Fade in overlay
    this.tweens.add({
      targets: overlay,
      alpha: 1,
      duration: 2000,
      ease: 'Power2'
    });

    // Fade in text
    this.tweens.add({
      targets: endingText,
      alpha: 1,
      duration: 2000,
      delay: 1000,
      ease: 'Power2',
      onComplete: () => {
        // Show restart option
        this.time.delayedCall(3000, () => {
          const restartText = this.add.text(
            width / 2,
            height / 2 + 100,
            'Press SPACE to return to title',
            {
              fontSize: '14px',
              fill: '#60a5fa',
              fontFamily: 'monospace'
            }
          );
          restartText.setOrigin(0.5);
          restartText.setScrollFactor(0);
          restartText.setDepth(3001);

          this.input.keyboard.once('keydown-SPACE', () => {
            this.progressTracker.resetProgress();
            this.cleanup();
            this.scene.start('TitleScene');
          });
        });
      }
    });
  }

  update() {
    if (this.player) {
      this.player.update();
      this.physics.collide(this.player, this.platforms);
    }

    if (this.npcs) {
      this.npcs.getChildren().forEach(npc => {
        npc.update();
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
        if (distance > 60) npc.hideIndicator();
      });
    }
  }

  cleanup() {
    if (this.dialogueManager) this.dialogueManager.destroy();
    if (this.progressTracker) this.progressTracker.destroy();
    if (this.audioManager) this.audioManager.stopMusic();
  }
}

export default Phase4USA;

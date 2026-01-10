import Phaser from 'phaser';
import Player from '../entities/Player';
import NPC from '../entities/NPC';
import Collectible from '../entities/Collectible';
import DialogueManager from '../managers/DialogueManager';
import ProgressTracker from '../managers/ProgressTracker';
import AudioManager from '../managers/AudioManager';

class Phase1School extends Phaser.Scene {
  constructor() {
    super({ key: 'Phase1School' });
  }

  create() {
    const { width, height } = this.cameras.main;

    // Initialize managers
    this.dialogueManager = new DialogueManager(this);
    this.progressTracker = new ProgressTracker(this);
    this.progressTracker.changePhase(1);
    this.audioManager = new AudioManager(this);

    // Background
    this.createBackground();

    // Create ground and platforms
    this.createLevel();

    // Create player
    this.player = new Player(this, 100, height - 100, 1);

    // Create collectibles
    this.createCollectibles();

    // Create NPCs
    this.createNPCs();

    // Create exit zone
    this.createExitZone();

    // Camera
    this.cameras.main.setBounds(0, 0, width * 2, height);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.physics.world.setBounds(0, 0, width * 2, height);

    // Fade in
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    // Welcome message
    this.time.delayedCall(1500, () => {
      this.dialogueManager.showDialogue({
        speaker: 'Narrator',
        lines: [
          'Welcome to Delhi Public School, Pune.',
          'The year is 2003. Your journey begins here.',
          'Explore and collect achievements along the way!'
        ]
      });
    });
  }

  createBackground() {
    const { width, height } = this.cameras.main;

    // Sky gradient
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0x87ceeb, 0x87ceeb, 0xffd700, 0xffd700, 1);
    graphics.fillRect(0, 0, width * 2, height);

    // Sun
    this.add.circle(width * 1.5, 80, 40, 0xffd700, 0.8);

    // Clouds
    for (let i = 0; i < 5; i++) {
      this.add.ellipse(
        Phaser.Math.Between(0, width * 2),
        Phaser.Math.Between(50, 150),
        Phaser.Math.Between(80, 120),
        40,
        0xffffff,
        0.7
      );
    }

    // School building silhouette
    this.add.rectangle(width, height - 150, 400, 300, 0xc4a77d, 0.6);
  }

  createLevel() {
    const { width, height } = this.cameras.main;

    // Platforms group
    this.platforms = this.physics.add.staticGroup();

    // Ground
    for (let i = 0; i < width * 2; i += 16) {
      const ground = this.add.rectangle(i + 8, height - 8, 16, 16, 0x4b5563);
      this.platforms.add(ground);
    }

    // Platforms for exploration
    const platformData = [
      { x: 300, y: height - 150, w: 120, h: 16 }, // First platform
      { x: 500, y: height - 220, w: 100, h: 16 }, // Computer lab platform
      { x: 800, y: height - 180, w: 150, h: 16 }, // Basketball court
      { x: 1100, y: height - 250, w: 120, h: 16 }, // Student council
      { x: 1400, y: height - 200, w: 140, h: 16 }, // Final platform
    ];

    platformData.forEach(p => {
      const platform = this.add.rectangle(p.x, p.y, p.w, p.h, 0x6b7280);
      this.platforms.add(platform);
    });

    // Add collision
    this.physics.add.collider(this.platforms, this.platforms);
  }

  createCollectibles() {
    const { height } = this.cameras.main;

    this.collectibles = this.physics.add.group();

    const collectiblesData = [
      { x: 250, y: height - 100, key: 'collectible-trophy', name: 'Basketball Trophy', description: 'Varsity team captain' },
      { x: 500, y: height - 270, key: 'collectible-badge', name: 'Student Council Badge', description: 'Head of Student Council (2500+ students)' },
      { x: 600, y: height - 150, key: 'collectible-certificate', name: 'Programming Certificate', description: 'Indian National Informatics Olympiad qualifier' },
      { x: 750, y: height - 230, key: 'collectible-badge', name: 'Google Code-in Badge', description: 'Participated in Google Code-in 2013' },
      { x: 950, y: height - 100, key: 'collectible-trophy', name: 'Scholar Honours', description: 'Academic excellence award' },
      { x: 1200, y: height - 300, key: 'collectible-certificate', name: 'Graduation Cap', description: 'Completed high school (2003-2015)' },
      { x: 1350, y: height - 150, key: 'collectible-badge', name: 'Board Game', description: 'Playing board games (hobby)' },
      { x: 1450, y: height - 250, key: 'collectible-trophy', name: 'Football', description: 'Football enthusiast' }
    ];

    collectiblesData.forEach(data => {
      const collectible = new Collectible(this, data.x, data.y, data.key, {
        name: data.name,
        description: data.description,
        phase: 1
      });
      this.collectibles.add(collectible);
    });

    // Collision with player
    this.physics.add.overlap(
      this.player,
      this.collectibles,
      (player, collectible) => {
        collectible.collect(this.progressTracker);
      },
      null,
      this
    );
  }

  createNPCs() {
    const { height } = this.cameras.main;

    this.npcs = this.physics.add.group();

    const npcsData = [
      {
        x: 350,
        y: height - 182,
        key: 'npc-teacher',
        dialogue: {
          speaker: 'Teacher',
          lines: [
            'Welcome to DPS Pune!',
            'I can see you have a bright future ahead.',
            'Keep up the excellent work in your studies!'
          ]
        }
      },
      {
        x: 850,
        y: height - 212,
        key: 'npc-mentor',
        dialogue: {
          speaker: 'Basketball Coach',
          lines: [
            'Great job leading the varsity team!',
            'Your dedication to both sports and academics is impressive.'
          ]
        }
      },
      {
        x: 1150,
        y: height - 282,
        key: 'npc-colleague',
        dialogue: {
          speaker: 'Fellow Student',
          lines: [
            'Congrats on winning the Informatics Olympiad!',
            'You really are amazing at coding.',
            'What project are you working on next?'
          ]
        }
      }
    ];

    npcsData.forEach(data => {
      const npc = new NPC(this, data.x, data.y, data.key, data.dialogue);
      this.npcs.add(npc);
    });

    // Collision with platforms
    this.physics.add.collider(this.npcs, this.platforms);

    // Overlap with player for interaction
    this.physics.add.overlap(
      this.player,
      this.npcs,
      (player, npc) => {
        npc.showIndicator();

        // Check for interaction key
        if (Phaser.Input.Keyboard.JustDown(this.player.interactKey)) {
          npc.interact(this.dialogueManager);
        }
      },
      null,
      this
    );
  }

  createExitZone() {
    const { width, height } = this.cameras.main;

    // Exit zone at the end
    this.exitZone = this.add.rectangle(
      width * 2 - 100,
      height - 100,
      80,
      150,
      0x10b981,
      0.5
    );
    this.physics.add.existing(this.exitZone);
    this.exitZone.body.setAllowGravity(false);

    // Exit sign
    const exitSign = this.add.text(
      width * 2 - 100,
      height - 200,
      'To College →',
      {
        fontSize: '16px',
        fill: '#10b981',
        fontFamily: 'monospace',
        fontStyle: 'bold'
      }
    );
    exitSign.setOrigin(0.5);

    // Overlap detection
    this.physics.add.overlap(
      this.player,
      this.exitZone,
      () => {
        this.transitionToNextPhase();
      },
      null,
      this
    );
  }

  transitionToNextPhase() {
    // Prevent multiple transitions
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Fade out
    this.cameras.main.fadeOut(1000, 0, 0, 0);

    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.cleanup();
      this.scene.start('Phase2College');
    });
  }

  update() {
    if (this.player) {
      this.player.update();

      // Collision with platforms
      this.physics.collide(this.player, this.platforms);
    }

    // Update NPCs
    if (this.npcs) {
      this.npcs.getChildren().forEach(npc => {
        npc.update();

        // Hide indicator if player is far
        const distance = Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          npc.x,
          npc.y
        );
        if (distance > 60) {
          npc.hideIndicator();
        }
      });
    }
  }

  cleanup() {
    if (this.dialogueManager) this.dialogueManager.destroy();
    if (this.progressTracker) this.progressTracker.destroy();
    if (this.audioManager) this.audioManager.stopMusic();
  }
}

export default Phase1School;

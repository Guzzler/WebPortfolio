import Phaser from 'phaser';
import Player from '../entities/Player';
import NPC from '../entities/NPC';
import Collectible from '../entities/Collectible';
import DialogueManager from '../managers/DialogueManager';
import ProgressTracker from '../managers/ProgressTracker';
import AudioManager from '../managers/AudioManager';

class Phase3Work extends Phaser.Scene {
  constructor() {
    super({ key: 'Phase3Work' });
  }

  create() {
    const { width, height } = this.cameras.main;

    this.dialogueManager = new DialogueManager(this);
    this.progressTracker = new ProgressTracker(this);
    this.progressTracker.changePhase(3);
    this.audioManager = new AudioManager(this);

    this.createBackground();
    this.createLevel();
    this.player = new Player(this, 100, height - 100, 3);
    this.createCollectibles();
    this.createNPCs();
    this.createExitZone();

    this.cameras.main.setBounds(0, 0, width * 2, height);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.physics.world.setBounds(0, 0, width * 2, height);

    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }

  createBackground() {
    const { width, height } = this.cameras.main;
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0x1e293b, 0x1e293b, 0x3b82f6, 0x3b82f6, 1);
    graphics.fillRect(0, 0, width * 2, height);

    // Office building visualization
    const buildingLabels = [
      { x: 400, y: 150, text: 'Instamojo\n2019-2021' },
      { x: 800, y: 120, text: 'RedBrickAI\n2021-2022' },
      { x: 1200, y: 100, text: 'StepChange\n2022' }
    ];

    buildingLabels.forEach(label => {
      const text = this.add.text(label.x, label.y, label.text, {
        fontSize: '16px',
        fill: '#60a5fa',
        fontFamily: 'monospace',
        align: 'center',
        fontStyle: 'bold'
      });
      text.setOrigin(0.5);
    });
  }

  createLevel() {
    const { width, height } = this.cameras.main;
    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < width * 2; i += 16) {
      const ground = this.add.rectangle(i + 8, height - 8, 16, 16, 0x374151);
      this.platforms.add(ground);
    }

    // Multi-floor office building
    const platformData = [
      // Instamojo floor
      { x: 300, y: height - 120, w: 200, h: 16 },
      { x: 500, y: height - 180, w: 150, h: 16 },
      // RedBrickAI floor
      { x: 750, y: height - 220, w: 180, h: 16 },
      { x: 950, y: height - 280, w: 160, h: 16 },
      // StepChange floor
      { x: 1150, y: height - 240, w: 200, h: 16 },
      { x: 1350, y: height - 180, w: 150, h: 16 },
      // VaccinePost side room
      { x: 600, y: height - 140, w: 100, h: 16 }
    ];

    platformData.forEach(p => {
      const platform = this.add.rectangle(p.x, p.y, p.w, p.h, 0x4b5563);
      this.platforms.add(platform);
    });
  }

  createCollectibles() {
    const { height } = this.cameras.main;
    this.collectibles = this.physics.add.group();

    const collectiblesData = [
      { x: 350, y: height - 170, key: 'collectible-trophy', name: 'Instamojo Terminal', description: 'Fintech full-stack development' },
      { x: 500, y: height - 230, key: 'collectible-badge', name: 'Full-Stack Developer', description: 'Python, React, Django, GoLang' },
      { x: 600, y: height - 190, key: 'collectible-certificate', name: 'VaccinePost', description: 'COVID vaccine notification system' },
      { x: 800, y: height - 270, key: 'collectible-trophy', name: 'RedBrickAI Founding Engineer', description: 'Led UI/UX team for CV platform' },
      { x: 950, y: height - 330, key: 'collectible-badge', name: 'GraphQL', description: 'Modern API development' },
      { x: 1050, y: height - 120, key: 'collectible-certificate', name: 'TypeScript', description: 'Type-safe development' },
      { x: 1200, y: height - 290, key: 'collectible-trophy', name: 'StepChange Leaf', description: 'Environmental tech impact' },
      { x: 1350, y: height - 230, key: 'collectible-badge', name: 'AWS Cloud', description: 'Cloud infrastructure' },
      { x: 1450, y: height - 150, key: 'collectible-certificate', name: 'Team Leadership', description: 'Led engineering teams' },
      { x: 1500, y: height - 100, key: 'collectible-trophy', name: 'Social Impact Star', description: 'Technology for good' },
      { x: 1550, y: height - 180, key: 'collectible-badge', name: 'Startup Founder', description: 'Founding engineer experience' },
      { x: 1550, y: height - 80, key: 'collectible-certificate', name: 'Career Milestone', description: 'Professional growth' }
    ];

    collectiblesData.forEach(data => {
      const collectible = new Collectible(this, data.x, data.y, data.key, {
        name: data.name,
        description: data.description,
        phase: 3
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
        x: 400,
        y: height - 152,
        key: 'npc-colleague',
        dialogue: {
          speaker: 'Instamojo Colleague',
          lines: [
            'Your work on the payment system is excellent!',
            'You\'ve really mastered full-stack development.'
          ]
        }
      },
      {
        x: 850,
        y: height - 252,
        key: 'npc-mentor',
        dialogue: {
          speaker: 'RedBrickAI Co-founder',
          lines: [
            'Thanks for joining us as founding engineer!',
            'Your leadership on the UI/UX is exceptional.',
            'We couldn\'t have built this without you.'
          ]
        }
      },
      {
        x: 1250,
        y: height - 272,
        key: 'npc-colleague',
        dialogue: {
          speaker: 'StepChange Team',
          lines: [
            'Great work on the carbon tracking features!',
            'You\'re making real environmental impact.'
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

  createExitZone() {
    const { width, height } = this.cameras.main;

    this.exitZone = this.add.rectangle(width * 2 - 100, height - 100, 80, 150, 0x8b5cf6, 0.5);
    this.physics.add.existing(this.exitZone);
    this.exitZone.body.setAllowGravity(false);

    const exitSign = this.add.text(width * 2 - 100, height - 200, 'To USA →', {
      fontSize: '16px',
      fill: '#8b5cf6',
      fontFamily: 'monospace',
      fontStyle: 'bold'
    });
    exitSign.setOrigin(0.5);

    this.physics.add.overlap(this.player, this.exitZone, () => this.transitionToNextPhase());
  }

  transitionToNextPhase() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.cleanup();
      this.scene.start('Phase4USA');
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

export default Phase3Work;

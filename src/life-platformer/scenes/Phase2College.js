import Phaser from 'phaser';
import Player from '../entities/Player';
import NPC from '../entities/NPC';
import Collectible from '../entities/Collectible';
import DialogueManager from '../managers/DialogueManager';
import ProgressTracker from '../managers/ProgressTracker';
import AudioManager from '../managers/AudioManager';

class Phase2College extends Phaser.Scene {
  constructor() {
    super({ key: 'Phase2College' });
  }

  create() {
    const { width, height } = this.cameras.main;

    this.dialogueManager = new DialogueManager(this);
    this.progressTracker = new ProgressTracker(this);
    this.progressTracker.changePhase(2);
    this.audioManager = new AudioManager(this);

    this.createBackground();
    this.createLevel();
    this.player = new Player(this, 100, height - 100, 2);
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
    graphics.fillGradientStyle(0x10b981, 0x10b981, 0xfbbf24, 0xfbbf24, 1);
    graphics.fillRect(0, 0, width * 2, height);

    // MIT Manipal sign
    const sign = this.add.text(200, 100, 'MIT Manipal\n2015-2019', {
      fontSize: '24px',
      fill: '#ffffff',
      fontFamily: 'monospace',
      align: 'center',
      fontStyle: 'bold'
    });
    sign.setOrigin(0.5);
  }

  createLevel() {
    const { width, height } = this.cameras.main;
    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < width * 2; i += 16) {
      const ground = this.add.rectangle(i + 8, height - 8, 16, 16, 0x10b981);
      this.platforms.add(ground);
    }

    const platformData = [
      { x: 250, y: height - 120, w: 100, h: 16 },
      { x: 450, y: height - 200, w: 140, h: 16 },
      { x: 700, y: height - 180, w: 120, h: 16 },
      { x: 950, y: height - 240, w: 160, h: 16 },
      { x: 1200, y: height - 160, w: 130, h: 16 },
      { x: 1450, y: height - 220, w: 150, h: 16 }
    ];

    platformData.forEach(p => {
      const platform = this.add.rectangle(p.x, p.y, p.w, p.h, 0x22c55e);
      this.platforms.add(platform);
    });
  }

  createCollectibles() {
    const { height } = this.cameras.main;
    this.collectibles = this.physics.add.group();

    const collectiblesData = [
      { x: 250, y: height - 170, key: 'collectible-trophy', name: 'B.Tech Degree', description: '9.64 GPA from MIT Manipal' },
      { x: 450, y: height - 250, key: 'collectible-badge', name: 'Microsoft Intern', description: 'Summer 2018 internship' },
      { x: 600, y: height - 150, key: 'collectible-badge', name: 'Conscia Intern', description: 'Summer 2017 frontend development' },
      { x: 800, y: height - 230, key: 'collectible-trophy', name: 'OpenShiksha', description: 'Social impact project for students' },
      { x: 950, y: height - 290, key: 'collectible-certificate', name: 'Neural Networks', description: 'Deep learning coursework' },
      { x: 1100, y: height - 120, key: 'collectible-certificate', name: 'Computer Vision', description: 'CV and ML studies' },
      { x: 1250, y: height - 210, key: 'collectible-badge', name: 'React.js', description: 'Frontend development mastery' },
      { x: 1400, y: height - 270, key: 'collectible-badge', name: 'Python', description: 'Programming expertise' },
      { x: 1500, y: height - 120, key: 'collectible-trophy', name: 'Gaming Controller', description: 'LoL and PC gaming hobby' },
      { x: 1550, y: height - 180, key: 'collectible-certificate', name: 'Coffee Cup', description: 'All-nighters and dedication' }
    ];

    collectiblesData.forEach(data => {
      const collectible = new Collectible(this, data.x, data.y, data.key, {
        name: data.name,
        description: data.description,
        phase: 2
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
        x: 450,
        y: height - 232,
        key: 'npc-mentor',
        dialogue: {
          speaker: 'Microsoft Mentor',
          lines: [
            'Great work this summer on the ML project!',
            'Your object detection model is impressive.',
            'Keep pushing boundaries in AI.'
          ]
        }
      },
      {
        x: 800,
        y: height - 212,
        key: 'npc-colleague',
        dialogue: {
          speaker: 'OpenShiksha Beneficiary',
          lines: [
            'Thank you for building this platform!',
            'You\'re helping so many students learn.',
            'This really makes a difference.'
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

    this.exitZone = this.add.rectangle(width * 2 - 100, height - 100, 80, 150, 0x3b82f6, 0.5);
    this.physics.add.existing(this.exitZone);
    this.exitZone.body.setAllowGravity(false);

    const exitSign = this.add.text(width * 2 - 100, height - 200, 'To Work →', {
      fontSize: '16px',
      fill: '#3b82f6',
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
      this.scene.start('Phase3Work');
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

export default Phase2College;

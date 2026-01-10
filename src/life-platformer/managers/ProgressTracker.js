class ProgressTracker {
  constructor(scene) {
    this.scene = scene;
    this.currentPhase = 1;
    this.collectibles = {
      phase1: [],
      phase2: [],
      phase3: [],
      phase4: []
    };
    this.totalCollectibles = {
      phase1: 8,
      phase2: 10,
      phase3: 12,
      phase4: 10
    };

    this.createUI();
    this.loadProgress();
  }

  createUI() {
    const { width } = this.scene.cameras.main;

    // HUD Container
    this.hudContainer = this.scene.add.container(0, 0);
    this.hudContainer.setScrollFactor(0);
    this.hudContainer.setDepth(999);

    // Phase indicator background
    this.phaseIndicatorBg = this.scene.add.rectangle(
      width / 2,
      30,
      200,
      30,
      0x000000,
      0.7
    );
    this.phaseIndicatorBg.setStrokeStyle(2, 0x3b82f6);

    // Phase text
    this.phaseText = this.scene.add.text(
      width / 2,
      30,
      this.getPhaseText(),
      {
        fontSize: '14px',
        fill: '#ffffff',
        fontFamily: 'monospace',
        fontStyle: 'bold'
      }
    );
    this.phaseText.setOrigin(0.5);

    // Collectibles counter
    this.collectiblesText = this.scene.add.text(
      20,
      20,
      this.getCollectiblesText(),
      {
        fontSize: '14px',
        fill: '#ffffff',
        fontFamily: 'monospace',
        backgroundColor: '#000000',
        padding: { x: 8, y: 4 }
      }
    );

    this.hudContainer.add([
      this.phaseIndicatorBg,
      this.phaseText,
      this.collectiblesText
    ]);
  }

  getPhaseText() {
    const phases = {
      1: 'School Days (2003-2015)',
      2: 'Undergrad (2015-2019)',
      3: 'Working Professional (2019-2022)',
      4: 'USA & Future (2022-Present)'
    };
    return phases[this.currentPhase] || 'Unknown Phase';
  }

  getCollectiblesText() {
    const phaseKey = `phase${this.currentPhase}`;
    const collected = this.collectibles[phaseKey].length;
    const total = this.totalCollectibles[phaseKey];
    return `Achievements: ${collected}/${total}`;
  }

  addCollectible(collectibleData) {
    const phaseKey = `phase${this.currentPhase}`;

    // Check if already collected
    const alreadyCollected = this.collectibles[phaseKey].some(
      item => item.name === collectibleData.name
    );

    if (!alreadyCollected) {
      this.collectibles[phaseKey].push(collectibleData);
      this.updateUI();
      this.saveProgress();
      this.showCollectibleNotification(collectibleData);
    }
  }

  showCollectibleNotification(collectibleData) {
    const { width } = this.scene.cameras.main;

    // Notification panel
    const notification = this.scene.add.container(width / 2, -100);
    notification.setScrollFactor(0);
    notification.setDepth(1002);

    const bg = this.scene.add.rectangle(0, 0, 300, 80, 0x000000, 0.9);
    bg.setStrokeStyle(3, 0xffd700);

    const title = this.scene.add.text(0, -20, 'Achievement Unlocked!', {
      fontSize: '14px',
      fill: '#ffd700',
      fontFamily: 'monospace',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    const name = this.scene.add.text(0, 5, collectibleData.name, {
      fontSize: '12px',
      fill: '#ffffff',
      fontFamily: 'monospace'
    });
    name.setOrigin(0.5);

    notification.add([bg, title, name]);

    // Animate in
    this.scene.tweens.add({
      targets: notification,
      y: 100,
      duration: 500,
      ease: 'Back.easeOut',
      onComplete: () => {
        // Hold for 2 seconds
        this.scene.time.delayedCall(2000, () => {
          // Animate out
          this.scene.tweens.add({
            targets: notification,
            y: -100,
            alpha: 0,
            duration: 500,
            ease: 'Back.easeIn',
            onComplete: () => {
              notification.destroy();
            }
          });
        });
      }
    });

    // Play achievement sound
    if (this.scene.sound.get('achievement')) {
      this.scene.sound.play('achievement');
    }
  }

  updateUI() {
    this.phaseText.setText(this.getPhaseText());
    this.collectiblesText.setText(this.getCollectiblesText());
  }

  changePhase(newPhase) {
    this.currentPhase = newPhase;
    this.updateUI();

    // Show phase transition
    this.showPhaseTransition();
  }

  showPhaseTransition() {
    const { width, height } = this.scene.cameras.main;

    // Full screen overlay
    const overlay = this.scene.add.rectangle(
      width / 2,
      height / 2,
      width,
      height,
      0x000000,
      0
    );
    overlay.setScrollFactor(0);
    overlay.setDepth(2000);

    // Phase title
    const phaseTitle = this.scene.add.text(
      width / 2,
      height / 2,
      this.getPhaseText(),
      {
        fontSize: '32px',
        fill: '#3b82f6',
        fontFamily: 'monospace',
        fontStyle: 'bold'
      }
    );
    phaseTitle.setOrigin(0.5);
    phaseTitle.setScrollFactor(0);
    phaseTitle.setDepth(2001);
    phaseTitle.setAlpha(0);

    // Fade in
    this.scene.tweens.add({
      targets: overlay,
      alpha: 1,
      duration: 500,
      ease: 'Power2'
    });

    this.scene.tweens.add({
      targets: phaseTitle,
      alpha: 1,
      duration: 1000,
      delay: 500,
      ease: 'Power2',
      onComplete: () => {
        // Hold
        this.scene.time.delayedCall(1500, () => {
          // Fade out
          this.scene.tweens.add({
            targets: [overlay, phaseTitle],
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
              overlay.destroy();
              phaseTitle.destroy();
            }
          });
        });
      }
    });
  }

  getProgress() {
    return {
      currentPhase: this.currentPhase,
      collectibles: this.collectibles
    };
  }

  saveProgress() {
    try {
      const progress = this.getProgress();
      localStorage.setItem('life-platformer-progress', JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('life-platformer-progress');
      if (saved) {
        const progress = JSON.parse(saved);
        this.currentPhase = progress.currentPhase || 1;
        this.collectibles = progress.collectibles || this.collectibles;
        this.updateUI();
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  }

  resetProgress() {
    this.currentPhase = 1;
    this.collectibles = {
      phase1: [],
      phase2: [],
      phase3: [],
      phase4: []
    };
    localStorage.removeItem('life-platformer-progress');
    this.updateUI();
  }

  destroy() {
    if (this.hudContainer) {
      this.hudContainer.destroy();
    }
  }
}

export default ProgressTracker;

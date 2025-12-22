import Phaser from 'phaser';

export default class SchoolScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SchoolScene' });
    this.player = null;
    this.cursors = null;
    this.platforms = null;
    this.collectibles = null;
    this.collectedCount = 0;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background gradient
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a365d);

    // Add some background decoration (clouds/shapes)
    this.createBackground();

    // Create platforms
    this.platforms = this.physics.add.staticGroup();

    // Ground
    for (let x = 0; x < width + 32; x += 32) {
      this.platforms.create(x, height - 16, 'platform-tile');
    }

    // Floating platforms
    this.createPlatform(200, 400, 4);
    this.createPlatform(500, 320, 3);
    this.createPlatform(750, 400, 4);
    this.createPlatform(350, 220, 5);
    this.createPlatform(650, 150, 3);

    // Create player
    this.player = this.physics.add.sprite(100, height - 100, 'player-placeholder');
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.player.setSize(16, 24);
    this.player.setOffset(8, 8);

    // Player-platform collision
    this.physics.add.collider(this.player, this.platforms);

    // Create collectibles (story items)
    this.collectibles = this.physics.add.group();
    this.createCollectibles();

    // Collectible overlap
    this.physics.add.overlap(
      this.player,
      this.collectibles,
      this.handleCollect,
      null,
      this
    );

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // UI
    this.createUI();

    // Level title
    const levelTitle = this.add.text(width / 2, 50, 'SCHOOL YEARS', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '24px',
      color: '#22c55e',
      stroke: '#166534',
      strokeThickness: 2
    }).setOrigin(0.5);

    this.add.text(width / 2, 80, '2003 - 2015 | DPS Pune', {
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: '14px',
      color: '#94a3b8'
    }).setOrigin(0.5);

    // Fade in
    this.cameras.main.fadeIn(500);

    // Emit level change event
    this.game.events.emit('levelChange', { level: 'school' });
  }

  createBackground() {
    // Simple decorative elements
    const colors = [0x2563eb, 0x3b82f6, 0x60a5fa];

    for (let i = 0; i < 8; i++) {
      const x = Phaser.Math.Between(50, 910);
      const y = Phaser.Math.Between(80, 300);
      const size = Phaser.Math.Between(20, 50);
      const color = Phaser.Math.RND.pick(colors);

      this.add.circle(x, y, size, color, 0.1);
    }
  }

  createPlatform(x, y, tiles) {
    for (let i = 0; i < tiles; i++) {
      this.platforms.create(x + (i * 32), y, 'platform-tile');
    }
  }

  createCollectibles() {
    const storyItems = [
      { x: 220, y: 350, id: 'basketball', icon: 'icon-basketball', color: 0xf97316 },
      { x: 520, y: 270, id: 'trophy', icon: 'icon-trophy', color: 0xfbbf24 },
      { x: 770, y: 350, id: 'computer', icon: 'icon-computer', color: 0x3b82f6 },
      { x: 390, y: 170, id: 'codebook', icon: 'icon-codebook', color: 0x8b5cf6 },
      { x: 680, y: 100, id: 'scholar', icon: 'icon-scholar', color: 0x22c55e }
    ];

    storyItems.forEach(item => {
      // Create glow ring behind the icon
      const glow = this.add.circle(item.x, item.y, 18, item.color, 0.3);
      this.tweens.add({
        targets: glow,
        scale: 1.3,
        alpha: 0.1,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });

      // Create the collectible with unique icon
      const collectible = this.collectibles.create(item.x, item.y, item.icon);
      collectible.setData('storyId', item.id);
      collectible.setData('glowRing', glow);
      collectible.setData('color', item.color);

      // Floating animation
      this.tweens.add({
        targets: [collectible, glow],
        y: item.y - 8,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  createUI() {
    // Collectibles counter
    this.collectText = this.add.text(20, 20, 'Stories: 0/5', {
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: '16px',
      color: '#fbbf24',
      backgroundColor: '#0f172a',
      padding: { x: 10, y: 5 }
    });

    // Instructions (fades out)
    const instructions = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 60,
      'Collect the icons to discover story moments!', {
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: '14px',
        color: '#94a3b8'
      }).setOrigin(0.5);

    this.tweens.add({
      targets: instructions,
      alpha: 0,
      delay: 4000,
      duration: 1000
    });
  }

  handleCollect(player, collectible) {
    // Prevent multiple triggers - check if already collected
    if (collectible.getData('collected')) return;
    collectible.setData('collected', true);

    const storyId = collectible.getData('storyId');
    const color = collectible.getData('color') || 0xfbbf24;
    const glowRing = collectible.getData('glowRing');

    // Immediately disable physics body to prevent re-triggers
    collectible.body.enable = false;

    // Visual feedback - burst effect with item's color
    this.createCollectEffect(collectible.x, collectible.y, color);

    // Remove collectible and its glow ring
    if (glowRing) glowRing.destroy();
    collectible.destroy();

    this.collectedCount++;
    this.collectText.setText(`Stories: ${this.collectedCount}/5`);

    // Show in-game toast notification (non-blocking)
    const storyContent = this.getStoryContent(storyId);
    storyContent.color = color;
    this.showStoryToast(storyContent);
  }

  createCollectEffect(x, y, color = 0xfbbf24) {
    // Burst particles with the item's color
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const particle = this.add.circle(x, y, 5, color, 1);

      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * 50,
        y: y + Math.sin(angle) * 50,
        alpha: 0,
        scale: 0,
        duration: 500,
        ease: 'Power2',
        onComplete: () => particle.destroy()
      });
    }

    // Flash effect
    const flash = this.add.circle(x, y, 24, 0xffffff, 0.9);
    this.tweens.add({
      targets: flash,
      scale: 2.5,
      alpha: 0,
      duration: 350,
      onComplete: () => flash.destroy()
    });

    // Secondary ring
    const ring = this.add.circle(x, y, 16, color, 0.6);
    this.tweens.add({
      targets: ring,
      scale: 3,
      alpha: 0,
      duration: 500,
      onComplete: () => ring.destroy()
    });
  }

  showStoryToast(content) {
    const width = this.cameras.main.width;
    const borderColor = content.color || 0xfbbf24;

    // Create toast at bottom of screen (less intrusive)
    const toastY = this.cameras.main.height - 80;
    const toastWidth = 420;
    const toastHeight = content.skills ? 85 : 70;

    // Background with colored left border accent
    const bg = this.add.rectangle(width / 2, toastY, toastWidth, toastHeight, 0x0f172a, 0.95);
    bg.setStrokeStyle(2, borderColor);

    // Colored accent bar on left
    const accent = this.add.rectangle(width / 2 - toastWidth / 2 + 4, toastY, 4, toastHeight - 8, borderColor);

    // Year badge (top right)
    const yearBadge = this.add.text(width / 2 + toastWidth / 2 - 12, toastY - toastHeight / 2 + 12, content.year, {
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: '10px',
      color: '#94a3b8'
    }).setOrigin(1, 0);

    // Title
    const title = this.add.text(width / 2 - toastWidth / 2 + 20, toastY - 18, content.title, {
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: '15px',
      color: '#ffffff',
      fontStyle: 'bold'
    });

    // Text (shorter, cleaner)
    const displayText = content.text.length > 80 ? content.text.substring(0, 80) + '...' : content.text;
    const text = this.add.text(width / 2 - toastWidth / 2 + 20, toastY + 2, displayText, {
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: '11px',
      color: '#94a3b8',
      wordWrap: { width: toastWidth - 40 }
    });

    // Skills badges if present (inline after text)
    let skillBadges = [];
    if (content.skills) {
      let skillX = width / 2 - toastWidth / 2 + 20;
      content.skills.forEach((skill) => {
        const badge = this.add.text(skillX, toastY + 28, skill, {
          fontFamily: 'Inter, Arial, sans-serif',
          fontSize: '9px',
          color: '#e2e8f0',
          backgroundColor: '#374151',
          padding: { x: 6, y: 2 }
        });
        skillBadges.push(badge);
        skillX += badge.width + 8;
      });
    }

    const allElements = [bg, accent, yearBadge, title, text, ...skillBadges];

    // Start invisible and slide up
    allElements.forEach(el => {
      el.setAlpha(0);
      el.y += 20;
    });

    // Animate in
    this.tweens.add({
      targets: allElements,
      alpha: 1,
      y: '-=20',
      duration: 250,
      ease: 'Power2'
    });

    // Auto-dismiss after 2.5 seconds
    this.time.delayedCall(2500, () => {
      this.tweens.add({
        targets: allElements,
        alpha: 0,
        y: '+=15',
        duration: 200,
        ease: 'Power2',
        onComplete: () => {
          allElements.forEach(el => el.destroy());
        }
      });
    });
  }

  getStoryContent(storyId) {
    const stories = {
      basketball: {
        title: 'Basketball Captain',
        text: 'Captained the varsity basketball team and played football too! Sports taught me teamwork, leadership, and how to handle pressure.',
        year: '2012-2015'
      },
      trophy: {
        title: 'Student Council President',
        text: 'Served as head of the student council body, governing over 2500 students. This experience shaped my leadership skills and taught me the importance of representing others.',
        year: '2014-2015'
      },
      computer: {
        title: 'Informatics Olympiad',
        text: 'Qualified for the Indian National Informatics Olympiad! This was my first serious dive into competitive programming and algorithms.',
        year: '2012-2013',
        skills: ['C++', 'Algorithms', 'Problem Solving']
      },
      codebook: {
        title: 'Google Code-in',
        text: 'Participated in Google Code-in 2013 - my first exposure to open source development and contributing to real-world projects.',
        year: '2013',
        skills: ['Open Source', 'Git', 'Collaboration']
      },
      scholar: {
        title: 'Scholar Honours',
        text: 'Received multiple Scholar Honours awards for academic excellence throughout school. Building the foundation for my future in tech!',
        year: '2003-2015'
      }
    };

    return stories[storyId] || {
      title: 'Memory',
      text: 'A moment from the past...',
      year: 'School Days'
    };
  }

  update() {
    if (!this.player) return;

    // Check if game is paused by React
    if (this.game.reactBridge && this.game.reactBridge.isPaused) {
      this.player.setVelocityX(0);
      return;
    }

    const speed = 200;
    const jumpForce = -500;

    // Horizontal movement
    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    // Jumping
    const onGround = this.player.body.blocked.down;
    if ((this.cursors.up.isDown || this.wasd.up.isDown || this.spaceBar.isDown) && onGround) {
      this.player.setVelocityY(jumpForce);
    }

    // Check for level completion
    if (this.collectedCount >= 5) {
      this.completeLevel();
    }
  }

  completeLevel() {
    // Prevent multiple triggers
    if (this.levelComplete) return;
    this.levelComplete = true;

    // Show completion message
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x0f172a, 0.8);
    overlay.setAlpha(0);

    const completeText = this.add.text(width / 2, height / 2 - 30, 'SCHOOL COMPLETE!', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '28px',
      color: '#22c55e'
    }).setOrigin(0.5).setAlpha(0);

    const nextText = this.add.text(width / 2, height / 2 + 30, 'Next: University Years', {
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: '18px',
      color: '#94a3b8'
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: [overlay, completeText, nextText],
      alpha: 1,
      duration: 500
    });

    // Emit completion event
    this.game.events.emit('levelComplete', {
      completedLevel: 'school',
      nextLevel: 'university'
    });

    // For now, restart the level after a delay (later will go to UniversityScene)
    this.time.delayedCall(3000, () => {
      this.cameras.main.fadeOut(500);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.collectedCount = 0;
        this.levelComplete = false;
        this.scene.restart();
      });
    });
  }
}

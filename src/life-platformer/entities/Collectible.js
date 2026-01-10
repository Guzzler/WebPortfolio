import Phaser from 'phaser';

class Collectible extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, data) {
    super(scene, x, y, spriteKey);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
    this.collectibleData = data; // { name, description, phase }
    this.isCollected = false;

    // Collectible physics
    this.body.allowGravity = false;
    this.setSize(16, 16);

    // Floating animation
    this.createFloatAnimation();
  }

  createFloatAnimation() {
    // Create a gentle bobbing motion
    this.scene.tweens.add({
      targets: this,
      y: this.y - 8,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    // Rotation for visual interest
    this.scene.tweens.add({
      targets: this,
      angle: 360,
      duration: 3000,
      ease: 'Linear',
      repeat: -1
    });

    // Glow effect using alpha
    this.scene.tweens.add({
      targets: this,
      alpha: 0.7,
      duration: 800,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });
  }

  collect(progressTracker) {
    if (this.isCollected) return;

    this.isCollected = true;

    // Play collection effect
    this.playCollectEffect();

    // Add to progress tracker
    if (progressTracker) {
      progressTracker.addCollectible(this.collectibleData);
    }

    // Play sound (if available)
    if (this.scene.sound.get('collect')) {
      this.scene.sound.play('collect');
    }

    // Remove after animation
    this.scene.time.delayedCall(300, () => {
      this.destroy();
    });
  }

  playCollectEffect() {
    // Stop existing tweens
    this.scene.tweens.killTweensOf(this);

    // Scale up and fade out
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.5,
      scaleY: 1.5,
      alpha: 0,
      duration: 300,
      ease: 'Power2'
    });

    // Create particle effect
    const particles = this.scene.add.particles(this.x, this.y, 'particle', {
      speed: { min: -100, max: 100 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD',
      lifespan: 500,
      gravityY: -200,
      quantity: 10
    });

    this.scene.time.delayedCall(500, () => {
      particles.destroy();
    });
  }
}

export default Collectible;

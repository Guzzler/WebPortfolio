import Phaser from 'phaser';

class NPC extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, dialogue) {
    super(scene, x, y, spriteKey);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
    this.dialogue = dialogue;
    this.hasInteracted = false;

    // NPC physics
    this.setImmovable(true);
    this.body.allowGravity = false;
    this.setSize(24, 32);

    // Add interaction indicator (E key prompt)
    this.indicator = scene.add.text(x, y - 40, '[E]', {
      fontSize: '12px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 4, y: 2 }
    });
    this.indicator.setOrigin(0.5);
    this.indicator.setVisible(false);

    // Idle animation if available
    this.createIdleAnimation();
  }

  createIdleAnimation() {
    const animKey = `${this.texture.key}-idle`;
    if (!this.scene.anims.exists(animKey)) {
      this.scene.anims.create({
        key: animKey,
        frames: this.scene.anims.generateFrameNumbers(this.texture.key, {
          start: 0,
          end: 1
        }),
        frameRate: 2,
        repeat: -1
      });
    }
    this.play(animKey, true);
  }

  showIndicator() {
    this.indicator.setVisible(true);
  }

  hideIndicator() {
    this.indicator.setVisible(false);
  }

  interact(dialogueManager) {
    if (!this.hasInteracted) {
      dialogueManager.showDialogue(this.dialogue);
      this.hasInteracted = true;
    }
  }

  update() {
    // Update indicator position
    this.indicator.setPosition(this.x, this.y - 40);
  }

  destroy() {
    if (this.indicator) {
      this.indicator.destroy();
    }
    super.destroy();
  }
}

export default NPC;

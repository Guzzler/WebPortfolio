import Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, phase = 1) {
    const spriteKey = `player-phase${phase}`;
    super(scene, x, y, spriteKey);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
    this.phase = phase;
    this.speed = 200;
    this.jumpVelocity = -400;
    this.isInteracting = false;

    // Player physics
    this.setCollideWorldBounds(true);
    this.setBounce(0.1);
    this.setSize(24, 32);
    this.setOffset(4, 0);

    // Input setup
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.interactKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.wasd = {
      up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };

    this.createAnimations();
  }

  createAnimations() {
    const frameRate = 8;

    // Idle animation
    if (!this.scene.anims.exists(`player-phase${this.phase}-idle`)) {
      this.scene.anims.create({
        key: `player-phase${this.phase}-idle`,
        frames: this.scene.anims.generateFrameNumbers(`player-phase${this.phase}`, {
          start: 0,
          end: 1
        }),
        frameRate: 4,
        repeat: -1
      });
    }

    // Walk animation
    if (!this.scene.anims.exists(`player-phase${this.phase}-walk`)) {
      this.scene.anims.create({
        key: `player-phase${this.phase}-walk`,
        frames: this.scene.anims.generateFrameNumbers(`player-phase${this.phase}`, {
          start: 2,
          end: 5
        }),
        frameRate: frameRate,
        repeat: -1
      });
    }

    // Jump animation
    if (!this.scene.anims.exists(`player-phase${this.phase}-jump`)) {
      this.scene.anims.create({
        key: `player-phase${this.phase}-jump`,
        frames: [{ key: `player-phase${this.phase}`, frame: 6 }],
        frameRate: 1
      });
    }

    this.play(`player-phase${this.phase}-idle`);
  }

  update() {
    if (this.isInteracting) {
      this.setVelocityX(0);
      return;
    }

    const onGround = this.body.touching.down;

    // Horizontal movement
    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      this.setVelocityX(-this.speed);
      this.setFlipX(true);
      if (onGround && !this.anims.isPlaying) {
        this.play(`player-phase${this.phase}-walk`, true);
      }
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      this.setVelocityX(this.speed);
      this.setFlipX(false);
      if (onGround && !this.anims.isPlaying) {
        this.play(`player-phase${this.phase}-walk`, true);
      }
    } else {
      this.setVelocityX(0);
      if (onGround) {
        this.play(`player-phase${this.phase}-idle`, true);
      }
    }

    // Jump
    if ((this.cursors.up.isDown || this.wasd.up.isDown || this.cursors.space.isDown) && onGround) {
      this.setVelocityY(this.jumpVelocity);
    }

    // Jump animation
    if (!onGround) {
      this.play(`player-phase${this.phase}-jump`, true);
    }
  }

  setInteracting(value) {
    this.isInteracting = value;
    if (value) {
      this.setVelocityX(0);
      this.play(`player-phase${this.phase}-idle`, true);
    }
  }

  changePhase(newPhase) {
    this.phase = newPhase;
    this.setTexture(`player-phase${newPhase}`);
    this.createAnimations();
    this.play(`player-phase${newPhase}-idle`);
  }
}

export default Player;

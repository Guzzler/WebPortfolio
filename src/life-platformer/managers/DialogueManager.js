class DialogueManager {
  constructor(scene) {
    this.scene = scene;
    this.isActive = false;
    this.currentDialogue = null;
    this.currentIndex = 0;

    this.createUI();
  }

  createUI() {
    const { width, height } = this.scene.cameras.main;

    // Dialogue box background
    this.dialogueBox = this.scene.add.rectangle(
      width / 2,
      height - 100,
      width - 40,
      120,
      0x000000,
      0.85
    );
    this.dialogueBox.setStrokeStyle(3, 0x3b82f6);
    this.dialogueBox.setScrollFactor(0);
    this.dialogueBox.setDepth(1000);
    this.dialogueBox.setVisible(false);

    // Speaker name
    this.speakerText = this.scene.add.text(
      30,
      height - 150,
      '',
      {
        fontSize: '16px',
        fill: '#60a5fa',
        fontStyle: 'bold',
        fontFamily: 'monospace'
      }
    );
    this.speakerText.setScrollFactor(0);
    this.speakerText.setDepth(1001);
    this.speakerText.setVisible(false);

    // Dialogue text
    this.dialogueText = this.scene.add.text(
      30,
      height - 130,
      '',
      {
        fontSize: '14px',
        fill: '#ffffff',
        fontFamily: 'monospace',
        wordWrap: { width: width - 80 }
      }
    );
    this.dialogueText.setScrollFactor(0);
    this.dialogueText.setDepth(1001);
    this.dialogueText.setVisible(false);

    // Continue indicator
    this.continueIndicator = this.scene.add.text(
      width - 60,
      height - 50,
      '[E]',
      {
        fontSize: '12px',
        fill: '#60a5fa',
        fontFamily: 'monospace'
      }
    );
    this.continueIndicator.setScrollFactor(0);
    this.continueIndicator.setDepth(1001);
    this.continueIndicator.setVisible(false);

    // Blinking animation for continue indicator
    this.scene.tweens.add({
      targets: this.continueIndicator,
      alpha: 0.3,
      duration: 500,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    // Input for advancing dialogue
    this.scene.input.keyboard.on('keydown-E', () => {
      if (this.isActive) {
        this.advance();
      }
    });

    this.scene.input.keyboard.on('keydown-ENTER', () => {
      if (this.isActive) {
        this.advance();
      }
    });
  }

  showDialogue(dialogue) {
    this.currentDialogue = dialogue;
    this.currentIndex = 0;
    this.isActive = true;

    this.dialogueBox.setVisible(true);
    this.speakerText.setVisible(true);
    this.dialogueText.setVisible(true);
    this.continueIndicator.setVisible(true);

    this.displayCurrentLine();

    // Notify scene that dialogue is active
    if (this.scene.player) {
      this.scene.player.setInteracting(true);
    }
  }

  displayCurrentLine() {
    if (!this.currentDialogue || this.currentIndex >= this.currentDialogue.lines.length) {
      this.close();
      return;
    }

    const line = this.currentDialogue.lines[this.currentIndex];
    this.speakerText.setText(this.currentDialogue.speaker || 'Unknown');
    this.dialogueText.setText('');

    // Typewriter effect
    this.typewriterEffect(line);
  }

  typewriterEffect(text) {
    let charIndex = 0;
    const typeSpeed = 30;

    const typeTimer = this.scene.time.addEvent({
      delay: typeSpeed,
      callback: () => {
        if (charIndex < text.length) {
          this.dialogueText.setText(text.substring(0, charIndex + 1));
          charIndex++;

          // Typing sound effect
          if (this.scene.sound.get('text-beep') && charIndex % 2 === 0) {
            this.scene.sound.play('text-beep', { volume: 0.1 });
          }
        } else {
          typeTimer.destroy();
        }
      },
      loop: true
    });
  }

  advance() {
    this.currentIndex++;
    this.displayCurrentLine();
  }

  close() {
    this.isActive = false;
    this.currentDialogue = null;
    this.currentIndex = 0;

    this.dialogueBox.setVisible(false);
    this.speakerText.setVisible(false);
    this.dialogueText.setVisible(false);
    this.continueIndicator.setVisible(false);

    // Notify scene that dialogue is closed
    if (this.scene.player) {
      this.scene.player.setInteracting(false);
    }
  }

  destroy() {
    if (this.dialogueBox) this.dialogueBox.destroy();
    if (this.speakerText) this.speakerText.destroy();
    if (this.dialogueText) this.dialogueText.destroy();
    if (this.continueIndicator) this.continueIndicator.destroy();
  }
}

export default DialogueManager;

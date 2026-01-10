class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.currentMusic = null;
    this.musicVolume = 0.6;
    this.sfxVolume = 0.8;
  }

  playMusic(key, loop = true) {
    // Stop current music
    if (this.currentMusic) {
      this.currentMusic.stop();
    }

    // Play new music
    if (this.scene.sound.get(key)) {
      this.currentMusic = this.scene.sound.play(key, {
        loop: loop,
        volume: this.musicVolume
      });
    }
  }

  stopMusic() {
    if (this.currentMusic) {
      this.currentMusic.stop();
      this.currentMusic = null;
    }
  }

  playSFX(key, config = {}) {
    const defaultConfig = {
      volume: this.sfxVolume,
      ...config
    };

    if (this.scene.sound.get(key)) {
      this.scene.sound.play(key, defaultConfig);
    }
  }

  setMusicVolume(volume) {
    this.musicVolume = volume;
    if (this.currentMusic) {
      this.currentMusic.setVolume(volume);
    }
  }

  setSFXVolume(volume) {
    this.sfxVolume = volume;
  }

  fadeOutMusic(duration = 1000) {
    if (this.currentMusic) {
      this.scene.tweens.add({
        targets: this.currentMusic,
        volume: 0,
        duration: duration,
        onComplete: () => {
          this.stopMusic();
        }
      });
    }
  }

  fadeInMusic(key, duration = 1000) {
    this.playMusic(key);
    if (this.currentMusic) {
      this.currentMusic.setVolume(0);
      this.scene.tweens.add({
        targets: this.currentMusic,
        volume: this.musicVolume,
        duration: duration
      });
    }
  }
}

export default AudioManager;

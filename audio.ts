// Simple Audio Synthesizer for Tactical SFX
class SoundFX {
  ctx: AudioContext | null = null;
  bgm: HTMLAudioElement | null = null;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Initialize BGM
      this.bgm = new Audio('https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race1.ogg'); // Action style BGM
      this.bgm.loop = true;
      this.bgm.volume = 0.3;
    }
  }

  playBGM() {
    if (this.bgm) {
        this.bgm.play().catch(e => console.log("Audio interaction required first"));
    }
  }

  stopBGM() {
    if (this.bgm) {
        this.bgm.pause();
        this.bgm.currentTime = 0;
    }
  }

  // Helper to create oscillators
  playTone(freq: number, type: OscillatorType, duration: number, vol: number = 0.1) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playNoise(duration: number) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    
    noise.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  // --- PRESETS ---

  click() {
    this.playTone(1200, 'square', 0.05, 0.05);
  }

  shoot() {
    // Gunshot-like sound (noise burst + rapid decay)
    this.playNoise(0.15);
    this.playTone(150, 'sawtooth', 0.1, 0.2);
  }

  hit() {
    // High pitched confirmation
    this.playTone(800, 'sine', 0.1, 0.1);
    this.playTone(1200, 'sine', 0.1, 0.05);
  }

  error() {
    // Low buzzer
    this.playTone(150, 'sawtooth', 0.3, 0.2);
    this.playTone(100, 'sawtooth', 0.3, 0.2);
  }

  explosion() {
    this.playNoise(0.5);
    this.playTone(50, 'square', 0.5, 0.3);
  }
  
  win() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [440, 554, 659, 880].forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, 'triangle', 0.3, 0.2), i * 100);
    });
  }
}

export const sfx = new SoundFX();

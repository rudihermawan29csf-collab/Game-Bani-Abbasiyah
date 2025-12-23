
// Simple Audio Synthesizer for Tactical SFX
class SoundFX {
  ctx: AudioContext | null = null;
  bgm: HTMLAudioElement | null = null;

  init() {
    if (!this.ctx) {
      // Cross-browser support
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
          this.ctx = new AudioContextClass();
          
          // Initialize BGM
          this.bgm = new Audio('https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race1.ogg'); // Action style BGM
          this.bgm.loop = true;
          this.bgm.volume = 0.3;
      }
    }
    this.resume();
  }

  // Mobile browsers often suspend audio until user interaction
  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(e => console.warn("Audio resume failed", e));
    }
  }

  playBGM() {
    this.resume();
    if (this.bgm) {
        this.bgm.play().catch(e => console.log("Audio autoplay blocked, waiting for interaction"));
    }
  }

  stopBGM() {
    if (this.bgm) {
        this.bgm.pause();
        this.bgm.currentTime = 0;
    }
  }

  // Ensure context is running before playing
  private checkContext() {
      if (!this.ctx) {
          this.init();
      }
      this.resume();
  }

  // Helper to create oscillators
  playTone(freq: number, type: OscillatorType, duration: number, vol: number = 0.1) {
    this.checkContext();
    if (!this.ctx) return;
    
    try {
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
    } catch (e) {
        console.error("Audio error", e);
    }
  }

  playNoise(duration: number) {
    this.checkContext();
    if (!this.ctx) return;

    try {
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
    } catch (e) {
        console.error("Noise error", e);
    }
  }

  // --- PRESETS ---

  click() {
    // Techy short blip
    this.playTone(800, 'sine', 0.05, 0.05);
  }

  tick(isUrgent: boolean = false) {
    this.playTone(isUrgent ? 1500 : 800, 'sine', 0.05, isUrgent ? 0.08 : 0.03);
  }

  shoot() {
    // Laser/Sci-fi Gunshot: Noise burst + High freq drop
    this.checkContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // 1. Noise Burst (Impact)
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    noise.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start();

    // 2. Laser Pew (Frequency Sweep)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.2); // Pitch drop
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.2);
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
    this.checkContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [440, 554, 659, 880].forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, 'triangle', 0.3, 0.2), i * 100);
    });
  }

  // Oud Pluck Simulation (Arabic String Instrument)
  playOud() {
    this.checkContext();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    
    // Create two oscillators for a richer tone (simulating double strings of Oud)
    // Scale: Hicaz or typical harmonic minor interval simulation
    const freqs = [293.66, 294.5]; // D4 with slight detune for chorus effect
    
    freqs.forEach(freq => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        
        // Triangle/Saw mix usually, triangle is softer like nylon/gut strings
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        // Pluck envelope: Fast attack, long exponential decay
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.02); // Attack
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0); // Decay (Resonance)
        
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        
        osc.start(now);
        osc.stop(now + 1.0);
    });
  }
}

export const sfx = new SoundFX();

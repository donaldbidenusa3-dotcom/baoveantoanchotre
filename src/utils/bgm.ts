/**
 * Cheerful procedural Web Audio API background music loop
 * Creates an uplifting, friendly adventure melody without heavy external MP3s.
 */

class AdventureBGM {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private step: number = 0;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  public isMuted: boolean = false;

  // Cheerful pentatonic adventure scale progression in C Major
  private melodyNotes: number[] = [
    523.25, 587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33,
    523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 523.25, 392.00,
    440.00, 523.25, 659.25, 523.25, 587.33, 659.25, 783.99, 880.00,
    1046.5, 880.00, 783.99, 659.25, 587.33, 523.25, 659.25, 523.25
  ];

  // Gentle bass chords
  private bassNotes: number[] = [
    261.63, 261.63, 329.63, 329.63, 392.00, 392.00, 329.63, 329.63,
    220.00, 220.00, 261.63, 261.63, 349.23, 349.23, 392.00, 392.00
  ];

  private initAudio() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.06, this.ctx.currentTime); // Soft, gentle background volume
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public start() {
    if (this.isPlaying || this.isMuted) return;
    this.initAudio();
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;
    this.step = 0;
    this.tick();
  }

  private tick() {
    if (!this.isPlaying || this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const noteFreq = this.melodyNotes[this.step % this.melodyNotes.length];

      // Lead melodic chime
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.24);

      // Bass note on every 2nd step
      if (this.step % 2 === 0) {
        const bassFreq = this.bassNotes[Math.floor(this.step / 2) % this.bassNotes.length] / 2;
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(bassFreq, now);

        bassGain.gain.setValueAtTime(0.001, now);
        bassGain.gain.linearRampToValueAtTime(0.1, now + 0.03);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        bassOsc.connect(bassGain);
        bassGain.connect(this.masterGain);

        bassOsc.start(now);
        bassOsc.stop(now + 0.48);
      }

      this.step++;
      this.timer = window.setTimeout(() => this.tick(), 240); // 125 BPM
    } catch {
      // Audio fallback
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      this.isMuted = true;
      return false;
    } else {
      this.isMuted = false;
      this.start();
      return true;
    }
  }

  public isMusicPlaying(): boolean {
    return this.isPlaying && !this.isMuted;
  }
}

export const bgm = new AdventureBGM();

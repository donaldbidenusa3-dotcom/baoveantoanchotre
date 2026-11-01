/**
 * Web Speech API helper for reading Vietnamese questions and explanations aloud
 */

class VietnameseSpeech {
  private synth: SpeechSynthesis | null = null;
  public isEnabled: boolean = true;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoice();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoice();
      }
    }
  }

  private initVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prefer Vietnamese voices
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'));
    if (viVoice) {
      this.voice = viVoice;
    }
  }

  public speak(text: string, rate: number = 0.95, onEnd?: () => void) {
    if (!this.synth || !this.isEnabled) return;
    try {
      this.synth.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = rate; // Slightly slower, friendly pace for kids
      utterance.pitch = 1.05;
      if (this.voice) {
        utterance.voice = this.voice;
      }
      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      }
      this.synth.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Silent
      }
    }
  }

  public toggle(): boolean {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) {
      this.stop();
    }
    return this.isEnabled;
  }
}

export const speech = new VietnameseSpeech();

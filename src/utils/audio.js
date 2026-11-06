// ============================================================================
// BROWSER-NATIVE AUDIO SYNTHESIZER & MULTILINGUAL CLINICAL SPEECH ENGINE
// 100% Offline-Resilient: Zero external mp3/wav files that could 404 or stutter
// ============================================================================

import { MULTILINGUAL_GUIDES } from '../data/ahmedabadData';

let globalAudioCtx = null;

/**
 * Gets or initializes the Web Audio API AudioContext singleton.
 * Safely handles suspended context states.
 */
export function getAudioContext() {
  if (typeof window === 'undefined') return null;

  if (!globalAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      globalAudioCtx = new AudioCtx();
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(() => {});
  }
  return globalAudioCtx;
}

/**
 * Synthesizes Emergency 108 Dispatch Alert Siren Beep
 * Sawtooth waveform with exponential frequency sweep (880 Hz -> 1320 Hz)
 */
export function playSirenTone(muted = false) {
  if (muted || typeof window === 'undefined') return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  } catch {
    // Graceful silent fallback if autoplay is restricted by browser policy
  }
}

/**
 * Synthesizes 110 BPM Clinical CPR Metronome Click
 * Triangle waveform with snappy exponential decay (980 Hz -> 440 Hz in 60ms)
 */
export function playMetronomeClick(muted = false) {
  if (muted || typeof window === 'undefined') return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(980, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.06);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.075);
  } catch {
    // Graceful silent fallback
  }
}

/**
 * Synthesizes AED Defibrillation Shock Sound (Biphasic discharge buzz)
 */
export function playShockDischargeTone(muted = false) {
  if (muted || typeof window === 'undefined') return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(60, now + 0.35);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  } catch {
    // Graceful fallback
  }
}

/**
 * Speaks Multilingual Clinical CPR Guidance using Web Speech Synthesis API
 * Supports Gujarati ('gu'), Hindi ('hi'), English ('en')
 */
export function speakClinicalGuidance(langKey = 'gu', muted = false) {
  if (muted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const guide = MULTILINGUAL_GUIDES[langKey] || MULTILINGUAL_GUIDES.gu;
    const utterance = new SpeechSynthesisUtterance(guide.speechPrompt);
    utterance.lang = guide.voiceCode;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Fallback if browser voices are not initialized
  }
}

/**
 * Stops any active speech synthesis immediately
 */
export function cancelSpeechGuidance() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  }
}


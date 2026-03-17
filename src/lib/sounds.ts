// Synthesize a warm, magical chime sound using Web Audio API
export const playOpenSound = () => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const now = ctx.currentTime;

  // Reverb-like warmth via feedback delay
  const delay = ctx.createDelay(0.4);
  const delayGain = ctx.createGain();
  const masterGain = ctx.createGain();
  delay.delayTime.value = 0.22;
  delayGain.gain.value = 0.28; // subtle echo tail
  masterGain.gain.value = 0.85;
  delay.connect(delayGain);
  delayGain.connect(delay); // feedback loop
  delayGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  const playTone = (
    freq: number,
    start: number,
    dur: number,
    gain: number,
    type: OscillatorType = "sine"
  ) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now + start);
    g.gain.setValueAtTime(0, now + start);
    g.gain.linearRampToValueAtTime(gain, now + start + 0.04); // softer attack
    g.gain.exponentialRampToValueAtTime(0.001, now + start + dur + 0.3); // long warm tail
    osc.connect(g);
    g.connect(ctx.destination); // dry signal
    g.connect(delay); // wet signal → reverb tail
    osc.start(now + start);
    osc.stop(now + start + dur + 0.35);
  };

  // Warm sub-tone layer (slightly detuned for richness)
  const playWarm = (freq: number, start: number, dur: number) => {
    playTone(freq, start, dur, 0.09, "sine");
    playTone(freq * 1.004, start, dur, 0.04, "sine"); // slight detune = warmth
    playTone(freq / 2, start, dur, 0.03, "triangle"); // sub octave body
  };

  // Happy Birthday melody — D4-based, waltz feel (3/4)
  // Note: dotted quarter = 0.45s, quarter = 0.3s, half = 0.6s at ~67bpm
  const D4 = 293.66,
    D4s = 311.13;
  const E4 = 329.63;
  const F4 = 349.23,
    Fs4 = 369.99;
  const G4 = 392.0;
  const A4 = 440.0;
  const B4 = 493.88;
  const C5 = 523.25,
    Cs5 = 554.37;
  const D5 = 587.33;

  // "Hap-py Birth-day to you" × 2, "Hap-py Birth-day dear [name]", "Hap-py Birth-day to you"
  const melody: [number, number, number][] = [
    // bar 1: "Hap-py birth-"
    [D4, 0.0, 0.25],
    [D4, 0.28, 0.15],
    [E4, 0.46, 0.55],
    [D4, 1.06, 0.55],
    [G4, 1.65, 0.55],
    [Fs4, 2.24, 1.0],
    // bar 2: "Hap-py birth-"
    [D4, 3.4, 0.25],
    [D4, 3.68, 0.15],
    [E4, 3.86, 0.55],
    [D4, 4.46, 0.55],
    [A4, 5.05, 0.55],
    [G4, 5.64, 1.0],
    // bar 3: "Hap-py birth-day dear..."
    [D4, 6.8, 0.25],
    [D4, 7.08, 0.15],
    [D5, 7.26, 0.55],
    [B4, 7.86, 0.55],
    [G4, 8.45, 0.55],
    [Fs4, 9.04, 0.55],
    [E4, 9.63, 0.55],
    // bar 4: "Hap-py birth-day to you"
    [C5, 10.4, 0.25],
    [C5, 10.68, 0.15],
    [B4, 10.86, 0.55],
    [G4, 11.46, 0.55],
    [A4, 12.05, 0.55],
    [G4, 12.64, 1.2]
  ];

  melody.forEach(([freq, start, dur]) => {
    playWarm(freq, start, dur);
  });

  // Soft bass drone — tonic G pedal for warmth throughout
  const bassOsc = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bassOsc.type = "sine";
  bassOsc.frequency.value = 98.0; // G2 — deep, warm
  bassGain.gain.setValueAtTime(0, now);
  bassGain.gain.linearRampToValueAtTime(0.06, now + 0.5);
  bassGain.gain.linearRampToValueAtTime(0.06, now + 13.0);
  bassGain.gain.exponentialRampToValueAtTime(0.001, now + 14.5);
  bassOsc.connect(bassGain);
  bassGain.connect(ctx.destination);
  bassOsc.start(now);
  bassOsc.stop(now + 15);

  // Soft paper-noise sparkle (very gentle, just on the downbeats)
  [0, 3.4, 6.8, 10.4].forEach((t) => {
    const bufferSize = Math.floor(ctx.sampleRate * 0.25);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] =
        (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
    }
    const noise = ctx.createBufferSource();
    const nGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    noise.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.8;
    nGain.gain.setValueAtTime(0.025, now + t);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.25);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(now + t);
  });
};

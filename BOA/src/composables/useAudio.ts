export function useAudio(
  maxDistance: number,
  baseFrequency: number,
  multiplier: number
) {
  //TODO: v0.0.2 Make sound to be able to be start and stopped at specific time
  const audioContext = new window.AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  const playSound = (distance: number) => {
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    let frequency;
    if (distance > maxDistance) {
      frequency = 0;
    } else {
      frequency = (baseFrequency + (maxDistance - distance)) * multiplier;
    }

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    gainNode.gain.setValueAtTime(1, audioContext.currentTime);

    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };
  return {
    playSound,
  };
}

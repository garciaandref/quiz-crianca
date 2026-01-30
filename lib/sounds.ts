export function playVictorySound() {
  // 🔕 avisa a música pra parar
  window.dispatchEvent(new Event("victory-sound"));

  const audio = new Audio("/sounds/victory.mp3");
  audio.volume = 0.8;
  audio.play().catch(() => {});
}

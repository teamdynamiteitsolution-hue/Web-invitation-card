export interface ScratchProgressOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  sampleStep?: number; // Sample every Nth pixel for 60fps performance on mobile
}

export function calculateScratchProgress({
  canvas,
  ctx,
  sampleStep = 10,
}: ScratchProgressOptions): number {
  const { width, height } = canvas;
  if (width === 0 || height === 0) return 0;

  try {
    const imgData = ctx.getImageData(0, 0, width, height);
    const pixels = imgData.data;
    let transparentCount = 0;
    let totalSampled = 0;

    // Check alpha channel (every 4th byte is alpha: r, g, b, a)
    for (let y = 0; y < height; y += sampleStep) {
      for (let x = 0; x < width; x += sampleStep) {
        const index = (y * width + x) * 4 + 3;
        totalSampled++;
        if (pixels[index] < 128) {
          transparentCount++;
        }
      }
    }

    return totalSampled > 0 ? transparentCount / totalSampled : 0;
  } catch (err) {
    console.warn("Scratch coverage read error (CORS or canvas tainted):", err);
    return 0;
  }
}

export function triggerConfettiBurst(type: 'gold' | 'rose' | 'turmeric' = 'gold') {
  if (typeof window === 'undefined') return;

  import('canvas-confetti').then((confettiModule) => {
    const confetti = confettiModule.default;
    const colors =
      type === 'gold'
        ? ['#D4AF37', '#F9F0D0', '#AA771C']
        : type === 'rose'
        ? ['#EED9D5', '#8C4A52', '#DFBCB5']
        : ['#E59E00', '#FFC000', '#FA6400'];

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.65 },
      colors,
      ticks: 120,
      gravity: 0.8,
      scalar: 0.9,
    });
  }).catch(() => {});
}

export function playTactileSound(audioUrl?: string) {
  if (!audioUrl || typeof window === 'undefined') return;

  try {
    const audio = new Audio(audioUrl);
    audio.volume = 0.5;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Browser autoplay policy prevented playback until gesture
        console.debug("Audio autoplay deferred until gesture:", err);
      });
    }
  } catch (e) {
    // Ignore audio errors gracefully
  }
}

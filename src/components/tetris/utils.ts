import { toast } from "sonner";
import confetti from "canvas-confetti";
import { CONFETTI_CONFIG, SCORE_MAP } from "./constants";

// Toast and confetti effects for line clears
export function celebrateLineClear(cleared: number): void {
  if (cleared === 0) return;
  
  // Show toast notification
  const points = SCORE_MAP[cleared] || 0;
  toast(`💥 Cleared ${cleared} lines +${points} points!`, {
    style: {
      background: "linear-gradient(45deg, #42e695, #3bb2b8)",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
    },
    position: "top-center",
  });

  // Fire confetti
  const config = CONFETTI_CONFIG[cleared] || CONFETTI_CONFIG[1];
  
  // Fire from both sides for more impressive effect
  confetti({
    ...config,
    origin: { x: 0.2, y: 0.8 }
  });
  
  confetti({
    ...config,
    origin: { x: 0.8, y: 0.8 }
  });
}

// Celebrate level up
export function celebrateLevelUp(newLevel: number): void {
  if (newLevel % 10 === 0) {
    // Major level milestone (every 10 levels)
    const colors = ['#ff0000', '#ffd700', '#00ff00', '#1e90ff', '#ff00ff', '#00ffff'];
    
    // Multiple bursts of confetti from different angles
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 160,
          origin: { x: 0.1 + (i * 0.2), y: 0.5 },
          colors: colors,
          startVelocity: 40,
          gravity: 1.2,
          scalar: 1.2
        });
      }, i * 300);
    }
    
    // Add a special toast notification
    toast(`🎉 LEVEL ${newLevel} ACHIEVED! AMAZING! 🎉`, {
      style: {
        background: "linear-gradient(45deg, #ff4500, #ffd700)",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "8px",
        fontSize: "18px"
      },
      duration: 5000,
      position: "top-center",
    });
    
    // Play victory music
    playVictoryMusic();
  } else {
    // Regular level up
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.3, y: 0.5 },
      colors: ['#ffd700', '#1e90ff', '#00ff00']
    });
    
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.7, y: 0.5 },
      colors: ['#ffd700', '#1e90ff', '#00ff00']
    });
    
    toast(`🆙 Level Up! Now at Level ${newLevel}! 🆙`, {
      style: {
        background: "linear-gradient(45deg, #1e90ff, #00ff00)",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "8px"
      },
      position: "top-center",
    });
  }
}

// Play victory music (Toréador Song from Carmen)
export function playVictoryMusic(): void {
  // Find any existing audio player
  const existingAudio = document.querySelector('audio');
  
  if (existingAudio) {
    // Store current track info to resume after victory
    const currentSrc = existingAudio.src;
    const wasPlaying = !existingAudio.paused;
    const currentTime = existingAudio.currentTime;
    const currentVolume = existingAudio.volume;
    
    // Import music tracks to find victory music
    import('./constants').then(({ MUSIC_TRACKS }) => {
      const victoryTrack = MUSIC_TRACKS.find(track => track.id === 'victory');
      
      if (victoryTrack) {
        // Play victory music
        existingAudio.src = victoryTrack.src;
        existingAudio.loop = false;
        existingAudio.volume = currentVolume;
        existingAudio.play().catch(err => console.error(err));
        
        // Show toast with track info
        toast(`🎵 Now playing: ${victoryTrack.name}`, {
          description: `Composed by ${victoryTrack.composer}, arranged by ${victoryTrack.arranger}`,
          duration: 3000,
        });
        
        // Listen for end of victory music to resume previous track
        const handleVictoryEnd = () => {
          existingAudio.src = currentSrc;
          existingAudio.currentTime = currentTime;
          existingAudio.loop = true;
          
          if (wasPlaying) {
            existingAudio.play().catch(err => console.error(err));
          }
          
          existingAudio.removeEventListener('ended', handleVictoryEnd);
        };
        
        existingAudio.addEventListener('ended', handleVictoryEnd);
      }
    });
  }
}

// Local storage helpers
export const storage = {
  getTopScore: (): number => {
    const stored = localStorage.getItem("tetris-topscore");
    return stored ? Number(stored) : 0;
  },
  
  setTopScore: (score: number): void => {
    localStorage.setItem("tetris-topscore", String(score));
  }
};

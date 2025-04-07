import { toast } from "sonner";
import confetti from "canvas-confetti";
import { CONFETTI_CONFIG, SCORE_MAP } from "./constants";
import { audioManager, SOUND_EFFECTS } from "./sounds";

// Toast and confetti effects for line clears
export function celebrateLineClear(cleared: number): void {
  if (cleared === 0) return;
  
  // Show toast notification with higher z-index
  const points = SCORE_MAP[cleared] || 0;
  toast(`💥 Cleared ${cleared} lines +${points} points!`, {
    style: {
      background: "linear-gradient(45deg, #42e695, #3bb2b8)",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
      zIndex: 9999, // Ensure toast appears above everything
    },
    position: "top-center",
  });

  // Fire confetti with zIndex to ensure it's visible
  const config = CONFETTI_CONFIG[cleared] || CONFETTI_CONFIG[1];
  
  // Fire from both sides for more impressive effect
  confetti({
    ...config,
    origin: { x: 0.2, y: 0.8 },
    zIndex: 9999 // Ensure confetti appears above everything
  });
  
  confetti({
    ...config,
    origin: { x: 0.8, y: 0.8 },
    zIndex: 9999 // Ensure confetti appears above everything
  });
  
  // Play appropriate sound effect based on number of lines cleared
  switch (cleared) {
    case 1:
      audioManager.playSound('CLEAR_SINGLE');
      break;
    case 2:
      audioManager.playSound('CLEAR_DOUBLE');
      break;
    case 3:
      audioManager.playSound('CLEAR_TRIPLE');
      break;
    case 4:
      audioManager.playSound('CLEAR_TETRIS');
      playSuccessSound();
      break;
  }
}

// Play success sound effect
export function playSuccessSound(): void {
  // Play the success sound using our audio manager
  audioManager.playMusic('success');
  
  // Show toast with track info
  toast(`🎵 Tetris! Perfect clear!`, {
    duration: 2000,
    position: "top-center",
    style: {
      background: "linear-gradient(45deg, #ff4500, #ffd700)",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
    },
  });
  
  // After success sound finishes, it will automatically return to the previous track
  // thanks to the audio manager's event handling
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
          scalar: 1.2,
          zIndex: 9999 // Ensure confetti appears above everything
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
        fontSize: "18px",
        zIndex: 9999 // Ensure toast appears above everything
      },
      duration: 5000,
      position: "top-center",
    });
    
    // Play victory music for major milestone
    audioManager.playMusic('victory');
  } else {
    // Regular level up
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.3, y: 0.5 },
      colors: ['#ffd700', '#1e90ff', '#00ff00'],
      zIndex: 9999 // Ensure confetti appears above everything
    });
    
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.7, y: 0.5 },
      colors: ['#ffd700', '#1e90ff', '#00ff00'],
      zIndex: 9999 // Ensure confetti appears above everything
    });
    
    toast(`🆙 Level Up! Now at Level ${newLevel}! 🆙`, {
      style: {
        background: "linear-gradient(45deg, #1e90ff, #00ff00)",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "8px",
        zIndex: 9999 // Ensure toast appears above everything
      },
      position: "top-center",
    });
    
    // Play level up sound
    audioManager.playSound('LEVEL_UP');
  }
}

// Play victory music (Toréador Song from Carmen)
export function playVictoryMusic(): void {
  // Play the victory music using our audio manager
  audioManager.playMusic('victory');
  
  // Find the victory track to show info
  import('./sounds').then(({ MUSIC_TRACKS }) => {
    const victoryTrack = MUSIC_TRACKS.find(track => track.id === 'victory');
    
    if (victoryTrack) {
      // Show toast with track info
      toast(`🎵 Now playing: ${victoryTrack.name}`, {
        description: `Composed by ${victoryTrack.composer}, arranged by ${victoryTrack.arranger}`,
        duration: 3000,
        position: "top-center",
        style: {
          background: "linear-gradient(45deg, #ff4500, #ffd700)",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "8px",
        },
      });
    }
  });
}

// Switch to fast music when board is getting full
export function switchToFastMusic(dangerLevel: number): void {
  // dangerLevel should be between 0-1, where 1 means the board is almost full
  if (dangerLevel < 0.7) return; // Only switch when board is 70% or more full
  
  // Import music tracks to find the fast version
  import('./sounds').then(({ MUSIC_TRACKS, audioManager }) => {
    // Get the current track ID from the audio manager
    const currentTrackId = audioManager.getCurrentTrackId();
    
    // If we're already playing a fast track, don't switch
    if (currentTrackId?.includes('_fast')) return;
    
    // Find the corresponding fast track
    if (currentTrackId) {
      const fastTrackId = `${currentTrackId}_fast`;
      const fastTrack = MUSIC_TRACKS.find(track => track.id === fastTrackId);
      
      if (fastTrack) {
        // Switch to fast version
        audioManager.playMusic(fastTrackId);
      }
    }
  });
}

// Switch back to normal speed music when board is less full
export function switchToNormalMusic(dangerLevel: number): void {
  // Only switch back when board is less than 50% full
  if (dangerLevel >= 0.5) return;
  
  // Import music tracks to find the normal version
  import('./sounds').then(({ MUSIC_TRACKS, audioManager }) => {
    // Get the current track ID from the audio manager
    const currentTrackId = audioManager.getCurrentTrackId();
    
    // If we're not playing a fast track, don't switch
    if (!currentTrackId?.includes('_fast')) return;
    
    // Find the corresponding normal track
    if (currentTrackId) {
      const normalTrackId = currentTrackId.replace('_fast', '');
      const normalTrack = MUSIC_TRACKS.find(track => track.id === normalTrackId);
      
      if (normalTrack) {
        // Switch to normal version
        audioManager.playMusic(normalTrackId);
      }
    }
  });
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

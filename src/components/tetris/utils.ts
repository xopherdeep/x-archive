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
  
  // Play success sound for Tetris (4 lines)
  if (cleared === 4) {
    playSuccessSound();
  }
}

// Play success sound effect
export function playSuccessSound(): void {
  // Find any existing audio player
  const existingAudio = document.querySelector('audio');
  
  if (existingAudio) {
    // Store current track info to resume after success sound
    const currentSrc = existingAudio.src;
    const wasPlaying = !existingAudio.paused;
    const currentTime = existingAudio.currentTime;
    const currentVolume = existingAudio.volume;
    
    // Import music tracks to find success sound
    import('./constants').then(({ MUSIC_TRACKS }) => {
      const successTrack = MUSIC_TRACKS.find(track => track.id === 'success');
      
      if (successTrack) {
        // Play success sound
        existingAudio.src = successTrack.src;
        existingAudio.loop = false;
        existingAudio.volume = currentVolume;
        existingAudio.play().catch(err => console.error(err));
        
        // Listen for end of success sound to resume previous track
        const handleSuccessEnd = () => {
          existingAudio.src = currentSrc;
          existingAudio.currentTime = currentTime;
          existingAudio.loop = true;
          
          if (wasPlaying) {
            existingAudio.play().catch(err => console.error(err));
          }
          
          existingAudio.removeEventListener('ended', handleSuccessEnd);
        };
        
        existingAudio.addEventListener('ended', handleSuccessEnd);
      }
    });
  }
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
        
        // After victory music, play high score music
        const handleVictoryEnd = () => {
          const highScoreTrack = MUSIC_TRACKS.find(track => track.id === 'high_score');
          
          if (highScoreTrack) {
            existingAudio.src = highScoreTrack.src;
            existingAudio.loop = false;
            existingAudio.play().catch(err => console.error(err));
            
            // After high score music, resume previous track
            const handleHighScoreEnd = () => {
              existingAudio.src = currentSrc;
              existingAudio.currentTime = currentTime;
              existingAudio.loop = true;
              
              if (wasPlaying) {
                existingAudio.play().catch(err => console.error(err));
              }
              
              existingAudio.removeEventListener('ended', handleHighScoreEnd);
            };
            
            existingAudio.addEventListener('ended', handleHighScoreEnd);
          } else {
            // If high score track not found, resume previous track
            existingAudio.src = currentSrc;
            existingAudio.currentTime = currentTime;
            existingAudio.loop = true;
            
            if (wasPlaying) {
              existingAudio.play().catch(err => console.error(err));
            }
          }
          
          existingAudio.removeEventListener('ended', handleVictoryEnd);
        };
        
        existingAudio.addEventListener('ended', handleVictoryEnd);
      }
    });
  }
}

// Switch to fast music when board is getting full
export function switchToFastMusic(dangerLevel: number): void {
  // dangerLevel should be between 0-1, where 1 means the board is almost full
  if (dangerLevel < 0.7) return; // Only switch when board is 70% or more full
  
  const existingAudio = document.querySelector('audio');
  if (!existingAudio || existingAudio.paused) return;
  
  // Get current track URL
  const currentSrc = existingAudio.src;
  
  // Import music tracks to find the fast version
  import('./constants').then(({ MUSIC_TRACKS }) => {
    // Find the current track
    const currentTrack = MUSIC_TRACKS.find(track => track.src === currentSrc);
    
    // If we're already playing a fast track, don't switch
    if (currentTrack?.id.includes('_fast')) return;
    
    // Find the corresponding fast track
    if (currentTrack) {
      const fastTrackId = `${currentTrack.id}_fast`;
      const fastTrack = MUSIC_TRACKS.find(track => track.id === fastTrackId);
      
      if (fastTrack) {
        // Save current position
        const currentTime = existingAudio.currentTime;
        const duration = existingAudio.duration;
        const relativePosition = currentTime / duration;
        
        // Switch to fast version
        existingAudio.src = fastTrack.src;
        existingAudio.loop = true;
        
        // Try to match position in the new track
        existingAudio.addEventListener('loadedmetadata', () => {
          existingAudio.currentTime = relativePosition * existingAudio.duration;
          existingAudio.play().catch(err => console.error(err));
        }, { once: true });
        
        existingAudio.load();
      }
    }
  });
}

// Switch back to normal speed music when board is less full
export function switchToNormalMusic(dangerLevel: number): void {
  // Only switch back when board is less than 50% full
  if (dangerLevel >= 0.5) return;
  
  const existingAudio = document.querySelector('audio');
  if (!existingAudio || existingAudio.paused) return;
  
  // Get current track URL
  const currentSrc = existingAudio.src;
  
  // Import music tracks to find the normal version
  import('./constants').then(({ MUSIC_TRACKS }) => {
    // Find the current track
    const currentTrack = MUSIC_TRACKS.find(track => track.src === currentSrc);
    
    // If we're not playing a fast track, don't switch
    if (!currentTrack?.id.includes('_fast')) return;
    
    // Find the corresponding normal track
    if (currentTrack) {
      const normalTrackId = currentTrack.id.replace('_fast', '');
      const normalTrack = MUSIC_TRACKS.find(track => track.id === normalTrackId);
      
      if (normalTrack) {
        // Save current position
        const currentTime = existingAudio.currentTime;
        const duration = existingAudio.duration;
        const relativePosition = currentTime / duration;
        
        // Switch to normal version
        existingAudio.src = normalTrack.src;
        existingAudio.loop = true;
        
        // Try to match position in the new track
        existingAudio.addEventListener('loadedmetadata', () => {
          existingAudio.currentTime = relativePosition * existingAudio.duration;
          existingAudio.play().catch(err => console.error(err));
        }, { once: true });
        
        existingAudio.load();
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

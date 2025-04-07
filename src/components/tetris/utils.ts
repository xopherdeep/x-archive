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

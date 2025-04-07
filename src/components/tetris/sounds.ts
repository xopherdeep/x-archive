// Sound effects for Tetris game
export const SOUND_EFFECTS = {
  // Movement sounds
  MOVE: '/assets/sounds/tetris/move.mp3',
  ROTATE: '/assets/sounds/tetris/rotate.mp3',
  DROP: '/assets/sounds/tetris/drop.mp3',
  HARD_DROP: '/assets/sounds/tetris/hard_drop.mp3',
  HOLD: '/assets/sounds/tetris/hold.mp3',
  
  // Line clear sounds
  CLEAR_SINGLE: '/assets/sounds/tetris/clear_single.mp3',
  CLEAR_DOUBLE: '/assets/sounds/tetris/clear_double.mp3',
  CLEAR_TRIPLE: '/assets/sounds/tetris/clear_triple.mp3',
  CLEAR_TETRIS: '/assets/sounds/tetris/clear_tetris.mp3',
  
  // Game state sounds
  LEVEL_UP: '/assets/sounds/tetris/level_up.mp3',
  GAME_OVER: '/assets/sounds/tetris/game_over.mp3',
  
  // UI sounds
  MENU_SELECT: '/assets/sounds/tetris/menu_select.mp3',
  MENU_CONFIRM: '/assets/sounds/tetris/menu_confirm.mp3'
};

// Music tracks for Tetris game
export const MUSIC_TRACKS = [
  {
    id: "music1",
    name: "Theme A (Korobeiniki)",
    src: "/assets/music/tetris/theme_a.mp3",
    composer: "Traditional Russian Folk Song",
    arranger: "Hirokazu Tanaka"
  },
  {
    id: "music1_fast",
    name: "Theme A - Fast",
    src: "/assets/music/tetris/theme_a_fast.mp3",
    composer: "Traditional Russian Folk Song",
    arranger: "Hirokazu Tanaka"
  },
  {
    id: "music2",
    name: "Theme B (Troika)",
    src: "/assets/music/tetris/theme_b.mp3",
    composer: "Traditional Russian Folk Song",
    arranger: "Hirokazu Tanaka"
  },
  {
    id: "music2_fast",
    name: "Theme B - Fast",
    src: "/assets/music/tetris/theme_b_fast.mp3",
    composer: "Traditional Russian Folk Song",
    arranger: "Hirokazu Tanaka"
  },
  {
    id: "music3",
    name: "Theme C (Bradinsky)",
    src: "/assets/music/tetris/theme_c.mp3",
    composer: "Hirokazu Tanaka",
    arranger: "Hirokazu Tanaka"
  },
  {
    id: "music3_fast",
    name: "Theme C - Fast",
    src: "/assets/music/tetris/theme_c_fast.mp3",
    composer: "Hirokazu Tanaka",
    arranger: "Hirokazu Tanaka"
  },
  {
    id: "success",
    name: "Success!",
    src: "/assets/music/tetris/success.mp3",
    composer: "Hirokazu Tanaka",
    arranger: "Hirokazu Tanaka",
    loop: false
  },
  {
    id: "victory",
    name: "Victory (Toréador Song from Carmen)",
    src: "/assets/music/tetris/victory.mp3",
    composer: "Georges Bizet",
    arranger: "Hirokazu Tanaka",
    loop: false
  },
  {
    id: "high_score",
    name: "High Score",
    src: "/assets/music/tetris/high_score.mp3",
    composer: "Hirokazu Tanaka",
    arranger: "Hirokazu Tanaka",
    loop: false
  }
];

// Audio player utility
class AudioManager {
  private static instance: AudioManager;
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private musicElement: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.5;
  private currentTrackId: string | null = null;
  
  private constructor() {
    // Pre-load sound effects for better performance
    Object.entries(SOUND_EFFECTS).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      audio.volume = this.volume;
      this.sounds.set(key, audio);
    });
  }
  
  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }
  
  public playSound(soundKey: keyof typeof SOUND_EFFECTS): void {
    if (this.isMuted) return;
    
    const sound = this.sounds.get(soundKey);
    if (sound) {
      // Clone the audio to allow overlapping sounds
      const soundClone = sound.cloneNode() as HTMLAudioElement;
      soundClone.volume = this.volume;
      soundClone.play().catch(err => console.error(`Error playing sound ${soundKey}:`, err));
    }
  }
  
  public playMusic(trackId: string): void {
    if (!this.musicElement) {
      this.musicElement = new Audio();
    }
    
    const track = MUSIC_TRACKS.find(t => t.id === trackId);
    if (track) {
      this.currentTrackId = trackId;
      this.musicElement.src = track.src;
      this.musicElement.loop = track.loop !== false;
      this.musicElement.volume = this.isMuted ? 0 : this.volume;
      this.musicElement.play().catch(err => console.error(`Error playing music ${trackId}:`, err));
    }
  }
  
  public getCurrentTrackId(): string | null {
    return this.currentTrackId;
  }
  
  public stopMusic(): void {
    if (this.musicElement) {
      this.musicElement.pause();
      this.musicElement.currentTime = 0;
    }
  }
  
  public pauseMusic(): void {
    if (this.musicElement) {
      this.musicElement.pause();
    }
  }
  
  public resumeMusic(): void {
    if (this.musicElement && !this.isMuted) {
      this.musicElement.play().catch(err => console.error('Error resuming music:', err));
    }
  }
  
  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    
    // Update all sound volumes
    this.sounds.forEach(sound => {
      sound.volume = this.volume;
    });
    
    // Update music volume
    if (this.musicElement) {
      this.musicElement.volume = this.isMuted ? 0 : this.volume;
    }
  }
  
  public mute(): void {
    this.isMuted = true;
    if (this.musicElement) {
      this.musicElement.volume = 0;
    }
  }
  
  public unmute(): void {
    this.isMuted = false;
    if (this.musicElement) {
      this.musicElement.volume = this.volume;
    }
  }
  
  public isMutedState(): boolean {
    return this.isMuted;
  }
  
  public getCurrentVolume(): number {
    return this.volume;
  }
}

export const audioManager = AudioManager.getInstance();

"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Volume1, Music, Info } from "lucide-react";
import { MUSIC_TRACKS, audioManager } from "./sounds";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import GameCard from "./GameCard";

// Track type definition
type MusicTrack = {
  id: string;
  name: string;
  src: string;
  composer: string;
  arranger: string;
  loop?: boolean;
};

interface MusicPlayerProps {
  inGameHUD?: boolean;
  paused?: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const MusicPlayer = memo(function MusicPlayer({ inGameHUD = false, paused = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);

  // Get current track
  const currentTrack = MUSIC_TRACKS[currentTrackIndex];

  // Initialize audio on mount
  useEffect(() => {
    // Select Music 1 as default track (most recognizable Tetris theme)
    setCurrentTrackIndex(0);
    
    // Set initial volume
    audioManager.setVolume(volume);
    
    // Listen for music started event from game
    const handleMusicStarted = (event: CustomEvent) => {
      const newVolume = event.detail.volume || 0.5;
      setVolume(newVolume);
      audioManager.setVolume(newVolume);
      setIsPlaying(true);
      audioManager.playMusic('music1');
    };
    
    // Add custom event listener to the component
    const element = document.querySelector('[data-music-player]');
    if (element) {
      element.addEventListener('musicStarted', handleMusicStarted as EventListener);
    }
    
    return () => {
      // Remove custom event listener
      if (element) {
        element.removeEventListener('musicStarted', handleMusicStarted as EventListener);
      }
    };
  }, []);
  
  // Update audio when track changes
  useEffect(() => {
    if (currentTrack) {
      if (isPlaying) {
        audioManager.playMusic(currentTrack.id);
        
        // Show toast with track info
        toast(`🎵 Now playing: ${currentTrack.name}`, {
          description: `Composed by ${currentTrack.composer}, arranged by ${currentTrack.arranger}`,
          duration: 3000,
          position: "top-center",
          style: {
            background: "linear-gradient(45deg, #1e90ff, #00bfff)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
          },
        });
      }
    }
  }, [currentTrackIndex, currentTrack, isPlaying]);

  // Handle game pause state
  useEffect(() => {
    if (paused && isPlaying) {
      audioManager.pauseMusic();
    } else if (!paused && isPlaying) {
      audioManager.resumeMusic();
    }
  }, [paused, isPlaying]);

  // Toggle music playback
  const toggleMusic = () => {
    if (isPlaying) {
      audioManager.pauseMusic();
    } else {
      audioManager.playMusic(currentTrack.id);
      
      // Show toast with track info when starting playback
      toast(`🎵 Now playing: ${currentTrack.name}`, {
        description: `Composed by ${currentTrack.composer}, arranged by ${currentTrack.arranger}`,
        duration: 3000,
        position: "top-center",
        style: {
          background: "linear-gradient(45deg, #1e90ff, #00bfff)",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "8px",
        },
      });
    }
    setIsPlaying(!isPlaying);
  };
  
  // Change to next track
  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % MUSIC_TRACKS.length;
    setCurrentTrackIndex(nextIndex);
  };
  
  // Change to previous track
  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    setCurrentTrackIndex(prevIndex);
  };
  
  // Adjust volume directly
  const adjustVolume = (newVolume: number) => {
    setVolume(newVolume);
    audioManager.setVolume(newVolume);
    
    // If volume is set to 0, mute the audio
    if (newVolume === 0) {
      audioManager.mute();
      setIsPlaying(false);
    } else if (!isPlaying && newVolume > 0) {
      // If volume is increased from 0, start playing
      audioManager.unmute();
      audioManager.playMusic(currentTrack.id);
      setIsPlaying(true);
    }
  };
  
  // Quick volume toggle (for button double-click)
  const toggleVolume = () => {
    const newVolume = volume <= 0.2 ? 0.5 : volume >= 0.8 ? 0 : volume + 0.3;
    adjustVolume(newVolume);
  };

  // Get the appropriate volume icon
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  // Render different UI based on whether it's in the game HUD or standalone
  if (inGameHUD) {
    return (
      <GameCard title="Music">
        <div className="flex flex-col gap-2 py-1">
          <div className="flex items-center justify-between">
            <select 
              className="text-xs bg-gray-800 border border-gray-700 rounded px-1 py-0.5 max-w-[120px]"
              value={currentTrackIndex}
              onChange={(e) => {
                const index = parseInt(e.target.value);
                setCurrentTrackIndex(index);
                if (!isPlaying) {
                  setIsPlaying(true);
                }
              }}
            >
              {MUSIC_TRACKS.filter(track => 
                !track.id.includes('_fast') && 
                track.id !== 'success'
              ).map((track, index) => {
                // Find the actual index in the full MUSIC_TRACKS array
                const actualIndex = MUSIC_TRACKS.findIndex(t => t.id === track.id);
                return (
                  <option key={track.id} value={actualIndex}>
                    {track.id === "music1" ? "Theme A" : 
                     track.id === "music2" ? "Theme B" : 
                     track.id === "music3" ? "Theme C" : 
                     track.id === "victory" ? "Victory" : 
                     track.id === "high_score" ? "High Score" : 
                     track.id === "unknown" ? "Unused" : track.id}
                  </option>
                );
              })}
            </select>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={toggleMusic}
              aria-label={isPlaying ? "Mute music" : "Play music"}
            >
              {isPlaying ? (
                volume === 0 ? <VolumeX className="h-3 w-3" /> : <VolumeIcon className="h-3 w-3" />
              ) : (
                <VolumeX className="h-3 w-3" />
              )}
            </Button>
          </div>
          
          {/* Volume slider */}
          <div className="flex items-center gap-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => adjustVolume(parseFloat(e.target.value))}
              className="w-full h-2"
            />
          </div>
          
          {/* No need for audio element anymore, using AudioManager */}
        </div>
      </GameCard>
    );
  }
  
  // Original standalone version for non-game pages
  return (
    <TooltipProvider>
      <div className="fixed top-4 right-4 z-[9999] flex gap-2" data-music-player>
        <Popover open={showControls} onOpenChange={setShowControls}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              aria-label="Music controls"
            >
              <Music className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" side="bottom">
            <div className="space-y-4">
              <h3 className="font-medium text-center">NES Tetris Music</h3>
              <div className="text-sm text-center mb-2">
                Original music by Hirokazu Tanaka (1989)
              </div>
              
              <div className="space-y-2">
                {MUSIC_TRACKS.filter(track => 
                  !track.id.includes('_fast') && 
                  track.id !== 'success'
                ).map((track, index) => {
                  // Find the actual index in the full MUSIC_TRACKS array
                  const actualIndex = MUSIC_TRACKS.findIndex(t => t.id === track.id);
                  
                  return (
                    <Button 
                      key={track.id}
                      variant={currentTrackIndex === actualIndex ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => {
                        setCurrentTrackIndex(actualIndex);
                        if (!isPlaying) {
                          setIsPlaying(true);
                        }
                      }}
                    >
                      <span className="truncate">
                        {track.id === "music1" ? "Theme A" : 
                         track.id === "music2" ? "Theme B" : 
                         track.id === "music3" ? "Theme C" : 
                         track.id === "victory" ? "Victory" : 
                         track.id === "high_score" ? "High Score" : 
                         track.id === "unknown" ? "Unused" : track.id}
                      </span>
                    </Button>
                  );
                })}
              </div>
              
              <div className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                  {currentTrack.composer !== currentTrack.arranger ? (
                    <>Composed by {currentTrack.composer}<br/>Arranged by {currentTrack.arranger}</>
                  ) : (
                    <>By {currentTrack.composer}</>
                  )}
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  From Nintendo's<br/>Tetris (NES, 1989)
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs">Volume:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => adjustVolume(parseFloat(e.target.value))}
                  className="flex-1 h-2"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleMusic}
              onDoubleClick={toggleVolume}
              aria-label={isPlaying ? "Mute music" : "Play music"}
            >
              {isPlaying ? (
                volume === 0 ? <VolumeX className="h-4 w-4" /> : <VolumeIcon className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isPlaying ? `Playing: ${currentTrack.id === "music1" ? "Theme A" : 
                                    currentTrack.id === "music2" ? "Theme B" : 
                                    currentTrack.id === "music3" ? "Theme C" : 
                                    currentTrack.id === "victory" ? "Victory" : 
                                    currentTrack.id === "high_score" ? "High Score" : 
                                    currentTrack.id === "unknown" ? "Unused" : currentTrack.id}` : "Play music"}
            <div className="text-xs">Double-click to adjust volume</div>
          </TooltipContent>
        </Tooltip>
        
        {/* No need for audio element anymore, using AudioManager */}
      </div>
    </TooltipProvider>
  );
});

export default MusicPlayer;

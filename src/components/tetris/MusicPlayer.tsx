"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Volume1, Music, Info } from "lucide-react";
import { MUSIC_TRACKS } from "./constants";
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

// Track type definition
type MusicTrack = {
  id: string;
  name: string;
  src: string;
  composer: string;
  arranger: string;
  loop?: boolean;
};

// Memoize the component to prevent unnecessary re-renders
const MusicPlayer = memo(function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
    
    // Set up audio element
    if (audioRef.current) {
      audioRef.current.src = currentTrack.src;
      audioRef.current.loop = currentTrack.loop !== false; // Loop by default
      audioRef.current.volume = volume;
      
      // Handle track end
      const handleEnded = () => {
        if (currentTrack.loop === false) {
          // For non-looping tracks like victory, go to next track
          // Only go to main music tracks (0, 2, 4) after special tracks
          const mainMusicIndices = [0, 2, 4];
          const nextIndex = mainMusicIndices[Math.floor(Math.random() * mainMusicIndices.length)];
          setCurrentTrackIndex(nextIndex);
        }
      };
      
      audioRef.current.addEventListener('ended', handleEnded);
      
      // Preload all audio files to prevent delays
      MUSIC_TRACKS.forEach(track => {
        const audio = new Audio();
        audio.preload = 'metadata';
        audio.src = track.src;
      });
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.pause();
        }
      };
    }
  }, []);
  
  // Update audio when track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.src;
      audioRef.current.loop = currentTrack.loop !== false;
      
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error(err));
        
        // Show toast with track info
        toast(`🎵 Now playing: ${currentTrack.name}`, {
          description: `Composed by ${currentTrack.composer}, arranged by ${currentTrack.arranger}`,
          duration: 3000,
        });
      }
    }
  }, [currentTrackIndex, currentTrack]);

  // Toggle music playback
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error(err));
        
        // Show toast with track info when starting playback
        toast(`🎵 Now playing: ${currentTrack.name}`, {
          description: `Composed by ${currentTrack.composer}, arranged by ${currentTrack.arranger}`,
          duration: 3000,
        });
      }
      setIsPlaying(!isPlaying);
    }
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
  
  // Adjust volume
  const adjustVolume = () => {
    const newVolume = volume <= 0.2 ? 0.5 : volume >= 0.8 ? 0 : volume + 0.3;
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      // If volume is set to 0, pause the audio
      if (newVolume === 0) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (!isPlaying && newVolume > 0) {
        // If volume is increased from 0, start playing
        audioRef.current.play().catch(err => console.error(err));
        setIsPlaying(true);
      }
    }
  };

  // Get the appropriate volume icon
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <TooltipProvider>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
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
                      <span className="truncate">{track.name}</span>
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
            </div>
          </PopoverContent>
        </Popover>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleMusic}
              onDoubleClick={adjustVolume}
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              <VolumeIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isPlaying ? `Playing: ${currentTrack.name}` : "Play music"}
            <div className="text-xs">Double-click to adjust volume</div>
          </TooltipContent>
        </Tooltip>
        
        <audio ref={audioRef} />
      </div>
    </TooltipProvider>
  );
});

export default MusicPlayer;

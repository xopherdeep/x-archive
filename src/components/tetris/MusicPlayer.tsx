"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import { MUSIC_TRACKS } from "./constants";

// Memoize the component to prevent unnecessary re-renders
const MusicPlayer = memo(function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState("");

  // Initialize audio on mount
  useEffect(() => {
    // Select a random track
    const track = MUSIC_TRACKS[Math.floor(Math.random() * MUSIC_TRACKS.length)];
    setCurrentTrack(track);
    
    // Set up audio element
    if (audioRef.current) {
      audioRef.current.src = track;
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      
      // Handle track end
      const handleEnded = () => {
        // Play next track when current one ends
        const nextTrack = MUSIC_TRACKS.filter(t => t !== currentTrack)[
          Math.floor(Math.random() * (MUSIC_TRACKS.length - 1))
        ];
        setCurrentTrack(nextTrack);
        if (audioRef.current) {
          audioRef.current.src = nextTrack;
          audioRef.current.play().catch(err => console.error(err));
        }
      };
      
      audioRef.current.addEventListener('ended', handleEnded);
      
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
      audioRef.current.src = currentTrack;
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error(err));
      }
    }
  }, [currentTrack, isPlaying]);

  // Toggle music playback
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error(err));
      }
      setIsPlaying(!isPlaying);
    }
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
    <div className="fixed top-4 right-4 z-50">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleMusic}
        onDoubleClick={adjustVolume}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        title={isPlaying ? `Volume: ${Math.round(volume * 100)}%` : "Play music"}
      >
        <VolumeIcon className="h-4 w-4" />
      </Button>
      <audio ref={audioRef} />
    </div>
  );
});

export default MusicPlayer;

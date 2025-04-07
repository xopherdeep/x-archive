"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

const tracks = [
  "/assets/music/track1.mp3",
  "/assets/music/track2.mp3",
  "/assets/music/track3.mp3",
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("");

  useEffect(() => {
    const track = tracks[Math.floor(Math.random() * tracks.length)];
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = track;
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      // Don't autoplay - wait for user interaction
    }
  }, []);

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

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        title={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
      <audio ref={audioRef} />
    </div>
  );
}

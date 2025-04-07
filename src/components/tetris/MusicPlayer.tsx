"use client";
import React, { useEffect, useRef } from "react";

const tracks = [
  "/assets/music/track1.mp3",
  "/assets/music/track2.mp3",
  "/assets/music/track3.mp3",
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const track = tracks[Math.floor(Math.random() * tracks.length)];
    if (audioRef.current) {
      audioRef.current.src = track;
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => console.error(err));
    }
  }, []);

  return <audio ref={audioRef} />;
}

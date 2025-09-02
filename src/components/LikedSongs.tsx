"use client";
import { useEffect, useState } from "react";

export default function RandomLikedSong() {
  const [song, setSong] = useState(null);

  useEffect(() => {
    fetch("/api/spotify/liked")
      .then((res) => res.json())
      .then((data) => setSong(data));
  }, []);

  if (!song) return <p>Loading...</p>;

  return (
    <div>
      <h3>{song.title}</h3>
      <p>{song.artists}</p>
      <p>{song.year}</p>
      <img src={song.image} alt={song.title} width={150} />
      <a href={song.url} target="_blank" rel="noopener noreferrer">
        Listen on Spotify
      </a>
    </div>
  );
}

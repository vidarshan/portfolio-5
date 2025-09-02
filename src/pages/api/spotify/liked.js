// pages/api/spotify/liked.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // 1. Refresh access token
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", process.env.SPOTIFY_REFRESH_TOKEN);

    const authHeader =
      "Basic " +
      Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
      ).toString("base64");

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. Fetch liked songs
    const likedRes = await fetch(
      `https://api.spotify.com/v1/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks?limit=50`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const likedSongs = await likedRes.json();
    console.log(likedSongs);
    const items = likedSongs.items;

    if (!items || items.length === 0) {
      return res.status(404).json({ error: "No liked songs found" });
    }

    // 3. Pick a random song
    const randomIndex = Math.floor(Math.random() * items.length);
    const song = items[randomIndex].track;

    // 4. Return relevant info
    res.status(200).json({
      title: song.name,
      artists: song.artists.map((a) => a.name).join(", "),
      album: song.album.name,
      image: song.album.images[0]?.url,
      url: song.external_urls.spotify,
      year: song.album.release_date?.split("-")[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch liked songs" });
  }
}

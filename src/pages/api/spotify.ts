import type { NextApiRequest, NextApiResponse } from "next";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
}

interface SpotifyLikedResponse {
  items: { track: SpotifyTrack }[];
}

interface SongResponse {
  name: string;
  artists: string[];
  albumArt: string;
  url: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SongResponse>
) {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return res.status(500).json({
      name: "",
      artists: [],
      albumArt: "",
      url: "",
      error: "Missing Spotify environment variables",
    });
  }

  // Step 1: Get fresh access token
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
          "base64"
        ),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const tokenData = (await tokenResponse.json()) as SpotifyTokenResponse;
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return res.status(500).json({
      name: "",
      artists: [],
      albumArt: "",
      url: "",
      error: "Failed to get access token",
    });
  }

  // Step 2: Fetch liked songs
  const likedRes = await fetch(
    "https://api.spotify.com/v1/me/tracks?limit=50",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const likedData = (await likedRes.json()) as SpotifyLikedResponse;

  if (!likedData.items || likedData.items.length === 0) {
    return res.status(200).json({
      name: "",
      artists: [],
      albumArt: "",
      url: "",
      error: "No liked songs found",
    });
  }

  // Step 3: Pick a random track
  const random =
    likedData.items[Math.floor(Math.random() * likedData.items.length)];
  const track = random.track;

  return res.status(200).json({
    name: track.name,
    artists: track.artists.map((a) => a.name),
    albumArt: track.album.images[0]?.url ?? "",
    url: track.external_urls.spotify,
  });
}

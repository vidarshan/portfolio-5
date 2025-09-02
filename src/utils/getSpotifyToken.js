import fetch from "node-fetch";
import btoa from "btoa";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // replace with your secret
const authorizationCode = process.env.SPOTIFY_AUTH_CODE;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

(async () => {
  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: redirectUri,
      }),
    });

    const data = await res.json();
    console.log(clientId, clientSecret, authorizationCode);
    console.log("Access Token:", data.access_token);
    console.log("Refresh Token:", data.refresh_token);
  } catch (err) {
    console.error("Error fetching tokens:", err);
  }
})();

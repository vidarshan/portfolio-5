import fetch from "node-fetch";
import btoa from "btoa";

const clientId = "1d17426bb4614a9e9f6dc5186cdead16";
const clientSecret = "3e49e033a894495bb8f9a32f734b12a9"; // replace with your secret
const authorizationCode =
  "AQBqGARgL3SWl5gQjCm3TfY7G2krmDkLBYf5TCxt5T9T633Xo_Ixmcn64y42Zeo0LI1KSIxauICwRnd";
const redirectUri = "https://portfolio-5-iela.vercel.app/callback";
const uri1 = process.env.NEXT_PUBLIC_REACT_APP_SPOTIFY;

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
    console.log(uri1);
    console.log(clientId, clientSecret, authorizationCode);
    console.log("Access Token:", data.access_token);
    console.log("Refresh Token:", data.refresh_token);
  } catch (err) {
    console.error("Error fetching tokens:", err);
  }
})();

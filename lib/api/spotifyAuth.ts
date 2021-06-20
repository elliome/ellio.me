export const getAccessToken = async () => {
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

    if (!REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
        throw new Error("Missing env variable");
    }

    const spotifyAuth = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: REFRESH_TOKEN,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }),
    });

    if (spotifyAuth.status != 200) {
        console.error(await spotifyAuth.text());
        throw new Error("Failed to get access token");
    }

    const spotifyAuthJson = await spotifyAuth.json();
    const ACCESS_TOKEN = spotifyAuthJson.access_token;

    if (!ACCESS_TOKEN) {
        throw new Error("Failed to get access token");
    }

    return ACCESS_TOKEN;
};

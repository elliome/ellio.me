import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

    if (!REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
        res.status(500).send({ error: true });
        return;
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
        res.status(500).send({ error: true });
        return;
    }

    const spotifyAuthJson = await spotifyAuth.json();
    const ACCESS_TOKEN = spotifyAuthJson.access_token;

    if (!ACCESS_TOKEN) {
        res.status(500).send({ error: true });
        return;
    }

    const spotifyFetch = await fetch(
        "https://api.spotify.com/v1/me/player?market=GB",
        {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        }
    );
    const spotifyJson = await spotifyFetch.json();
    delete spotifyJson.context;
    delete spotifyJson.device;

    res.status(200).json(spotifyJson);
};

export default handler;

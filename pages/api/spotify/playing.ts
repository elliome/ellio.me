import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "../../../lib/api/spotifyAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const ACCESS_TOKEN = await getAccessToken();

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

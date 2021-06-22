import type { NextApiRequest, NextApiResponse } from "next";
import { getPlaiceholder } from "plaiceholder";
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

    let spotifyJson;

    try {
        spotifyJson = await spotifyFetch.json();
    } catch {
        res.status(500).send({ error: true });
        return;
    }

    spotifyJson.base64 =
        (await getPlaiceholder(spotifyJson.item.album.images?.[2].url).then(
            ({ base64 }) => base64
        )) ??
        "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAMUlEQVR4nGJJSa9ioCVgoqnpoxaMWjBqwagFoxaMWjBqwagFoxaMWjBqARUBIAAA//8XfwGIp+VBawAAAABJRU5ErkJggg==";
    delete spotifyJson.context;
    delete spotifyJson.device;

    res.status(200).json(spotifyJson);
};

export default handler;

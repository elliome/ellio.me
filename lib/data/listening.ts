import { getPlaiceholder } from "plaiceholder";
import { getAccessToken } from "../api/spotifyAuth";

const top = async (type: "artists" | "tracks") => {
    const ACCESS_TOKEN = await getAccessToken();

    if (!ACCESS_TOKEN) {
        throw new Error("Missing ACCESS TOKEN");
    }

    const spotifyFetch = await fetch(
        `https://api.spotify.com/v1/me/top/${type}?time_range=short_term&limit=5&offset=0`,
        {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        }
    );

    const json = await spotifyFetch.json();

    if (type == "tracks") {
        json.items = await Promise.all(
            json.items.map(async (item: any) => {
                item.album.images?.[2]?.url;
                item.base64 = await getPlaiceholder(
                    item.album.images?.[2]?.url
                ).then(({ base64 }) => base64);

                return item;
            })
        );
    } else {
        json.items = await Promise.all(
            json.items.map(async (item: any) => {
                item.base64 = await getPlaiceholder(item.images?.[2]?.url).then(
                    ({ base64 }) => base64
                );
                return item;
            })
        );
    }

    return json;
};

export const getTop = async () => {
    const response = {
        artists: await top("artists"),
        tracks: await top("tracks"),
    };

    return response;
};

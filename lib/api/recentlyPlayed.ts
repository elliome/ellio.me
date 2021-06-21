import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { getPlaiceholder } from "plaiceholder";
import { getAccessToken } from "./spotifyAuth";

export const getRecentlyPLayed = async () => {
    const ACCESS_TOKEN = await getAccessToken();

    if (!ACCESS_TOKEN) {
        throw new Error("Missing ACCESS TOKEN");
    }

    const spotifyFetch = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=15",
        {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        }
    );
    let spotifyJson;
    try {
        spotifyJson = await spotifyFetch.json();
        spotifyJson.items = spotifyJson.items.map((item: any) => {
            item.played_ago = formatDistanceToNowStrict(
                parseISO(item.played_at),
                {
                    addSuffix: true,
                }
            );
            return item;
        });
    } catch {
        throw new Error("Failed to parse req");
    }

    let urls: { [key: string]: Promise<string> } = {};

    spotifyJson.items.forEach((item: any) => {
        if (urls[item.track.album.images?.[0]?.url] == undefined) {
            urls[item.track.album.images?.[0]?.url] = getPlaiceholder(
                item.track.album.images?.[0]?.url
            ).then(({ base64 }) => base64);
        }
    });

    for (let i = 0; i < spotifyJson.items.length; i++) {
        spotifyJson.items[i].base64 =
            (await urls[spotifyJson.items[i].track.album.images?.[0]?.url]) ??
            "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAMUlEQVR4nGJJSa9ioCVgoqnpoxaMWjBqwagFoxaMWjBqwagFoxaMWjBqARUBIAAA//8XfwGIp+VBawAAAABJRU5ErkJggg==";
    }

    return spotifyJson;
};

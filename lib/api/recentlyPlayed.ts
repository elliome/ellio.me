import { formatDistanceToNowStrict, parseISO } from "date-fns";
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

    return spotifyJson;
};

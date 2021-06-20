import { getAccessToken } from "../../../lib/api/spotifyAuth";

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
    return await spotifyFetch.json();
};

export const getTop = async () => {
    const response = {
        artists: await top("artists"),
        tracks: await top("tracks"),
    };
    console.log(response.artists.items[0]);
    return response;
};

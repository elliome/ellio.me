import type { NextApiRequest, NextApiResponse } from "next";
import { getRecentlyPLayed } from "../../../lib/api/recentlyPlayed";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const spotifyJson = await getRecentlyPLayed();

    if (!spotifyJson) {
        res.status(500).send("");
        return;
    }

    res.status(200).json(spotifyJson);
};

export default handler;

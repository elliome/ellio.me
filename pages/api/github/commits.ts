import { NextApiRequest, NextApiResponse } from "next";
import { getCommits } from "../../../lib/api/getGithubCommits";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.status(404).send("Invalid Method");
        return;
    }
    let data: Array<{
        value: number;
        x: number;
        y: number;
        date: string;
        index: number;
    }> = [];

    try {
        data = await getCommits();
    } catch {
        res.status(500).send("oops");
        return;
    }

    res.send(data);
    return;
};

export default handler;

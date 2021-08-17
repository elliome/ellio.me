import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
        typeof supabaseUrl !== "string" ||
        typeof supabaseServiceKey !== "string" ||
        typeof req.body.level !== "number"
    ) {
        throw Error();
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    await supabase.from("stats").insert([
        { label: "battery", value: req.body.level },
        { label: "charging", value: req.body.charging ? 1 : 0 },
    ]);

    res.json(req.body);
};

export default handler;

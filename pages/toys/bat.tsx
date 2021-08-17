import { useEffect, useState } from "react";
import { supabase } from "../../lib/supa/client";

const Bat = () => {
    const [data, setData] = useState<any>();

    const getStats = async () => {
        let stats = await supabase
            .from("stats")
            .select("*")
            .then((a) => a.data);

        setData(stats);
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div>
            hi<div onClick={() => getStats()}>get stats</div>
        </div>
    );
};
export default Bat;

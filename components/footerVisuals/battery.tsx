import styles from "../../styles/components/footerVisual/battery.module.scss";
import { supabase } from "../../lib/supa/client";
import { useEffect, useState } from "react";

const Battery = () => {
    const [battery, setBattery] = useState<any>();
    const [charging, setCharging] = useState<any>();

    const getStats = async () => {
        let bat = await supabase
            .from("stats")
            .select("*")
            .match({ label: "battery" })
            .order("id", { ascending: false })
            .limit(1)
            .single()
            .then((a) => a.data);
        let char = await supabase
            .from("stats")
            .select("*")
            .match({ label: "charging" })
            .order("id", { ascending: false })
            .limit(1)
            .single()
            .then((a) => a.data);

        setBattery(bat);
        setCharging(char);
    };

    useEffect(() => {
        getStats();
    }, []);

    if (
        typeof battery?.value != "number" ||
        typeof charging?.value != "number"
    ) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div
                className={`${styles.inside} ${
                    battery.value < 20 ? styles.insideLow : ""
                } ${charging.value == 1 ? styles.insideCharging : ""}`}
                style={{ width: `${battery.value}%` }}></div>
            <div className={styles.bump}></div>
        </div>
    );
};

export default Battery;

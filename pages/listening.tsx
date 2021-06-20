import useFetcher from "../hooks/DataFetching";

import styles from "../styles/pages/Listening.module.scss";

import Image from "../components/Image";
import { useEffect, useState } from "react";

const Listening = () => {
    const { data: currentlyPlaying, mutate: mutateCurrentlyPlaying } =
        useFetcher("/api/spotify/playing");
    const { data: recentlyPlayed, mutate: mutatedPlayed } = useFetcher(
        "/api/spotify/recentlyPlayed",
        null,
        0
    );

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (currentlyPlaying?.progress_ms == null) {
            return;
        }

        setProgress(currentlyPlaying.progress_ms);
    }, [currentlyPlaying]);

    useEffect(() => {
        const intervalSpeed = 100;
        const interval = setInterval(() => {
            let tempProg = 0;
            setProgress((p) => {
                tempProg = p + 100;
                return tempProg;
            });
        }, intervalSpeed);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(progress / currentlyPlaying?.item?.duration_ms);
        if (progress >= currentlyPlaying?.item?.duration_ms) {
            console.log("refresh cos clever");
            setProgress(0);
            mutateCurrentlyPlaying();
            mutatedPlayed();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress]);

    return (
        <div className={styles.container}>
            <h1>What I{"'"}m listening to at the moment</h1>
            <div className={styles.nowPlaying}>
                <div className={styles.blurBG}></div>
                {currentlyPlaying?.item?.album?.images?.[0]?.url ? (
                    <div className={styles.imageBG}>
                        <Image
                            src={
                                currentlyPlaying?.item?.album?.images?.[2]?.url
                            }
                            layout="fill"
                            alt={""}
                            unoptimized={true}
                        />
                    </div>
                ) : (
                    false
                )}
                <div className={styles.image}>
                    {currentlyPlaying?.item?.album?.images?.[0]?.url ? (
                        <Image
                            src={
                                currentlyPlaying?.item?.album?.images?.[1]?.url
                            }
                            width={150}
                            height={150}
                            alt={""}
                            unoptimized={true}
                        />
                    ) : (
                        false
                    )}
                </div>
                <div className={styles.details}>
                    <div className={styles.label}>Now playing</div>
                    <div className={styles.songInfo}>
                        <span className={styles.song}>
                            {currentlyPlaying?.item?.name}
                        </span>
                        <div>
                            <span className={styles.artist}>
                                {currentlyPlaying?.item?.artists?.[0]?.name}
                            </span>
                            {" - "}
                            <span className={styles.album}>
                                {currentlyPlaying?.item?.album?.name}
                            </span>
                        </div>
                    </div>
                    <div className={styles.bar}>
                        <div
                            className={styles.progress}
                            style={{
                                width: `${
                                    (progress /
                                        currentlyPlaying?.item?.duration_ms) *
                                    100
                                }%`,
                            }}></div>
                    </div>
                </div>
            </div>
            <div className={styles.recentlyPlayed}>
                <p>Recently Played</p>
                <div className={styles.items}>
                    {recentlyPlayed?.items.map((item: any, index: number) => (
                        <a
                            key={index}
                            href={item?.track?.external_urls?.spotify}
                            className={styles.track}>
                            {item?.track?.album?.images?.[1]?.url && (
                                <div className={styles.trackImage}>
                                    <Image
                                        src={
                                            item?.track?.album?.images?.[1]?.url
                                        }
                                        alt={""}
                                        width={50}
                                        height={50}
                                    />
                                </div>
                            )}
                            <div className={styles.details}>
                                <span>{item?.track?.name}</span>
                                <div className={styles.trackBottomLine}>
                                    <span>
                                        {item?.track?.artists?.[0]?.name}
                                    </span>
                                    {" - "}
                                    <span>{item?.track?.album?.name}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Listening;

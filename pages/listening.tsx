import useFetcher from "../hooks/DataFetching";

import styles from "../styles/pages/Listening.module.scss";

import Image from "../components/Image";

const Listening = () => {
    const { data: currentlyPlaying } = useFetcher("/api/spotify/playing");

    console.log(currentlyPlaying);

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
                                    (currentlyPlaying?.progress_ms /
                                        currentlyPlaying?.item?.duration_ms) *
                                    100
                                }%`,
                            }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Listening;

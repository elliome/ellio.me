import useFetcher from "../hooks/DataFetching";

import styles from "../styles/pages/Listening.module.scss";

import Image from "../components/Image";
import { useEffect, useState } from "react";
import { getRecentlyPLayed } from "../lib/api/recentlyPlayed";
import { getTop } from "../lib/data/listening";

const Listening = (props: Props) => {
    const { data: currentlyPlaying, mutate: mutateCurrentlyPlaying } =
        useFetcher("/api/spotify/playing");

    const { data: recentlyPlayed, mutate: mutatedPlayed } = useFetcher(
        "/api/spotify/recentlyPlayed",
        props.recentlyPlayed,
        0
    );

    const [playing, setPlaying] = useState<Playing>(null);

    type Playing = {
        albumArt: string;
        name: string;
        isPaused: Boolean;
        albumName: string;
        artist: string;
        progress: number;
        base64: string;
    } | null;

    useEffect(() => {
        if (!currentlyPlaying) {
            if (recentlyPlayed) {
                const recent = recentlyPlayed.items?.shift();
                setPlaying({
                    albumArt: recent?.track?.album?.images?.[0]?.url,
                    albumName: recent?.track?.album?.name,
                    artist: recent?.track?.artists?.[0]?.name,
                    name: recent?.track?.name,
                    isPaused: true,
                    progress: -1,
                    base64: recent?.base64,
                });
            }
        } else {
            setPlaying({
                albumArt: currentlyPlaying?.item?.album?.images?.[0]?.url,
                albumName: currentlyPlaying?.item?.album?.name,
                artist: currentlyPlaying?.item?.artists?.[0]?.name,
                name: currentlyPlaying?.item?.name,
                isPaused: !currentlyPlaying?.is_playing,
                progress: currentlyPlaying.progress_ms,
                base64: currentlyPlaying?.base64,
            });
        }
    }, [currentlyPlaying, recentlyPlayed]);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (currentlyPlaying?.progress_ms == null) {
            return;
        }
        mutatedPlayed();
        setProgress(currentlyPlaying.progress_ms);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentlyPlaying, recentlyPlayed]);

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
        if (progress == null || currentlyPlaying?.item?.duration_ms == null)
            return;

        if (playing?.progress == -1) return;

        if (progress >= currentlyPlaying?.item?.duration_ms) {
            setProgress(0);
            mutateCurrentlyPlaying();
            mutatedPlayed();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress]);

    return (
        <div className={styles.container}>
            <h1>What I{"'"}m listening to at the moment</h1>
            {playing && (
                <div className={styles.nowPlaying}>
                    <div className={styles.blurBG}></div>
                    {playing.albumArt ? (
                        <div className={styles.imageBG}>
                            <Image
                                src={playing.albumArt}
                                layout="fill"
                                alt={""}
                                // unoptimized={true}
                                placeholder="blur"
                                blurDataURL={playing?.base64}
                                key={playing.albumArt}
                            />
                        </div>
                    ) : (
                        false
                    )}
                    <div className={styles.image}>
                        {playing.albumArt ? (
                            <Image
                                src={playing.albumArt}
                                width={150}
                                height={150}
                                alt={""}
                                // unoptimized={true}
                                placeholder="blur"
                                blurDataURL={playing?.base64}
                                key={playing.albumArt}
                            />
                        ) : (
                            false
                        )}
                    </div>
                    <div className={styles.details}>
                        {!playing?.isPaused ? (
                            <div className={styles.label}>Now playing</div>
                        ) : (
                            <div className={styles.label}>Paused</div>
                        )}
                        <div className={styles.songInfo}>
                            <span className={styles.song}>{playing.name}</span>
                            <div>
                                <span className={styles.artist}>
                                    {playing.artist}
                                </span>
                                {" - "}
                                <span className={styles.album}>
                                    {playing.albumName}
                                </span>
                            </div>
                        </div>
                        {!playing?.isPaused && (
                            <div className={styles.bar}>
                                <div
                                    className={styles.progress}
                                    style={{
                                        width: `${
                                            (progress /
                                                currentlyPlaying?.item
                                                    ?.duration_ms) *
                                            100
                                        }%`,
                                    }}></div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className={styles.recentlyPlayed}>
                <p className={styles.heading}>Recently played</p>
                <div className={styles.items}>
                    {recentlyPlayed?.items &&
                        recentlyPlayed?.items.map(
                            (item: any, index: number) => (
                                <a
                                    key={item.played_at}
                                    href={item?.track?.external_urls?.spotify}
                                    className={styles.track}>
                                    {item?.track?.album?.images?.[0]?.url && (
                                        <div className={styles.trackImage}>
                                            <Image
                                                src={
                                                    item?.track?.album
                                                        ?.images?.[0]?.url
                                                }
                                                placeholder="blur"
                                                blurDataURL={item?.base64}
                                                alt={""}
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    )}
                                    <div className={styles.details}>
                                        <span className={styles.topLine}>
                                            {item?.track?.name}
                                            <span className={styles.timeAgo}>
                                                {item?.played_ago ?? ""}
                                            </span>
                                        </span>
                                        <div className={styles.trackBottomLine}>
                                            <span>
                                                {
                                                    item?.track?.artists?.[0]
                                                        ?.name
                                                }
                                            </span>
                                            {" - "}
                                            <span>
                                                {item?.track?.album?.name}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            )
                        )}
                </div>
            </div>
            <div className={styles.top}>
                <p className={styles.heading}>
                    Top Tracks <span>(Last 4 weeks)</span>
                </p>
                <div className={styles.items}>
                    {props.top.tracks.items.map((item: any) => (
                        <a
                            key={item.id}
                            href={item?.external_urls?.spotify}
                            className={styles.item}>
                            <div className={styles.image}>
                                <Image
                                    src={`${
                                        item?.album?.images?.[0]?.url ?? "/"
                                    }`}
                                    layout="fill"
                                    alt={`Photo of album art for the song ${item?.name}`}
                                    placeholder={"blur"}
                                    blurDataURL={item.base64}
                                />
                            </div>
                            <p className={styles.trackName}>{item?.name}</p>
                            <p className={styles.bottomLine}>
                                <span className={styles.artistsName}>
                                    {item?.artists?.[0]?.name}
                                </span>
                                {" - "}
                                <span className={styles.albumName}>
                                    {item?.album.name}
                                </span>
                            </p>
                        </a>
                    ))}
                </div>
            </div>
            <div className={styles.top}>
                <p className={styles.heading}>
                    Top Artists <span>(Last 4 weeks)</span>
                </p>
                <div className={styles.items}>
                    {props.top.artists.items.map((item: any) => (
                        <a
                            key={item.id}
                            href={item?.external_urls?.spotify}
                            className={styles.item}>
                            <div className={styles.image}>
                                <Image
                                    src={`${item?.images?.[0]?.url ?? "/"}`}
                                    layout="fill"
                                    alt={`Photo of album art for the song ${item?.name}`}
                                    placeholder={"blur"}
                                    blurDataURL={item.base64}
                                />
                            </div>
                            <p className={styles.topArtistName}>{item?.name}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Listening;

type Props = {
    recentlyPlayed: any;
    top: { artists: any; tracks: any };
};

export const getStaticProps = async () => {
    const props: Props = {
        recentlyPlayed: await getRecentlyPLayed(),
        top: await getTop(),
    };

    return {
        props,
    };
};

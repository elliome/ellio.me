import Link from "next/link";
import useFetcher from "../hooks/DataFetching";
import styles from "../styles/components/Footer.module.scss";
import Image from "./Image";

const Footer = () => {
    const { data: currentlyPlaying, mutate: mutateCurrentlyPlaying } =
        useFetcher("/api/spotify/playing");

    return (
        <div className={styles.container}>
            {currentlyPlaying?.item?.name ? (
                <Link href={"/listening"}>
                    <a className={`${styles.nowPlaying} ${styles.section}`}>
                        {currentlyPlaying?.is_playing ? (
                            <div
                                className={`${styles.nowPlaying} ${styles.section}`}>
                                <div
                                    className={styles.nowPlayingImageContainer}>
                                    <Image
                                        src={
                                            currentlyPlaying?.item?.album
                                                ?.images?.[2]?.url
                                        }
                                        height={20}
                                        width={20}
                                        placeholder="blur"
                                        blurDataURL={currentlyPlaying.base64}
                                        key={
                                            currentlyPlaying?.item?.album
                                                ?.images?.[2]?.url
                                        }
                                        alt=""
                                    />
                                </div>
                                <span>{currentlyPlaying?.item?.name}</span>
                            </div>
                        ) : (
                            <div className={styles.section}>
                                Paused: {currentlyPlaying?.item?.name}
                            </div>
                        )}
                    </a>
                </Link>
            ) : (
                <div className={styles.section}>Music</div>
            )}
            <div className={styles.section}>Built with</div>
            <div className={`${styles.section} ${styles.socials}`}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Footer;

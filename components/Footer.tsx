import Link from "next/link";
import useFetcher from "../hooks/DataFetching";
import styles from "../styles/components/Footer.module.scss";
import Image from "./Image";
import Icon from "./Icon";
import Battery from "./footerVisuals/battery";

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
                        )}
                    </a>
                </Link>
            ) : (
                <Link href={"/listening"}>
                    <a className={`${styles.nowPlaying} ${styles.section}`}>
                        <span>Music Paused</span>
                    </a>
                </Link>
            )}
            <div className={`${styles.section} ${styles.madeWith}`}>
                <span>Made with</span>
                <a href="https://nextjs.org">
                    <Icon type="NextJS" size="small" />
                </a>
                <span>{"+"}</span>
                <a href="https://www.typescriptlang.org">
                    <Icon type="TypeScript" size="small" />
                </a>
            </div>
            <div className={`${styles.section} ${styles.socials}`}>
                <a href="https://www.instagram.com/elliotelliot_">
                    <Icon type="Instagram" size="small" />
                </a>
                <a href="www.linkedin.com/in/elliot-emmerson">
                    <Icon type="Linkedin" size="small" />
                </a>

                <a href="https://twitter.com/_elliome">
                    <Icon type="Twitter" size="small" />
                </a>

                <a href="https://github.com/elliome">
                    <Icon type="Github" size="small" />
                </a>
            </div>
            <div className={`${styles.section}`}>
                <Battery />
            </div>
        </div>
    );
};

export default Footer;

import React, { useEffect, useState } from "react";
import useFetcher from "../hooks/DataFetching";
import { GitHubCommits } from "../lib/api/getGithubCommits";
import styles from "../styles/components/GithubContributions.module.scss";
import Image from "./Image";

import { AnimateSharedLayout, motion, AnimatePresence } from "framer-motion";

export interface GithubContributionProps {
    githubUser: any;
    githubCommits: GitHubCommits[];
}

const GithubContributions = (props: GithubContributionProps) => {
    const { data }: { data: GitHubCommits[] | null } = useFetcher(
        "/api/github/commits",
        props.githubCommits ?? []
    );

    const [isActive, setIsActive] = useState<Boolean>(false);
    const [squares, setSquares] = useState<Array<number>>([]);
    const [mouseInCounter, setMouseInCounter] = useState<number>(0);
    const [max, setMax] = useState<number>(0);

    useEffect(() => {
        if (data === null) return;
        // if (mouseInCounter) return;

        setSquares(() => {
            const tempArr: number[] = [];
            data.forEach((day, index) => {
                tempArr[Math.floor(index / (data.length / 12))] = tempArr[
                    Math.floor(index / (data.length / 12))
                ]
                    ? tempArr[Math.floor(index / (data.length / 12))] +
                      day.value
                    : day.value;
            });

            const max = Math.max(...tempArr);
            const normalizedArr = tempArr.map((a) => a / max);
            return normalizedArr;
        });

        setMax(Math.max(...data.map((item) => item.value)));
    }, [data]);

    return (
        <AnimateSharedLayout type="crossfade">
            {data !== null && squares.length != 0 && (
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    onClick={() => setIsActive(true)}
                    layoutId={"githubContainer"}
                    className={styles.container}
                    onMouseEnter={() => setMouseInCounter((c) => c + 1)}
                    onMouseLeave={() => setMouseInCounter((c) => c - 1)}>
                    <motion.div className={styles.headerContainer}>
                        <motion.span
                            style={{
                                minWidth:
                                    mouseInCounter === 0 ? undefined : "0px",
                            }}>
                            GitHub
                        </motion.span>
                        <motion.span>View All</motion.span>
                    </motion.div>
                    <motion.div className={styles.gridContainer}>
                        {squares.map((v, c) => (
                            <motion.div
                                key={c}
                                className={styles.gridRect}
                                style={{
                                    opacity: `${v}`,
                                }}></motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.modalContainer}
                        onClick={() => setIsActive(false)}>
                        <motion.div
                            onClick={() => setIsActive(false)}
                            className={styles.bigGithubContainer}
                            layoutId={"githubContainer"}>
                            {/* <motion.h3 className={styles.heading}>
                            Github Contributions 2020 - 2021
                        </motion.h3> */}
                            {/* <motion.p className={styles.para}>
                            Here is a breakdown of my Github account:
                        </motion.p> */}

                            {/* <motion.span>Pinned Repos:</motion.span> */}
                            {props.githubUser && (
                                <motion.div className={styles.profile}>
                                    <Image
                                        src={props.githubUser.avatar_url}
                                        height={100}
                                        width={100}
                                        alt=""></Image>
                                    <motion.div>
                                        <motion.p className={styles.name}>
                                            Elliot Emmerson
                                        </motion.p>
                                        <motion.p className={styles.username}>
                                            elliome
                                        </motion.p>
                                        <motion.div className={styles.follow}>
                                            <motion.span>
                                                <motion.span
                                                    className={
                                                        styles.followCount
                                                    }>
                                                    2
                                                </motion.span>
                                                Followers
                                            </motion.span>
                                            <motion.span>
                                                <motion.span
                                                    className={
                                                        styles.followCount
                                                    }>
                                                    2
                                                </motion.span>
                                                Following
                                            </motion.span>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            )}
                            <motion.div
                                className={styles.gridContainer}
                                initial="hidden"
                                animate="show">
                                {data !== null &&
                                    data.map((v, c) => (
                                        <motion.div
                                            key={c}
                                            className={styles.gridRect}>
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    opacity:
                                                        v.value == 0
                                                            ? 0
                                                            : (v.value / max) *
                                                                  0.5 +
                                                              0.5,
                                                }}
                                                transition={{
                                                    delay: c * 0.005,
                                                    duration: 0.5,
                                                }}></motion.div>
                                        </motion.div>
                                    ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AnimateSharedLayout>
    );
};

export default GithubContributions;

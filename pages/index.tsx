import { useEffect, useState } from "react";

import Image from "../components/Image";
import PageData from "../components/PageData";
import GithubContributions from "../components/GitHubContributions";

import styles from "../styles/pages/Index.module.scss";

import ReactGol from "react-gol";

import ProfileSource from "../public/images/profile.jpg";

import { useIsServer } from "../hooks/useIsServer";
import { GetStaticProps } from "next";
import { getCommits, GitHubCommits } from "../lib/api/getGithubCommits";

export interface IndexProps {
    githubUser: any;
    githubCommits: GitHubCommits[];
}

const Index = (props: IndexProps) => {
    const [color, setColor] = useState<"235, 235, 235" | "40, 40, 40">();

    const handleChange = (e: MediaQueryListEvent) => {
        const darkModeOn = e.matches;
        if (darkModeOn) {
            setColor("40, 40, 40");
        } else {
            setColor("235, 235, 235");
        }
    };

    useEffect(() => {
        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        mql.addEventListener("change", handleChange);
        setColor(
            getComputedStyle(document.body).getPropertyValue("--color-2") as
                | "235, 235, 235"
                | "40, 40, 40"
        );
        return () => {
            mql.removeEventListener("change", handleChange);
        };
    }, []);

    return (
        <div className={styles.container}>
            <PageData />
            <div className={styles.bg}>
                {!useIsServer() && (
                    <ReactGol fillStyle={`rgb(${color})`} minFrameTime={50} />
                )}
            </div>
            <div className={styles.centerContainer}>
                <div className={styles.centerImageContainer}>
                    <Image
                        src={ProfileSource}
                        width={200 / 1.5}
                        height={373 / 1.5}
                        alt={"Photo of me"}
                        placeholder={"blur"}
                    />
                </div>
                <div className={styles.textContainer}>
                    <h1>{"Hi, I'm Elliot"}</h1>
                    <p>
                        Welcome to my website! The purpose of this site is to
                        serve as a portfolio of my work. I am currently
                        freelancing as a fullstack webdeveloper.
                    </p>
                    <GithubContributions
                        githubUser={props.githubUser}
                        githubCommits={props.githubCommits}
                    />
                </div>
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
    const githubUser = await fetch("https://api.github.com/users/elliome").then(
        (res) => res.json()
    );

    const githubCommits = await getCommits();

    return { props: { githubUser, githubCommits } };
};

export default Index;

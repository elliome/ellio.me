import Head from "next/head";
import Image from "../components/Image";
import styles from "../styles/pages/Index.module.scss";
import ReactGol from "react-gol";

import ProfileSource from "../public/images/profile.jpg";
import PageData from "../components/PageData";
import { useIsServer } from "../hooks/useIsServer";
import { ChangeEventHandler, useEffect, useState } from "react";

const Index = () => {
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
                <Image
                    src={ProfileSource}
                    width={200 / 1.5}
                    height={373 / 1.5}
                    alt={"Photo of me"}
                    placeholder={"blur"}
                />
                <div className={styles.textContainer}>
                    <h1>{"Hi, I'm Elliot"}</h1>
                    <p>
                        Welcome to my website! The purpose of this site is to
                        serve as a portfolio of my work. I am currently
                        freelancing as a fullstack webdeveloper.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Index;

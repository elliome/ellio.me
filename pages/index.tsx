import Head from "next/head";
import Image from "../components/Image";
import styles from "../styles/pages/Index.module.scss";
import ReactGol from "react-gol";

import ProfileSource from "../public/images/profile.jpg";

const Index = () => {
    return (
        <div className={styles.container}>
            <div className={styles.bg}>
                <ReactGol fillStyle={"rgb(245, 245, 245)"} minFrameTime={50} />
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

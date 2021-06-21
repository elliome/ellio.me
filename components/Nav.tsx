import styles from "../styles/components/Nav.module.scss";

import Link from "next/link";
import { useState } from "react";
import Burger from "./Burger";
import Cross from "./Cross";

const Nav = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className={styles.container}>
            <div className={styles.sections}>
                <Link href={"/"}>
                    <a>
                        <div className={styles.section}>Elliot Emmerson</div>
                    </a>
                </Link>
                <div
                    className={styles.burger}
                    onClick={() => setIsActive((a) => true)}>
                    <Burger isHidden={isActive} />
                </div>
                <nav
                    className={`${styles.section} ${styles.nav} ${
                        isActive ? styles.navActive : ""
                    }`}>
                    <div className={styles.top}>
                        <Link href={"/"}>
                            <a onClick={() => setIsActive(false)}>
                                <div>Elliot Emmerson</div>
                            </a>
                        </Link>
                        <div onClick={() => setIsActive(false)}>
                            <Cross />
                        </div>
                    </div>
                    {/* <button>Blog</button> */}
                    <Link href={"/projects"}>
                        <a onClick={() => setIsActive(false)}>
                            <button>Projects</button>
                        </a>
                    </Link>
                    <Link href={"/listening"}>
                        <a onClick={() => setIsActive(false)}>
                            <button>Music</button>
                        </a>
                    </Link>
                    {/* <button>Tools</button> */}
                </nav>
            </div>
        </div>
    );
};

export default Nav;

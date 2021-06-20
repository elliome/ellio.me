import styles from "../styles/components/Nav.module.scss";

import Link from "next/link";

const Nav = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sections}>
                <Link href={"/"}>
                    <a>
                        <div className={styles.section}>Elliot Emmerson</div>
                    </a>
                </Link>
                <nav className={`${styles.section} ${styles.nav}`}>
                    <button>Blog</button>
                    <button>Projects</button>
                    <Link href={"/listening"}>
                        <a>
                            <button>Music</button>
                        </a>
                    </Link>
                    <button>Tools</button>
                </nav>
            </div>
        </div>
    );
};

export default Nav;

import styles from "../styles/components/Nav.module.scss";

const Nav = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sections}>
                <div className={styles.section}>Elliot Emmerson</div>
                <nav className={`${styles.section} ${styles.nav}`}>
                    <button>Blog</button>
                    <button>Projects</button>
                    <button>Music</button>
                    <button>Tools</button>
                </nav>
            </div>
        </div>
    );
};

export default Nav;

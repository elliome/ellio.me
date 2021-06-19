import styles from "../styles/components/Footer.module.scss";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.section}>Spotify</div>
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

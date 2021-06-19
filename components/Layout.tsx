import Footer from "./Footer";

import styles from "../styles/components/Layout.module.scss";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    return (
        <div className={styles.container}>
            <div></div>
            <div className={styles.main}>{props.children}</div>
            <Footer />
        </div>
    );
};

export default Layout;

import Footer from "./Footer";
import Nav from "./Nav";

import styles from "../styles/components/Layout.module.scss";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    return (
        <div className={styles.container}>
            <Nav />
            <div className={styles.main}>{props.children}</div>
            <Footer />
        </div>
    );
};

export default Layout;

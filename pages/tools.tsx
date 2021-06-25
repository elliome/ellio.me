import styles from "../styles/pages/ListPage.module.scss";

import List from "../components/List";
import Image from "../components/Image";
import { getTools } from "../lib/data/tools";

export type Tool = { name: string; body: string; image: string };

type Props = { tools: Array<Tool> };

const Tools = (props: Props) => {
    return (
        <div className={styles.container}>
            <h1>Here are the tools I use</h1>

            <List
                items={props.tools.map((c, i) => (
                    <div className={styles.itemContainer} key={i}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={c.image}
                                height={100}
                                width={100}
                                alt=""
                            />
                        </div>
                        <div>
                            <span>{c.name}</span>
                            <p>{c.body}</p>
                        </div>
                    </div>
                ))}
                columns={2}
            />
        </div>
    );
};

export const getStaticProps = async () => {
    const tools = await getTools();

    const props: Props = { tools };

    return { props };
};

export default Tools;

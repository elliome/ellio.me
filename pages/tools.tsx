import styles from "../styles/pages/ListPage.module.scss";

import List from "../components/List";
import Image from "../components/Image";
import { getTools } from "../lib/data/tools";
import React from "react";
import PageData from "../components/PageData";

export type Tool = {
    name: string;
    body: string;
    image: string;
    bg: Array<number>;
    url: string;
};

type Props = { tools: Array<Tool> };

const Tools = (props: Props) => {
    return (
        <div className={styles.container}>
            <PageData
                page="Tools"
                url="https://ellio.me/tools"
                desc="A list of tools I use."
            />
            <h1>These are the tools I use</h1>

            <List
                items={props.tools.map((c, i) => (
                    <a href={c.url} className={styles.itemContainer} key={i}>
                        <div
                            className={styles.imageContainer}
                            style={{ "--generated-color": c.bg } as any}>
                            <Image
                                src={c.image}
                                height={50}
                                width={50}
                                alt=""
                            />
                        </div>
                        <div>
                            <span className={styles.label}>{c.name}</span>
                            <p className={styles.body}>{c.body}</p>
                        </div>
                    </a>
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

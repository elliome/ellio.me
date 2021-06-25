import { ComponentProps } from "react";
import styles from "../styles/components/List.module.scss";

type Item = any;

type Props = {
    items: Array<Item>;
    columns: number;
};

const List = (props: Props) => {
    const rows: Array<Array<Item>> = [];

    props.items.forEach((item: Item) => {
        if (rows[rows.length - 1]?.length < props.columns) {
            rows[rows.length - 1].push(item);
        } else {
            rows.push([item]);
        }
    });

    return (
        <div className={styles.container}>
            {rows.map((row, key) => (
                <div className={styles.row} key={key}>
                    {row.map((I, key) => (
                        <ListItem key={key}>{I}</ListItem>
                    ))}
                </div>
            ))}
        </div>
    );
};

type ItemProps = { children: Item };

const ListItem = (props: ItemProps) => {
    return <div className={styles.ListItemContainer}>{props.children}</div>;
};

export default List;

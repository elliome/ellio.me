import styles from "../../styles/components/Project.module.scss";
import img from "../../public/projects/hytaleguide/image.png";
import Image from "../../components/Image";

export type ProjectProps = { name: string };

const Project = (props: ProjectProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image
                    src={img}
                    placeholder={"blur"}
                    layout="responsive"
                    alt=""
                />
                <div className={styles.tags}>
                    <Tag tag="JavaScript" />
                    <Tag tag="React" />
                    <Tag tag="NextJS" />
                    <Tag tag="Strapi" />
                    <Tag tag="NodeJS" />
                </div>
            </div>
            <div className={styles.desc}>
                <h2 className={styles.title}>HytaleGuide</h2>
                <p className={styles.body}>
                    Hytale Guide is the biggest project i have worked on. It
                    aims to provide a place to document specific aspects of the
                    game {"'"}Hytale{"'"}. It{"'"}s a wiki type website with
                    over a 2000 active users.
                </p>
                <Button></Button>
            </div>
        </div>
    );
};

const Tag = (props: {
    tag:
        | "TypeScript"
        | "JavaScript"
        | "React"
        | "NextJS"
        | "PHP"
        | "Strapi"
        | "NodeJS"
        | "Python";
}) => {
    return <div className={styles.tag}>{props.tag}</div>;
};

const Button = () => {
    return <div className={styles.button}>View Website</div>;
};

export default Project;

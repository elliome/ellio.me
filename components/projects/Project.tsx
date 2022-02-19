import styles from "../../styles/components/Project.module.scss";
import Image from "../../components/Image";
import ReactMarkdown from "react-markdown";
import GitHubLogo from "../../public/icons/GitHub-Mark-Light.png";

export type ProjectProps = {
    name: string;
    body: string;
    image: string;
    url: string | null;
    tags: Array<Tag>;
    base64: string;
    github?: string;
};

type Tag =
    | "TypeScript"
    | "JavaScript"
    | "React"
    | "NextJS"
    | "PHP"
    | "Strapi"
    | "NodeJS"
    | "Python";

const Project = (props: ProjectProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image
                    src={props.image}
                    width={1920 * 0.5}
                    height={1080 * 0.5}
                    placeholder={"blur"}
                    blurDataURL={props.base64}
                    alt=""
                    quality={100}
                />
                <div className={styles.tags}>
                    {props.tags.map((tag) => (
                        <Tag key={tag} tag={tag} />
                    ))}
                </div>
            </div>
            <div className={styles.desc}>
                {props.url ? (
                    <a href={props.url}>
                        <h2 className={styles.title}>{props.name}</h2>
                        <span className={styles.url}>{props.url}</span>
                    </a>
                ) : (
                    <h2 className={styles.title}>{props.name}</h2>
                )}

                <div className={styles.bodyContainer}>
                    <div className={styles.body}>
                        <ReactMarkdown>{props.body}</ReactMarkdown>
                    </div>
                </div>
                <div className={styles.buttons}>
                    {props.url && (
                        <Button externalLink={props.url}>Visit Website</Button>
                    )}
                    {props.github && (
                        <Button
                            externalLink={props.github}
                            github={true}></Button>
                    )}
                </div>
            </div>
        </div>
    );
};

const Tag = (props: { tag: Tag }) => {
    return <div className={styles.tag}>{props.tag}</div>;
};

type ButtonProps = {
    externalLink?: string;
    github?: Boolean;
    children?: string;
};

const Button = (props: ButtonProps) => {
    if (props.externalLink) {
        if (props.github) {
            return (
                <a href={props.externalLink}>
                    <div className={`${styles.button} ${styles.github}`}>
                        <Image src={GitHubLogo} height={20} width={20} alt="" />
                        {"View on Github"}
                    </div>
                </a>
            );
        }

        return (
            <a href={props.externalLink}>
                <div className={styles.button}>{props.children}</div>
            </a>
        );
    }

    return <div className={styles.button}>{props.children}</div>;
};

export default Project;

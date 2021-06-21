import Project, { ProjectProps } from "../components/projects/Project";
import styles from "../styles/pages/Projects.module.scss";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllProjects } from "../lib/data/md";

type Props = {
    projects: Array<ProjectProps>;
};

const Projects = (props: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.projects}>
                {props.projects.map((project) => (
                    <Project key={project.name} {...project} />
                ))}
            </div>
        </div>
    );
};

export const getStaticProps = async () => {
    console.log(await getAllProjects());

    const props: Props = {
        projects: [{ name: "hytaleguide" }],
    };

    return { props };
};

export default Projects;

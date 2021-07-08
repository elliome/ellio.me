import Project, { ProjectProps } from "../components/projects/Project";
import styles from "../styles/pages/Projects.module.scss";
import { getAllProjects } from "../lib/data/md";
import React from "react";
import PageData from "../components/PageData";

type Props = {
    projects: Array<ProjectProps>;
};

const Projects = (props: Props) => {
    return (
        <div className={styles.container}>
            <PageData
                page="Projects"
                url="https://ellio.me/projects"
                desc="A list of the projects i've worked on."
            />
            <div className={styles.projects}>
                {props.projects.map((project) => (
                    <Project key={project.name} {...project} />
                ))}
            </div>
        </div>
    );
};

export const getStaticProps = async () => {
    console.log();

    const props: Props = {
        projects: await getAllProjects(),
    };

    return { props };
};

export default Projects;

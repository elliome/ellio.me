import path from "path";
import fs from "fs";
import { ProjectProps } from "../../components/projects/Project";

export const getAllProjects = () => {
    const projectsDir = path.join(process.cwd(), "public/projects");
    const fileNames = fs.readdirSync(projectsDir);
    const projects: Array<ProjectProps> = [];
    const allPostsData = fileNames.forEach((fileName) => {
        if (fileName.startsWith(".")) return;

        const dataPath = path.join(projectsDir, path.join(fileName, "data.md"));
        const fileContents = fs.readFileSync(dataPath, "utf8");
        console.log(fileContents);
    });
    return projects;
};

export const getMd = () => {
    return "h";
};

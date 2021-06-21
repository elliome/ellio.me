import path from "path";
import fs from "fs";
import { ProjectProps } from "../../components/projects/Project";
import matter from "gray-matter";
import { getPlaiceholder } from "plaiceholder";

const projectsDir = path.join(process.cwd(), "public/projects");

export const getAllProjectsNames = () => {
    const fileNames = fs.readdirSync(projectsDir);
    return fileNames;
};

export const getAllProjects = async () => {
    const fileNames = getAllProjectsNames();
    const projects: Array<ProjectProps> = [];
    for (const fileName of fileNames) {
        if (fileName.startsWith(".")) continue;
        console.log(fileName);

        const dataPath = path.join(projectsDir, path.join(fileName, "data.md"));
        const fileContents = fs.readFileSync(dataPath, "utf8");

        const matterResult = matter(fileContents);

        projects.push({
            name: matterResult.data.name ?? "NAME IS MISSING",
            body: matterResult.content ?? "BODY IS MISSING",
            url: matterResult.data.url ?? null,
            image: `/projects/${fileName}/image.png`,
            base64: await getPlaiceholder(
                `/projects/${fileName}/image.png`
            ).then(({ base64 }) => base64),
            tags: matterResult.data.tags ?? [],
            github: matterResult.data.github ?? null,
        });
    }

    return projects;
};

export const getMd = () => {
    return "h";
};

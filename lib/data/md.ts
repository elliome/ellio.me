import path from "path";
import fs from "fs";
import { ProjectProps } from "../../components/projects/Project";
import matter from "gray-matter";
import { getPlaiceholder } from "plaiceholder";

export const getContentsOfPublicFolder = (folderName: string) => {
    const publicDir = path.join(process.cwd(), "public");
    const selectedDir = path.join(publicDir, folderName);
    const fileNames = fs.readdirSync(selectedDir);
    return fileNames;
};

export const matterFolder = async (
    folderName: string
): Promise<
    Array<{ matterResult: matter.GrayMatterFile<string>; fileName: string }>
> => {
    const response: Array<{
        matterResult: matter.GrayMatterFile<string>;
        fileName: string;
    }> = [];
    const publicDir = path.join(process.cwd(), "public");
    const currentDir = path.join(publicDir, folderName);

    const fileNames = getContentsOfPublicFolder(folderName);

    for (const fileName of fileNames) {
        if (fileName.startsWith(".")) continue;

        const dataPath = path.join(currentDir, path.join(fileName, "data.md"));
        const fileContents = fs.readFileSync(dataPath, "utf8");

        const matterResult = matter(fileContents);
        response.push({ matterResult, fileName });
    }
    return response;
};

export const getAllProjects = async () => {
    const projects: Array<ProjectProps> = [];
    const data = await matterFolder("projects");

    for (const item of data) {
        projects.push({
            name: item.matterResult.data.name ?? "NAME IS MISSING",
            body: item.matterResult.content ?? "BODY IS MISSING",
            url: item.matterResult.data.url ?? null,
            image: `/projects/${item.fileName}/image.png`,
            base64: await getPlaiceholder(
                `/projects/${item.fileName}/image.png`
            ).then(({ base64 }) => base64),
            tags: item.matterResult.data.tags ?? [],
            github: item.matterResult.data.github ?? null,
        });
    }

    return projects;
};

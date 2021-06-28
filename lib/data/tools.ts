import { Tool } from "../../pages/tools";
import { matterFolder } from "./md";
import Vibrant from "node-vibrant";
import path from "path";
import { getColorFromImage } from "../helpers/color";

export const getTools = async (): Promise<Array<Tool>> => {
    const tools: Array<Tool> = [];
    const data = await matterFolder("tools");

    const toolsFolder = path.join(process.cwd(), "public/tools");

    for (const item of data) {
        tools.push({
            name: item.matterResult.data.name ?? "Missing Name",
            body: item.matterResult.content,
            image: `/tools/${item.fileName}/image.png`,
            bg: await getColorFromImage(
                path.join(toolsFolder, `${item.fileName}/image.png`)
            ),
            url: item.matterResult.data.url ?? "/",
        });
    }

    return tools;
};

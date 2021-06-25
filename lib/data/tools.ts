import { Tool } from "../../pages/tools";
import { matterFolder } from "./md";

export const getTools = async (): Promise<Array<Tool>> => {
    const tools: Array<Tool> = [];
    const data = await matterFolder("tools");
    data.forEach((item) => {
        tools.push({
            name: item.matterResult.data.name ?? "Missing Name",
            body: item.matterResult.content,
            image: `/tools/${item.fileName}/image.png`,
        });
    });

    console.log(tools);

    return tools;
};

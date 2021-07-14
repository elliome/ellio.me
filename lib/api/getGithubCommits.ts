import { parse } from "node-html-parser";

export const getCommits = async () => {
    const data: Array<{
        value: number;
        x: number;
        y: number;
        date: string;
        index: number;
    }> = [];

    const graph = await fetch(
        "https://github.com/users/elliome/contributions"
    ).then((res) => res.text());

    const root = parse(graph);

    const elem =
        root.childNodes[1].childNodes[1].childNodes[3].childNodes[1]
            .childNodes[1].childNodes[1];

    for (const childNode of elem.childNodes) {
        if (childNode.nodeType == 1) {
            for (const rect of childNode.childNodes) {
                if (rect.nodeType !== 1 || (rect as any)?.rawTagName != "rect")
                    continue;

                const rawAttrs = (rect as any).rawAttrs as string;
                const jsonAttrs =
                    '{"' +
                    rawAttrs.replace(/ /g, ', "').replace(/=/g, '": ') +
                    "}";

                const objAttrs = JSON.parse(jsonAttrs) as {
                    width: string;
                    height: string;
                    x: string;
                    y: string;
                    class: string;
                    rx: string;
                    ry: string;
                    "data-count": string;
                    "data-date": string;
                    "data-level": string;
                };

                data.push({
                    value: Number(objAttrs["data-count"]),
                    x: Number(objAttrs.x) * -1 + 16,
                    y: Number(objAttrs.y) / 15,
                    date: objAttrs["data-date"],
                    index:
                        (Number(objAttrs.x) * -1 + 16) * 7 +
                        Number(objAttrs.y) / 15,
                });
            }
        }
    }

    return data;
};

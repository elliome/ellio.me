import Vibrant from "node-vibrant";

export const getColorFromImage = async (
    path: string
): Promise<Array<number>> => {
    let rgb = [0, 0, 0];

    try {
        const palette = await Vibrant.from(path).getPalette();

        if (palette.Vibrant) rgb = palette.Vibrant?.rgb;
    } catch (e) {
        console.error(e);
        rgb = [0, 0, 0];
    } finally {
        return rgb;
    }
};

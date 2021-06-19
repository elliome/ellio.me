import NextImage, { ImageProps } from "next/image";
import styles from "../styles/components/Image.module.scss";

type Props = ImageProps & {};

const Image = (props: Props) => {
    return (
        <NextImage
            className={props.className || styles.container}
            {...props}></NextImage>
    );
};

export default Image;

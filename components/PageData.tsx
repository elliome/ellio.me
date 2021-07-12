import Head from "next/head";
import { useIsServer } from "../hooks/useIsServer";

const PageData = (props: { page?: string; desc?: string; url?: string }) => {
    return (
        <Head>
            <title>Elliot Emmerson</title>
            <meta
                name="theme-color"
                content={
                    !useIsServer()
                        ? `rgb(${getComputedStyle(
                              document.body
                          ).getPropertyValue("--color-1")})`
                        : "black"
                }></meta>
            <meta
                property="og:title"
                content={`Elliot Emmerson${
                    props.page ? ` | ${props.page}` : ""
                }`}
                key="title"
            />
            <meta
                property="og:image"
                content="https://ellio.me/og/image.png"
                key="image"
            />
            <meta property="og:image:width" content="1200" key="width" />
            <meta property="og:image:height" content="630" key="height" />
            <meta
                property="og:description"
                content={
                    props.desc ? props.desc : "Welcome to my personal website."
                }
                key="description"
            />
            <meta
                property="og:url"
                content={props.url ? props.url : "https://ellio.me"}
                key="url"
            />
        </Head>
    );
};

export default PageData;

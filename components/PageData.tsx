import Head from "next/head";

const PageData = (props: { page?: string; desc?: string; url?: string }) => {
    return (
        <Head>
            <title>Elliot Emmerson</title>
            <meta
                property="og:title"
                content={`Elliot Emmerson${
                    props.page ? ` | ${props.page}` : ""
                }`}
                key="title"
            />
            <meta property="og:image" content="https://ellio.me/og/image.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta
                property="og:description"
                content={
                    props.desc ? props.desc : "Welcome to my personal website."
                }
            />
            <meta
                property="og:url"
                content={props.url ? props.url : "https://ellio.me"}
            />
        </Head>
    );
};

export default PageData;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../src/components";
import StateContext from "../src/context/StateContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <StateContext>
            <Layout>
                <Toaster />
                <Component {...pageProps} />
            </Layout>
        </StateContext>
    );
}

export default MyApp;

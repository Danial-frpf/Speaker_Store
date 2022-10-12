import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

interface LayoutI {
    children: React.ReactNode;
}

const Layout: NextPage<LayoutI> = ({ children }) => {
    return (
        <div className="layout">
            <Head>
                <title>Head Phone Store</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className="main-container">{children}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;

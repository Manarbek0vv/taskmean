import type { Metadata } from "next";
import { Inter_Tight } from 'next/font/google';
import "./globals.css";
import classes from './layout.module.scss';
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Provider from "@/components/Provider";
import { getServerSession } from "next-auth";


const inter = Inter_Tight({
    subsets: ['cyrillic'],
    weight: ['400', '500', '600', '700']
})


export const metadata: Metadata = {
    title: "TaskMean",
    description: "The comfortable task manager.",
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <Provider>
                    <div className={classes.wrapper}>
                        <Sidebar />
                        <div className={classes.inner}>
                            <Header />
                            {children}
                        </div>
                    </div>
                </Provider>

                <div id="modal" />
            </body>
        </html>
    );
}

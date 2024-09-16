import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { CSSProperties } from "react";
import Sidebar from "./components/Sidebar/Sidebar";

const inter = Inter({
  subsets: ['cyrillic'],
  weight: ['500', '600', '700']
})

export const metadata: Metadata = {
  title: "TaskMean",
  description: "The comfortable task manager.",
};

const wrapperStyle: CSSProperties = {
  width: '100vw',
  height: '100vh',
  backgroundColor: '#f9f9f9',
  position: 'relative',
  display: 'flex',
  gap: '0',
  overflow: 'hidden'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div style={wrapperStyle}>
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "./components/Header/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Valery Fine",
  description: "Collaboration",
  // description: "Your site description",
  themeColor: "#000000",
  appleMobileWebAppStatusBarStyle: "black-translucent",
  appleMobileWebAppCapable: "yes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/faviconpng.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

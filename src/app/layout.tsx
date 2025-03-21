import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ResponsiveAnimatedUnderlineNavbar from "./components/Navbar";
import { MegaMenuProvider } from "./components/MegamenuContext";  // Import MegaMenuProvider
import MegaMenuWithLinks from "./components/Megamenu";  // Import MegaMenu component
import "./globals.css";
import NavbarWithMegaMenu from "./components/NavbarWithMegaMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/*
        <MegaMenuProvider>  
          <ResponsiveAnimatedUnderlineNavbar uniqueId="1" />
          <MegaMenuWithLinks />  
          {children}
        </MegaMenuProvider>
        */}
        <NavbarWithMegaMenu/>
      </body>
    </html>
  );
}

import { EdgeStoreProvider } from "@/app/lib/edgestore";
import type { Metadata } from "next";
import Navbar from "./components/NavBar";
import "./globals.css";

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
      <body>
        <EdgeStoreProvider>
          <Navbar />
          {children}
        </EdgeStoreProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Iván Rodríguez - Fullstack developer",
  description:
    "Portafolio web de Iván Rodríguez, desarrollador fullstack especializado en el stack MongoDB, ExpressJS, React, NodeJS (MERN)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

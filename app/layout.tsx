import type { Metadata } from "next";
import "./globals.css";
import { MusicProvider } from "./util/MusicContext";
import MusicToggle from "./util/MusicToggle";

export const metadata: Metadata = {
  title: "Will You Be My Valentine?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" ></link>
      </head>
      <body>
        <MusicProvider>
          <div className="made-with">Made with ♡ by Doudi</div>
          <MusicToggle />
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}

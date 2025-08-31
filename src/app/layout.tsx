import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import NavMenu from "@/components/NavMenu";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  fallback: ["Arial"]
});

export const metadata: Metadata = {
  title: "Arne Vercruysse",
  description: "Personal website of Arne Vercruysse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} antialiased`}
      >
        <NavMenu />
        <main>{children}</main>
      </body>
    </html>
  );
}

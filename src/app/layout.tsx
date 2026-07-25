import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "@fontsource-variable/archivo/index.css";
import "@fontsource/archivo-black/index.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "CHMK",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  description:
    "İstanbul Teknik Üniversitesi Cevher Hazırlama Mühendisliği Kulübü",
  openGraph: {
    title: "CHMK: Cevher Hazırlama Mühendisliği Kulübü",
    description:
      "İstanbul Teknik Üniversitesi Cevher Hazırlama Mühendisliği Kulübü",
    images: ["/images/hero.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

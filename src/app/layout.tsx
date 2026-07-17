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

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NextAuthProvider from "@/lib/auth/auth-provider";
import Header from "../components/header";
const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "PairCode",
  description: "An application to help pairing with developers online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <Header />
            <NextTopLoader />
            {children}
            <Toaster />
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

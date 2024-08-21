import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProviders from "../components/query-providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Auth from "@/components/auth";
import { Toaster } from "@/components/ui/toaster";
import { appName } from "@/constant";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: appName,
  description:
    "Use this API documentation app for free, no hidden fees or strings attached!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <Auth>
              <Header />
              <main className="min-h-[calc(100vh-64px)] mt-20">
                {children}
                <Toaster />
              </main>
              <Footer />
            </Auth>
          </ThemeProvider>
        </QueryProviders>
      </body>
    </html>
  );
}

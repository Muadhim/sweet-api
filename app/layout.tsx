import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./providers";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sweet API",
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
				<Providers>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange={false}
					>
						<Header />
						<main className="min-h-screen">
							<div className="w-full max-w-[1200px] mx-auto">{children}</div>
						</main>
						<Footer />
					</ThemeProvider>
				</Providers>
			</body>
		</html>
	);
}

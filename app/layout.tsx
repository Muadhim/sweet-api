import type { GetServerSidePropsContext, Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProviders from "../components/query-providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NextAuthProvider from "../components/next-auth-provider";

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
				<QueryProviders>
					<NextAuthProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange={false}
						>
							<Header />
							<main className="min-h-screen mt-20">
								<div className="w-full max-w-[1200px] mx-auto">{children}</div>
							</main>
							<Footer />
						</ThemeProvider>
					</NextAuthProvider>
				</QueryProviders>
			</body>
		</html>
	);
}

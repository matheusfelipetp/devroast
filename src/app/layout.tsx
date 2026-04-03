import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { TRPCReactProvider } from "@/trpc/client";
import "./globals.css";

export const metadata: Metadata = {
	title: "devroast",
	description: "paste your code. get roasted.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="bg-bg-page text-text-primary font-mono">
				<TRPCReactProvider>
					<Navbar />
					<main>{children}</main>
				</TRPCReactProvider>
			</body>
		</html>
	);
}

import Navbar from "./components/navbar";

export default function UserLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<section>
			<Navbar></Navbar>
			{children}
		</section>
	);
}

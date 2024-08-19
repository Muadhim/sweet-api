import Navbar from "./components/navbar";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex gap-3 px-2">
      <Navbar />
      {children}
    </section>
  );
}

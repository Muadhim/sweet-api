import { Card } from "@/components/ui/card";
import Navbar from "./components/navbar";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex gap-3 px-2">
      <Navbar />
      <Card className="w-full h-[calc(100vh-100px)] p-4">{children}</Card>
    </section>
  );
}

"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FolderKanban, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="w-[300px]">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div className="flex items-center justify-between ">
            <AccordionTrigger className="[&>svg.lucide-folder-kanban]:-rotate-0 [&>svg.lucide-chevron-down]:hidden flex gap-3">
              <FolderKanban />
              <h3 className="font-bold text-lg">Projects</h3>
            </AccordionTrigger>
            <Plus
              className="cursor-pointer"
              onClick={() => router.push("/project")}
            />
          </div>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
};

export default Navbar;

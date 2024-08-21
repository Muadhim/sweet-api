"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FolderKanban } from "lucide-react";
import useProjectStore from "@/store/project";
import useProjectHooks from "@/hooks/project/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import CreateProjectDialog from "./createProjectDialog";

const Navbar = () => {
  const projects = useProjectStore((state) => state.projects);
  const { data } = useProjectHooks();
  return (
    <nav className="w-[300px]">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="!border-none">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <FolderKanban />
              <AccordionTrigger className="[&>svg.lucide-folder-kanban]:-rotate-0 [&>svg.lucide-chevron-down]:hidden flex gap-3">
                <h3 className="font-bold text-lg">Projects</h3>
              </AccordionTrigger>
            </div>
            <CreateProjectDialog />
          </div>
          <AccordionContent className="flex flex-col gap-3 pl-5">
            {data.isLoadingProjects && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            )}
            {projects.map((p, i) => (
              <h4
                className="cursor-pointer hover:text-primary font-medium"
                key={i.toString() + p.id.toString()}
              >
                {p.name}
              </h4>
            ))}
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

"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SquareChartGantt } from "lucide-react";
import useProjectStore from "@/store/project";
import { Skeleton } from "@/components/ui/skeleton";
import useGetProjectTreeHooks from "@/hooks/project/getProjectTree";
import ProjectTree from "./projectTree";

const Navbar = () => {
  const project = useProjectStore((state) => state.project);
  const projectTree = useProjectStore((state) => state.projectTree);
  const { isLoading } = useGetProjectTreeHooks();

  return (
    <nav className="w-[300px]">
      <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
        <AccordionItem value="item-1" className="!border-none">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <SquareChartGantt />
              <AccordionTrigger className="[&>svg.lucide-folder-kanban]:-rotate-0 [&>svg.lucide-chevron-down]:hidden flex gap-3">
                <h3 className="font-bold text-lg">
                  {project.name || projectTree.project_name}
                </h3>
              </AccordionTrigger>
            </div>
          </div>
          <AccordionContent className="flex flex-col gap-3 pl-5">
            {isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            )}
            <ProjectTree trees={projectTree.project_tree} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
};

export default Navbar;

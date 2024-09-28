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
import useCreateFolderHooks from "@/hooks/project/createFolder";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const project = useProjectStore((state) => state.project);
  const projectTree = useProjectStore((state) => state.projectTree);
  const { isLoading } = useGetProjectTreeHooks();
  const { handleCreateFolder } = useCreateFolderHooks();
  const projectId = useProjectStore((state) => state.projectId);

  const handleAddFolder = () => {
    handleCreateFolder({
      name: "New Folder",
      project_id: projectId,
      parent_id: null,
    });
  };
  return (
    <nav className="w-fit">
      <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
        <AccordionItem value="item-1" className="!border-none">
          <div className="flex items-center justify-between relative group">
            <div className="flex gap-3 items-center">
              <SquareChartGantt />
              <AccordionTrigger className="[&>svg.lucide-folder-kanban]:-rotate-0 [&>svg.lucide-chevron-down]:hidden flex gap-3">
                <h3 className="font-bold text-lg w-[200px] line-clamp-2 text-left">
                  {project.name || projectTree.project_name}
                </h3>
              </AccordionTrigger>
            </div>
            {/* Hidden button and dot menu */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-2 items-center">
                <Button
                  onClick={() => handleAddFolder()}
                  variant="ghost"
                  className="text-primary rounded font-medium text-xl h-fit w-fit p-0 hover:bg-background"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <AccordionContent className="flex flex-col gap-3 pl-5 w-fit">
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

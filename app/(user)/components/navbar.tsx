"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FolderKanban, Users } from "lucide-react";
import useProjectStore from "@/store/project";
import { Skeleton } from "@/components/ui/skeleton";
import CreateProjectDialog from "./createProjectDialog";
import { useGetProjectsHooks } from "@/hooks/project";
import { useRouter } from "next/navigation";
import useGroupStore from "@/store/group/indext";
import useGetGroupsHooks from "@/hooks/group/getGroups";
import CreateGroupDialog from "./createGroupDialog";

const Navbar = () => {
  const projects = useProjectStore((state) => state.projects);
  const groups = useGroupStore((state) => state.groups);
  const { isLoading: isLoadingProject } = useGetProjectsHooks();
  const { isLoading: isLoadingGroup } = useGetGroupsHooks();
  const router = useRouter();

  return (
    <nav className="w-[300px]">
      <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
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
            {isLoadingProject && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            )}
            {projects.map((p, i) => (
              <h4
                className="cursor-pointer hover:text-primary font-medium"
                key={i.toString() + p.id.toString()}
                onClick={() => router.push(`/project/${p.id}`)}
              >
                {p.name}
              </h4>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="item-2" className="!border-none">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <Users />
              <AccordionTrigger className="[&>svg.lucide-folder-kanban]:-rotate-0 [&>svg.lucide-chevron-down]:hidden flex gap-3">
                <h3 className="font-bold text-lg">Groups</h3>
              </AccordionTrigger>
            </div>
            <CreateGroupDialog />
          </div>
          <AccordionContent className="flex flex-col gap-3 pl-5">
            {isLoadingGroup && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            )}
            {groups.map((g, i) => (
              <h4
                className="cursor-pointer hover:text-primary font-medium"
                key={i.toString() + g.id.toString()}
                onClick={() => router.push(`/group/${g.id}`)}
              >
                {g.name}
              </h4>
            ))}
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </nav>
  );
};

export default Navbar;

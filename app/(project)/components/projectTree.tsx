import { IProjectTree } from "@/interfaces/ProjectTree";
import {
  Folder,
  FolderOpen,
  FolderPen,
  FolderPlus,
  GitPullRequestCreate,
  MoreHorizontal,
  Pen,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
interface Props {
  trees: IProjectTree[];
}
const methodColors = {
  get: "text-green-500",
  post: "text-yellow-500",
  put: "text-blue-500",
  delete: "text-red-400",
};

const ProjectTree: React.FC<Props> = ({ trees }) => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (id: number) => {
    setOpenFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleItemClick = (data: any) => {};
  const renderTree = (tree: IProjectTree[]) => {
    return tree?.map((tr) => (
      <React.Fragment key={tr.id}>
        {tr.type === "folder" ? (
          <>
            <div className="relative group flex items-center gap-2">
              <div
                className="flex items-center gap-2 cursor-pointer "
                onClick={() => toggleFolder(tr.id)}
              >
                {openFolders[tr.id] ? (
                  <FolderOpen className="text-primary" />
                ) : (
                  <Folder className="text-primary" />
                )}

                <p className="line-clamp-2 w-full">{tr.name}</p>
              </div>
              {/* Hidden button and dot menu */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2 items-center">
                  <Button
                    variant="ghost"
                    className="text-primary rounded font-medium text-xl h-fit w-fit p-0 hover:bg-background"
                  >
                    +
                  </Button>

                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal
                        className="text-primary font-thin cursor-pointer text-xs w-5 h-5"
                        onClick={() => handleItemClick(tr)}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] glass flex flex-col">
                      <Button
                        variant="ghost"
                        className="justify-start p-1 h-8 gap-2"
                      >
                        <FolderPlus className="w-4 h-4" /> Create Folder
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start p-1 h-8 gap-2"
                      >
                        <GitPullRequestCreate className="w-4 h-4" /> Create
                        Request
                      </Button>
                      <Separator />
                      <Button
                        variant="ghost"
                        className="justify-start p-1 h-8 gap-2"
                      >
                        <FolderPen className="w-4 h-4" /> Rename Folder
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start p-1 h-8 text-destructive gap-2"
                      >
                        <Trash className="w-4 h-4" /> Delete Folder
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            {openFolders[tr.id] && tr.children && (
              <div className="ml-5">{renderTree(tr.children)}</div>
            )}
          </>
        ) : (
          <div className="flex gap-2 items-center relative group">
            <div className="flex gap-2 cursor-pointer">
              <p className={`${methodColors[tr.method]} font-bold`}>
                {tr.method}
              </p>
              <p className="line-clamp-2 w-full">{tr.name}</p>
            </div>
            {/* Hidden button and dot menu */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal
                    className="text-primary font-thin cursor-pointer text-xs w-5 h-5"
                    onClick={() => handleItemClick(tr)}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-[200px] glass flex flex-col">
                  <Button
                    variant="ghost"
                    className="justify-start p-1 h-8 gap-2"
                  >
                    <Pen className="w-4 h-4" /> Rename Request
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start p-1 h-8 text-destructive gap-2"
                  >
                    <Trash className="w-4 h-4" /> Delete Request
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </React.Fragment>
    ));
  };

  return <div className="ml-3">{renderTree(trees)}</div>;
};

export default ProjectTree;

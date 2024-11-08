import { IProjectTree } from "@/interfaces/ProjectTree";
import {
  Folder,
  FolderOpen,
  FolderPen,
  FolderPlus,
  GitPullRequestCreate,
  MoreHorizontal,
  Pen,
  Plus,
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
import useProjectStore from "@/store/project";
import {
  useCreateApiHooks,
  useCreateFolderHooks,
  useDeleteApiHooks,
  useDeleteFolderHooks,
  useGetApiDetailHooks,
  useUpdateApiHooks,
  useUpdateFolderHooks,
} from "@/hooks/project";
import { Input } from "@/components/ui/input";
import LoadingOverlay from "@/components/loadingOverlay";
interface Props {
  trees: IProjectTree[];
}
const methodColors = {
  get: "text-green-500",
  post: "text-yellow-500",
  put: "text-blue-500",
  delete: "text-red-400",
  patch: "text-violet-500",
};

const ProjectTree: React.FC<Props> = ({ trees }) => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [editing, setEditing] = useState<{ id: number; type: string } | null>(
    null
  );
  const [newName, setNewName] = useState<string>("");
  const {
    setId,
    setProjectId,
    isLoading: isLoadingGetDetailApi,
  } = useGetApiDetailHooks();

  const projectId = useProjectStore((state) => state.projectId);
  const { handleCreateFolder } = useCreateFolderHooks();
  const { handleDeleteFolder } = useDeleteFolderHooks();
  const { handleUpdateFolder } = useUpdateFolderHooks();
  const { handleCreateApi } = useCreateApiHooks();
  const { handleDeleteApi } = useDeleteApiHooks();
  const { handleUpdateApi } = useUpdateApiHooks();

  const toggleFolder = (id: number) => {
    setOpenFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const openFolder = (id: number) => {
    setOpenFolders((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const onCreateFolder = (folder: IProjectTree) => {
    openFolder(folder.id);

    handleCreateFolder({
      name: "New Folder",
      project_id: projectId,
      parent_id: folder.id,
    });
  };

  const onClickDelFolder = (folder: IProjectTree) => {
    handleDeleteFolder(folder?.id || 0);
  };
  const onClickCreateReq = (folder: IProjectTree) => {
    openFolder(folder.id);

    handleCreateApi({
      name: "New Request",
      folder_id: folder.id,
      method: "get",
      project_id: projectId,
    });
  };

  const onClickDelApi = (api: IProjectTree) => {
    handleDeleteApi({ id: api.id, projectId });
  };

  const handleRename = (id: number, currentName: string, type: string) => {
    setEditing({ id, type });
    setNewName(currentName);
  };

  const handleSaveRename = (tr: IProjectTree) => {
    if (tr.type === "folder")
      handleUpdateFolder({
        id: tr.id,
        name: newName.trim(),
        parent_id: tr.parent_id,
      });
    else if (tr.type === "api")
      handleUpdateApi({
        id: tr.id,
        name: newName.trim(),
        method: tr.method,
        folder_id: tr.parent_id || 0,
        project_id: projectId,
      });
    setEditing(null);
  };

  const handleBlur = () => setEditing(null);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    tr: IProjectTree
  ) => {
    if (e.key === "Enter") handleSaveRename(tr);
    else if (e.key === "Escape") handleBlur();
  };

  const handleClickApi = (api: IProjectTree) => {
    setProjectId(projectId);
    setId(api.id);
  };
  const renderTree = (tree: IProjectTree[]) => {
    return tree?.map((tr) => (
      <React.Fragment key={tr.id}>
        <LoadingOverlay isLoading={isLoadingGetDetailApi} />
        {tr.type === "folder" ? (
          <>
            <div className="relative group flex items-center gap-2 w-[250px] hover:bg-primary/10 px-2 py-1 rounded">
              <div
                className="flex items-center gap-2 cursor-pointer "
                onClick={() => toggleFolder(tr.id)}
              >
                {openFolders[tr.id] ? (
                  <FolderOpen className="text-primary" />
                ) : (
                  <Folder className="text-primary" />
                )}
                {editing?.id === tr.id && editing?.type === "folder" ? (
                  <Input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, tr)}
                    className="border-b border-gray-300 focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <p
                    className="line-clamp-2 w-[150px] cursor-pointer"
                    onDoubleClick={() => handleRename(tr.id, tr.name, tr.type)}
                  >
                    {tr.name}
                  </p>
                )}
              </div>
              {/* Hidden button and dot menu */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2 items-center">
                  <Button
                    onClick={() => onCreateFolder(tr)}
                    variant="ghost"
                    className="text-primary rounded font-medium text-xl h-fit w-fit p-0 hover:bg-transparent"
                  >
                    <Plus size={15} />
                  </Button>

                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="text-primary font-thin cursor-pointer text-xs w-5 h-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] glass flex flex-col">
                      <Button
                        onClick={() => onCreateFolder(tr)}
                        variant="ghost"
                        className="justify-start p-1 h-8 gap-2"
                      >
                        <FolderPlus className="w-4 h-4" /> Create Folder
                      </Button>
                      <Button
                        onClick={() => onClickCreateReq(tr)}
                        variant="ghost"
                        className="justify-start p-1 h-8 gap-2"
                      >
                        <GitPullRequestCreate className="w-4 h-4" /> Create
                        Request
                      </Button>
                      <Separator />
                      <Button
                        onClick={() => handleRename(tr.id, tr.name, tr.type)}
                        variant="ghost"
                        className="justify-start p-1 h-8 gap-2"
                      >
                        <FolderPen className="w-4 h-4" /> Rename Folder
                      </Button>
                      <Button
                        onClick={() => onClickDelFolder(tr)}
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
          <div className="flex gap-2 items-center w-[250px] px-2 py-1 relative group hover:bg-primary/10 rounded">
            <div className="flex gap-2 cursor-pointer">
              <p className={`${methodColors[tr.method]} font-bold`}>
                {tr.method}
              </p>
              {editing?.id === tr.id && editing?.type === "api" ? (
                <Input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={(e) => handleKeyDown(e, tr)}
                  className="border-b border-gray-300 focus:outline-none"
                  autoFocus
                />
              ) : (
                <p
                  className="line-clamp-2 w-[150px] cursor-pointer"
                  onDoubleClick={() => handleRename(tr.id, tr.name, tr.type)}
                  onClick={() => handleClickApi(tr)}
                >
                  {tr.name}
                </p>
              )}
            </div>
            {/* Hidden button and dot menu */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="text-primary font-thin cursor-pointer text-xs w-5 h-5" />
                </PopoverTrigger>
                <PopoverContent className="w-[200px] glass flex flex-col">
                  <Button
                    onClick={() => handleRename(tr.id, tr.name, tr.type)}
                    variant="ghost"
                    className="justify-start p-1 h-8 gap-2"
                  >
                    <Pen className="w-4 h-4" /> Rename Request
                  </Button>
                  <Button
                    onClick={() => onClickDelApi(tr)}
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

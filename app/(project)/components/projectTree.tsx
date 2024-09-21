import { IProjectTree } from "@/interfaces/ProjectTree";
import { Folder, FolderOpen } from "lucide-react";
import React, { useState } from "react";

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

  const renderTree = (tree: IProjectTree[]) => {
    return tree?.map((tr) => (
      <React.Fragment key={tr.id}>
        {tr.type === "folder" ? (
          <div>
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => toggleFolder(tr.id)}
            >
              {openFolders[tr.id] ? (
                <FolderOpen className="text-primary" />
              ) : (
                <Folder className="text-primary" />
              )}

              <p>{tr.name}</p>
            </div>
            {openFolders[tr.id] && tr.children && (
              <div className="ml-5">{renderTree(tr.children)}</div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <p className={`${methodColors[tr.method]} font-bold`}>
              {tr.method}
            </p>
            <p>{tr.name}</p>
          </div>
        )}
      </React.Fragment>
    ));
  };

  return <div className="ml-3">{renderTree(trees)}</div>;
};

export default ProjectTree;

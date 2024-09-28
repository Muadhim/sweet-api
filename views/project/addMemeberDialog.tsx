import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Plus } from "lucide-react";
import { useGetInviteLinkHooks } from "@/hooks/project";
import useProjectStore from "@/store/project";
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/constant";

const AddMemeberDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const project = useProjectStore((store) => store.project);
  const { data, setPid } = useGetInviteLinkHooks();
  const [inviteUrl, setInviteUrl] = useState("");
  useEffect(() => {
    if (data.token) setInviteUrl(`${baseUrl}/join-project?token=${data.token}`);
  }, [data.token]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member Project</DialogTitle>
          <DialogDescription>
            Create your amazing project, and invite your Team members.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          {inviteUrl ? (
            <div className="flex items-center gap-2 w-full">
              <Input value={inviteUrl} />
              <Button
                variant="ghost"
                className="w-8 h-8 p-0 text-primary"
                onClick={() => {
                  navigator.clipboard.writeText(inviteUrl);
                  setIsOpen(false);
                }}
              >
                <Copy />
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={() => setPid(project.id)}>
              Generate link
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemeberDialog;

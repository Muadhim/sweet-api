import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useCreateGroupHooks from "@/hooks/group/createGroup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CreateGroupDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, method } = useCreateGroupHooks();

  const onSubmitGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    method.createGroup({ name });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Grooup</DialogTitle>
          <DialogDescription>
          Create your group and start collaborating with the team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmitGroup} className="flex flex-col gap-4 py-4">
          <Label htmlFor="name" className="text-left" required>
            Project Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="My Project"
            className="col-span-3"
            required
          />
          <br />
          <DialogFooter>
            <Button variant="success" type="submit">
              Craete Group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;

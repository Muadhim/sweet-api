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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectUsers from "./selectUsers";
import { useCreateProjectHooks } from "@/hooks/project";

const CreateProjectDialog = () => {
  const [users, setUsers] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { data, method } = useCreateProjectHooks();

  const onSubmitProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";

    method.createProject({ name, member_ids: users });
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
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create your amazing project, and invite your Team members.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmitProject} className="flex flex-col gap-4 py-4">
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
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="members" className="text-left">
              Add members
            </Label>
            <SelectUsers setValues={setUsers} values={users} />
          </div>
          <br />
          <DialogFooter>
            <Button variant="success" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;

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

const CreateProjectDialog = () => {
  const [users, setUsers] = useState<number[]>([]);
  console.log("users; ", users);
  return (
    <Dialog>
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
        <div className="flex flex-col gap-4 py-4">
          <Label htmlFor="name" className="text-right">
            Project Name
          </Label>
          <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="members" className="text-left">
              Add members
            </Label>
            <SelectUsers setValues={setUsers} values={users} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;

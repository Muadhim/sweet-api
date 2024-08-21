"use client";

import * as React from "react";
import { Check, CircleXIcon, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Close } from "@radix-ui/react-popover";

const users = [
  {
    value: 1,
    label: "Next.js",
  },
  {
    value: 2,
    label: "SvelteKit",
  },
  {
    value: 3,
    label: "Nuxt.js",
  },
  {
    value: 4,
    label: "Remix",
  },
  {
    value: 5,
    label: "Astro",
  },
];

type Props = {
  values: number[];
  setValues: (v: number[]) => void;
};

const SelectUsers: React.FC<Props> = ({ setValues, values }) => {
  const [open, setOpen] = React.useState(false);

  const onSelectUser = (v: string) => {
    if (!values.includes(parseInt(v))) setValues([...values, parseInt(v)]);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="!w-full">
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className=" border flex !w-full h-fit min-h-10 justify-between"
        >
          <div className="flex gap-2 flex-wrap">
            {values
              ? values.map((v) => (
                  <Badge>
                    {users.find((user) => user.value === v)?.label}
                    <CircleXIcon
                      onClick={() =>
                        setValues(values.filter((val) => val !== v))
                      }
                      className="ml-2 h-4 w-4 text-secondary "
                    />
                  </Badge>
                ))
              : "Select users..."}
          </div>
          <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((u) => (
                <CommandItem
                  key={u.value}
                  value={u.value.toString()}
                  onSelect={onSelectUser}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      values.includes(u.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {u.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectUsers;

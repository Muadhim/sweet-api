import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface Props {
  values: Item[];
  onChange?: (i: Item[]) => void;
  disabled?: boolean;
}

type PrimitiveType = "string" | "number" | "boolean" | "array" | "object";
const primitiveTypes: PrimitiveType[] = [
  "string",
  "number",
  "boolean",
  "array",
  "object",
];
const typeColors = {
  string: "text-green-500",
  number: "text-red-400",
  boolean: "text-amber-500",
  array: "text-sky-700",
  object: "text-violet-600",
};
const AddingItems: React.FC<Props> = ({
  values,
  onChange,
  disabled = false,
}) => {
  const [newItem, setNewItem] = useState<Item>({
    name: "",
    type: "",
    example: "",
    description: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.type) {
      setNewItem({ name: "", type: "", example: "", description: "" });
      onChange?.([...values, newItem]);
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = values.filter((_, i) => i !== index);
    onChange?.(updatedItems);
  };

  return (
    <div className="rounded-xl p-2 border">
      {!disabled && (
        <div className="w-full flex justify-end mb-2">
          <Button
            variant="secondary"
            onClick={handleAddItem}
            className="h-8 text-primary"
          >
            Add
          </Button>
        </div>
      )}
      <table className="table-auto w-full text-left mb-4 rounded-lg">
        <thead>
          <tr className="rounded-t-lg overflow-hidden border border-red-400">
            <th className="font-medium border px-2">Name</th>
            <th className="font-medium border px-2">Type</th>
            <th className="font-medium border px-2">Example</th>
            <th className="font-medium border px-2">Description</th>
            {!disabled && <th className="font-medium border px-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {values.map((item, index) => (
            <tr key={index} className="bg-backgound">
              <td className="border px-2 py-1">{item.name}</td>
              <td
                className={`border px-2 py-1 ${
                  typeColors[item?.type as PrimitiveType]
                }`}
              >
                {item.type}
              </td>
              <td className="border px-2 py-1">{item.example}</td>
              <td className="border px-2 py-1">{item.description}</td>
              {!disabled && (
                <td className="border px-2 py-1 flex items-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 h-6 border-none"
                  >
                    <Trash size={20} />
                  </Button>
                </td>
              )}
            </tr>
          ))}
          {!disabled && (
            <tr className="bg-border/25">
              <td className="border px-2 py-1">
                <Input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-none w-full bg-border/25 rounded-none"
                />
              </td>
              <td className="border px-2 py-1">
                <Select onValueChange={(e) => handleInputChange("type", e)}>
                  <SelectTrigger
                    className={`w-full !outline-none rounded-none border-none bg-border/25 ${
                      typeColors[newItem.type as PrimitiveType]
                    }`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="w-fit">
                    {primitiveTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className={typeColors[type as PrimitiveType]}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
              <td className="border px-2 py-1">
                <Input
                  type="text"
                  name="example"
                  value={newItem.example}
                  onChange={(e) => handleInputChange("example", e.target.value)}
                  className="border-none w-full bg-border/25 rounded-none"
                />
              </td>
              <td className="border px-2 py-1">
                <Input
                  type="text"
                  name="description"
                  value={newItem.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="border-none w-full bg-border/25 rounded-none"
                />
              </td>
              <td className="border px-2 py-1">
                <div className="bg-border/20" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddingItems;

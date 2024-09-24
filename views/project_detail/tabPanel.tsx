import JsonEditor from "@/components/jsonEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TabPanelProps {
  disabled?: boolean;
  responses: ResponseData[];
  setResponses?: (val: ResponseData[]) => void;
}

const contentTypes = [
  "application/json",
  "text/html",
  "text/plain",
  "text/xml",
];

const TabPanel: React.FC<TabPanelProps> = ({
  disabled = false,
  responses,
  setResponses,
}) => {
  const [activeTab, setActiveTab] = useState<string>(responses[0]?.id || "");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState<string>("");

  useEffect(() => {
    if (responses.length && !activeTab) setActiveTab(responses[0]?.id || "");
  }, [responses.length]);

  const handleTabClick = (tabId: string) => setActiveTab(tabId);

  const addTab = () => {
    const maxNumber = Math.max(
      ...responses.map((tab) => {
        const match = tab?.id?.match(/tab_(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      }),
      0
    );

    const newResponse: ResponseData = {
      id: `tab_${maxNumber + 1}`,
      tab_name: "Success",
      status_code: 200,
      name: "Success",
      content_type: "application/json",
      data_schema: JSON.stringify({}),
    };
    setResponses?.([...responses, newResponse]);
    setActiveTab(newResponse?.id || "");
  };

  const removeTab = (tabId: string) => {
    const updatedResponses = responses.filter((res) => res.id !== tabId);
    setResponses?.(updatedResponses);
    if (activeTab === tabId) setActiveTab(updatedResponses[0]?.id || "");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updatedResponse: ResponseData | undefined = responses.find(
      (res) => res.id === activeTab
    );
    if (updatedResponse) {
      setResponses?.(
        responses.map((res) =>
          res.id === activeTab
            ? { ...res, [e.target.name]: e.target.value }
            : res
        )
      );
    }
  };

  const handleJsonEditorChange = (newSchema: string) => {
    setResponses?.(
      responses.map((res) =>
        res.id === activeTab ? { ...res, data_schema: newSchema } : res
      )
    );
  };

  const handleRenameTab = (id: string, currentLabel: string) => {
    setEditingId(id);
    setNewLabel(currentLabel);
  };

  const handleSaveRenameTab = (id: string) => {
    setResponses?.(
      responses.map((res) =>
        res.id === activeTab ? { ...res, tab_name: newLabel } : res
      )
    );
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex border-b border-gray-300 items-center">
        {responses.map((res) => (
          <div
            key={res.id}
            className={`relative ${
              !disabled && "cursor-pointer"
            } py-2 pl-4 pr-20 -mb-px transition duration-200 ease-in-out ${
              res.id === activeTab
                ? "bg-white border border-gray-300 rounded-t text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => handleTabClick(res?.id || "")}
          >
            {editingId === res.id ? (
              <Input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onBlur={() => setEditingId(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveRenameTab(res?.id || "");
                  else if (e.key === "Escape") setEditingId(null);
                }}
                autoFocus
                className="h-6 w-28"
              />
            ) : (
              <p
                onDoubleClick={() =>
                  disabled
                    ? null
                    : handleRenameTab(res?.id || "", res?.tab_name || "")
                }
              >
                {res.tab_name}
              </p>
            )}
            {!disabled && (
              <Button
                variant="ghost"
                className="absolute right-0 top-0 text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(res?.id || "");
                }}
              >
                <X />
              </Button>
            )}
          </div>
        ))}
        {!disabled && (
          <Button variant="secondary" className="text-primary" onClick={addTab}>
            <Plus />
          </Button>
        )}
      </div>
      <div className="p-4 border border-gray-300 rounded-b">
        {responses.length ? (
          responses.map(
            (res) =>
              res.id === activeTab && (
                <div className="flex flex-col gap-2" key={res.id}>
                  <Label htmlFor="status_code">Status Code</Label>
                  <Input
                    name="status_code"
                    value={res?.status_code?.toString() || ""}
                    onChange={handleInputChange}
                    disabled={disabled}
                  />
                  <Label htmlFor="name">Name</Label>
                  <Input
                    name="name"
                    value={res.name}
                    onChange={handleInputChange}
                    disabled={disabled}
                  />
                  <Label htmlFor="content_type">Content Type</Label>
                  <Select
                    name="content_type"
                    value={res.content_type}
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { name: "content_type", value },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                    disabled={disabled}
                  >
                    <SelectTrigger className="w-full !outline-none rounded-none border-none bg-border/25">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-fit">
                      {contentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <JsonEditor
                    disabled={disabled}
                    value={res?.data_schema || ""}
                    onChange={handleJsonEditorChange}
                  />
                </div>
              )
          )
        ) : (
          <div className="flex items-center justify-center w-full h-[200px]">
            <Button
              variant="secondary"
              className="text-primary"
              onClick={addTab}
            >
              Add your response
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabPanel;

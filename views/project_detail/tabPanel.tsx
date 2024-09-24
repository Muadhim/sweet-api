import JsonEditor from "@/components/jsonEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResponseData {
  id: string;
  status_code: number;
  name: string;
  content_type: string;
  data_schema: string;
}

interface Tab {
  id: string;
  label: string;
}

interface TabPanelProps {
  initialTabs?: Tab[];
  initialResponse?: ResponseData[];
  disabled?: boolean;
}

const contentTypes = ["application/json", "text/html", "text/plain"];

const TabPanel: React.FC<TabPanelProps> = ({
  initialTabs,
  initialResponse,
  disabled = false,
}) => {
  const [tabs, setTabs] = useState<Tab[]>(
    initialTabs?.length ? initialTabs : []
  );
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id);
  const [responses, setResponses] = useState<ResponseData[]>(
    initialResponse?.length ? initialResponse : []
  );
  const [tabCounter, setTabCounter] = useState<number>(tabs.length + 1);
  const [activeResponse, setActiveResponse] = useState<ResponseData | null>(
    null
  );
  const [editingId, setEditingId] = useState<string | null>(null);

  console.log("responses: ", responses);
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const currentResponse = responses.find(
      (resp, index) => index === tabs.findIndex((tab) => tab.id === tabId)
    );
    setActiveResponse(currentResponse || null);
  };

  const addTab = () => {
    const newResponse: ResponseData = {
      id: `tab${tabCounter}`,
      status_code: 200,
      name: "Success",
      content_type: "application/json",
      data_schema: JSON.stringify({}),
    };

    setResponses([...responses, newResponse]);

    const newTab: Tab = {
      id: `tab${tabCounter}`,
      label: "Success",
    };

    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
    setTabCounter(tabCounter + 1);
    setActiveResponse(newResponse);
  };

  const removeTab = (tabId: string) => {
    const updateResponses = responses.filter((res) => res.id !== tabId);
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    setResponses(updateResponses);
    setTabs(updatedTabs);
    if (activeTab === tabId) {
      const newActiveTab = updatedTabs[0]?.id;
      setActiveTab(newActiveTab);
      const newActiveResponse = responses[0];
      setActiveResponse(newActiveResponse || null);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (activeResponse) {
      const updatedResponse = {
        ...activeResponse,
        [e.target.name]: e.target.value,
      };
      setActiveResponse(updatedResponse);
      const updatedResponses = responses.map((resp, index) =>
        index === tabs.findIndex((tab) => tab.id === activeTab)
          ? updatedResponse
          : resp
      );
      setResponses(updatedResponses);
    }
  };

  const handleJsonEditorChange = (newSchema: string) => {
    if (activeResponse) {
      const updatedResponse = { ...activeResponse, data_schema: newSchema };
      setActiveResponse(updatedResponse);
      const updatedResponses = responses.map((resp, index) =>
        index === tabs.findIndex((tab) => tab.id === activeTab)
          ? updatedResponse
          : resp
      );
      setResponses(updatedResponses);
    }
  };
  const handleRenameTab = (val: string, id: string) => {
    setTabs(
      tabs.map((tab) => {
        if (tab.id === id) {
          return { ...tab, label: val };
        }
        return tab;
      })
    );
  };

  const handleBlur = () => setEditingId(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setEditingId("");
    else if (e.key === "Escape") handleBlur();
  };

  return (
    <div>
      <div className="flex border-b border-gray-300 items-center">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`relative cursor-pointer py-2 pl-4 pr-20 -mb-px transition duration-200 ease-in-out ${
              tab.id === activeTab
                ? "bg-white border border-gray-300 rounded-t text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => handleTabClick(tab.id)}
            onDoubleClick={() => setEditingId(tab.id)}
          >
            {editingId === tab.id ? (
              <Input
                value={tab.label}
                onChange={(e) => handleRenameTab(e.target.value, tab.id)}
                onBlur={handleBlur}
                onKeyDown={(e) => handleKeyDown(e)}
                autoFocus
                className="h-6 w-28"
              />
            ) : (
              <p>{tab.label}</p>
            )}

            <Button
              variant="ghost"
              className="absolute right-0 top-0 text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                removeTab(tab.id);
              }}
            >
              <X />
            </Button>
          </div>
        ))}
        <Button variant="secondary" className="text-primary" onClick={addTab}>
          <Plus />
        </Button>
      </div>
      <div className="p-4 border border-gray-300 rounded-b">
        {tabs.length ? (
          <div className="flex flex-col gap-2">
            <Label htmlFor="status_code">Status Code</Label>
            <Input
              name="status_code"
              value={activeResponse?.status_code || ""}
              onChange={handleInputChange}
              disabled={disabled}
            />

            <Label htmlFor="name">Name</Label>
            <Input
              disabled={disabled}
              name="name"
              value={activeResponse?.name || ""}
              onChange={handleInputChange}
            />

            <Label htmlFor="content_type">Content Type</Label>
            <Select
              name="content_type"
              disabled={disabled}
              value={activeResponse?.content_type || ""}
              onValueChange={(value) => {
                if (activeResponse) {
                  handleInputChange({
                    target: { name: "content_type", value },
                  } as any);
                }
              }}
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
              value={activeResponse?.data_schema || ""}
              onChange={handleJsonEditorChange}
            />
          </div>
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

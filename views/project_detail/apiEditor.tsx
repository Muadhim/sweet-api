import { Input } from "@/components/ui/input";
import useProjectStore from "@/store/project";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TMethod } from "@/interfaces/Method";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import EditParams from "./editParams";
import EditBody from "./editBody";
import EditHeader from "./editHeader";
import { X } from "lucide-react";
import JsonEditor from "@/components/jsonEditor";
import TabPanel from "./tabPanel";

const methodColors = {
  get: "text-green-500",
  post: "text-yellow-500",
  put: "text-blue-500",
  delete: "text-red-400",
  patch: "text-violet-500",
};

const ApiEditor = () => {
  const projectApi = useProjectStore((state) => state.projectApi);
  const [method, setMethod] = useState<string>(projectApi.method);
  const [path, setPath] = useState<string>(projectApi.path);
  const [desc, setDesc] = useState<string>(projectApi.description);
  const [requestExample, setRequestExample] = useState<string>("");
  const [responseExample, setResponseExample] = useState<string>("");
  const [isAddReqEx, setIsAddReqEx] = useState<boolean>(false);
  const [isAddResEx, setIsAddResEx] = useState<boolean>(false);
  const [responses, setResponses] = useState<ResponseData[]>([]);
  console.log("responsees: ", responses);
  return (
    <div className="w-full border rounded-xl p-2">
      <div className="border rounded-lg flex w-full">
        <Select onValueChange={setMethod} defaultValue={projectApi.method}>
          <SelectTrigger
            className={`w-fit font-bold !outline-none rounded-r-none border-y-0 border-l-0  ${
              methodColors[method as TMethod]
            }`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="w-fit ">
            {["get", "post", "put", "delete", "patch"].map((type) => (
              <SelectItem
                key={type}
                value={type}
                className={methodColors[type as TMethod]}
                icon={false}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="text"
          className="border-none outline-none rounded-none focus:outline-none"
          defaultValue={projectApi.path}
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        <Button className="rounded-l-none">Save</Button>
      </div>
      <br />
      <Textarea
        placeholder="Description"
        defaultValue={projectApi.description}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <br />
      <div>
        <p className="font-bold text-primary py-2">Request</p>
        <Tabs defaultValue="params" className="w-full">
          <TabsList>
            <TabsTrigger value="params" className="w-[100px]">
              Params
            </TabsTrigger>
            <TabsTrigger value="body" className="w-[100px]">
              Body
            </TabsTrigger>
            <TabsTrigger value="headers" className="w-[100px]">
              Headers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="params">
            <EditParams />
          </TabsContent>
          <TabsContent value="body">
            <EditBody />
          </TabsContent>
          <TabsContent value="headers">
            <EditHeader />
          </TabsContent>
        </Tabs>
      </div>
      <div className="my-2">
        {isAddReqEx ? (
          <div className="relative">
            <Button
              variant="secondary"
              className="h-8 text-destructive absolute top-0 left-0"
              onClick={() => {
                setIsAddReqEx(false);
                setRequestExample("");
              }}
            >
              <X />
            </Button>

            <JsonEditor value={requestExample} onChange={setRequestExample} />
          </div>
        ) : (
          <div className="w-full border rounded-lg flex justify-center items-center h-[200px]">
            <Button
              variant="secondary"
              className="text-primary"
              onClick={() => setIsAddReqEx(true)}
            >
              Add Example
            </Button>
          </div>
        )}
      </div>
      <div>
        <p className="font-bold text-primary py-2">Response</p>
        <TabPanel />
      </div>
      <div className="my-2">
        {isAddResEx ? (
          <div className="relative">
            <Button
              variant="secondary"
              className="h-8 text-destructive absolute top-0 left-0"
              onClick={() => {
                setIsAddResEx(false);
                setResponseExample("");
              }}
            >
              <X />
            </Button>

            <JsonEditor value={responseExample} onChange={setResponseExample} />
          </div>
        ) : (
          <div className="w-full border rounded-lg flex justify-center items-center h-[200px]">
            <Button
              variant="secondary"
              className="text-primary"
              onClick={() => setIsAddResEx(true)}
            >
              Add Example
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiEditor;

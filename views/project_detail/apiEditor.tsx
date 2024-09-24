import { Input } from "@/components/ui/input";
import useProjectStore from "@/store/project";
import React, { useEffect, useState } from "react";
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
import { useUpdateApiDetailHooks } from "@/hooks/project";
import { methodColors } from "./constant";

const ApiEditor = () => {
  const projectApi = useProjectStore((state) => state.projectApi);
  const [method, setMethod] = useState<string>(projectApi.method);
  const [path, setPath] = useState<string>(projectApi.path);
  const [desc, setDesc] = useState<string>(projectApi.description);
  const [exampleRequest, setExampleRequest] = useState<string>("");
  const [exampleResponse, setExampleResponse] = useState<string>("");
  const [isAddReqEx, setIsAddReqEx] = useState<boolean>(false);
  const [isAddResEx, setIsAddResEx] = useState<boolean>(false);
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [reqParams, setReqPrams] = useState<Item[]>([]);
  const [formData, setFormData] = useState<Item[]>([]);
  const [urlencoded, setUrlencoded] = useState<Item[]>([]);
  const [jsonData, setJsonData] = useState<string>("");
  const [xmlData, setXmlData] = useState<string>("");
  const [reqHeaders, setReqHeaders] = useState<Item[]>([]);

  const { handleUpdateApiDetail, isLoading } = useUpdateApiDetailHooks();

  const handleSaveApi = () => {
    const req: ApiRequest = {
      params: reqParams,
      body: {
        form_data: formData,
        url_encoded: urlencoded,
        json_data: jsonData,
        xml: xmlData,
      } as Body,
      headers: reqHeaders,
    };

    handleUpdateApiDetail({
      id: projectApi.id,
      name: projectApi.name,
      path: path,
      method: method as TMethod,
      folder_id: projectApi.folder_id,
      request: JSON.stringify(req),
      response: JSON.stringify(responses),
      description: desc,
      example_request: exampleRequest,
      example_response: exampleResponse,
      project_id: projectApi.project_id,
    });
  };

  useEffect(() => {
    if (projectApi) {
      if (projectApi.response) {
        try {
          setResponses(JSON.parse(projectApi.response) as ResponseData[]);
        } catch (error) {
          if (typeof projectApi.response === "string")
            setResponses([
              {
                data_schema: projectApi.response,
                tab_name: projectApi.response.charAt(0).toUpperCase(),
                id: projectApi.response.charAt(0).toUpperCase(),
              },
            ]);
          else setResponses([]);
        }
      }
      if (projectApi.request) {
        let req: ApiRequest;
        try {
          req = JSON.parse(projectApi.request);
        } catch {
          req = {} as ApiRequest;
        }
        if (req.params) setReqPrams(req.params);
        if (req.headers) setReqHeaders(req.headers);
        if (req.body) {
          if (req.body.form_data) setFormData(req.body.form_data);
          if (req.body.url_encoded) setUrlencoded(req.body.url_encoded);
          if (req.body.json_data) setJsonData(req.body.json_data);
          if (req.body.xml) setXmlData(req.body.xml);
        }
      }
      if (projectApi.path) setPath(projectApi.path);
      if (projectApi.method) setMethod(projectApi.method);
      if (projectApi.description) setDesc(projectApi.description);
      if (projectApi.example_request)
        setExampleRequest(projectApi.example_request);
      if (projectApi.example_response)
        setExampleResponse(projectApi.example_response);
    }
  }, [projectApi]);

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
        <Button className="rounded-l-none" onClick={handleSaveApi}>
          Save
        </Button>
      </div>
      <br />
      <Textarea
        placeholder="Description"
        defaultValue={projectApi.description}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <br />
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
          <EditParams params={reqParams} setParams={setReqPrams} />
        </TabsContent>
        <TabsContent value="body">
          <EditBody
            formData={formData}
            setFormData={setFormData}
            urlencoded={urlencoded}
            setUrlencoded={setUrlencoded}
            jsonData={jsonData}
            setJsonData={setJsonData}
            xmlData={xmlData}
            setXmlData={setXmlData}
          />
        </TabsContent>
        <TabsContent value="headers">
          <EditHeader headers={reqHeaders} setHeaders={setReqHeaders} />
        </TabsContent>
      </Tabs>
      <div className="my-2">
        {isAddReqEx || exampleRequest ? (
          <>
            <p className="text-primary my-2">Example</p>
            <div className="relative">
              <Button
                variant="secondary"
                className="h-8 text-destructive absolute top-0 left-0"
                onClick={() => {
                  setIsAddReqEx(false);
                  setExampleRequest("");
                }}
              >
                <X />
              </Button>

              <JsonEditor value={exampleRequest} onChange={setExampleRequest} />
            </div>
          </>
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
      <p className="font-bold text-primary py-2">Response</p>
      <TabPanel responses={responses} setResponses={setResponses} />
      <div className="my-2">
        {isAddResEx || exampleResponse ? (
          <>
            <p className="text-primary my-2">Example</p>
            <div className="relative">
              <Button
                variant="secondary"
                className="h-8 text-destructive absolute top-0 left-0"
                onClick={() => {
                  setIsAddResEx(false);
                  setExampleResponse("");
                }}
              >
                <X />
              </Button>

              <JsonEditor
                value={exampleResponse}
                onChange={setExampleResponse}
              />
            </div>
          </>
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

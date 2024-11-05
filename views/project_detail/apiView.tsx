import useProjectStore from "@/store/project";
import React, { useEffect, useState } from "react";
import { methodColors } from "./constant";
import { TMethod } from "@/interfaces/Method";
import AddingItems from "./addingItems";
import JsonEditor from "@/components/jsonEditor";
import TabPanel from "./tabPanel";

const ApiView = () => {
  const projectApi = useProjectStore((store) => store.projectApi);
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [reqParams, setReqPrams] = useState<Item[]>([]);
  const [formData, setFormData] = useState<Item[]>([]);
  const [urlencoded, setUrlencoded] = useState<Item[]>([]);
  const [jsonData, setJsonData] = useState<string>("");
  const [xmlData, setXmlData] = useState<string>("");
  const [reqHeaders, setReqHeaders] = useState<Item[]>([]);

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
        else setReqPrams([]);
        if (req.headers) setReqHeaders(req.headers);
        else setReqHeaders([]);
        if (req.body) {
          if (req.body.form_data) setFormData(req.body.form_data);
          else setFormData([]);
          if (req.body.url_encoded) setUrlencoded(req.body.url_encoded);
          else setUrlencoded([]);
          if (req.body.json_data) setJsonData(req.body.json_data);
          else setJsonData("");
          if (req.body.xml) setXmlData(req.body.xml);
          else setXmlData("");
        }
      }
    }
  }, [projectApi]);
  return (
    <div className="w-full border rounded-xl p-2 flex flex-col gap-2">
      <div className="border rounded-lg flex w-full gap-2">
        <p
          className={`w-fit font-bold !outline-none rounded-r-none border-y-0 border border-l-0 p-2 ${
            methodColors[projectApi.method as TMethod]
          }`}
        >
          {projectApi.method}
        </p>
        <p className="border-none outline-none rounded-none focus:outline-none p-2">
          {projectApi.path}
        </p>
      </div>
      <div className="flex gap-2 items-center my-2">
        <p>Author:</p>
        <p className="px-2 py-1 bg-primary/10 text-primary rounded-md">
          {projectApi.author.name}
        </p>
        <p>Created:</p>
        <p className="px-2 py-1 bg-primary/10 text-primary rounded-md">
          {projectApi.created_at
            ? new Date(projectApi.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : ""}
        </p>
        {projectApi?.updated_at && (
          <>
            <p>Updated:</p>
            <p className="px-2 py-1 bg-primary/10 text-primary rounded-md">
              {projectApi.updated_at
                ? new Date(projectApi.updated_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </p>
          </>
        )}

        {projectApi?.update_by?.name && (
          <>
            <p>Updated By:</p>
            <p className="px-2 py-1 bg-primary/10 text-primary rounded-md">
              {projectApi?.update_by?.name}
            </p>
          </>
        )}
      </div>
      <div className="border rounded-lg p-2 h-fit min-h-[200px]">
        {projectApi.description}
      </div>
      {(reqParams.length > 0 ||
        reqHeaders.length > 0 ||
        formData.length > 0 ||
        urlencoded.length > 0 ||
        jsonData !== "" ||
        xmlData !== "" ||
        projectApi.example_request !== "") && (
        <p className="font-bold text-primary py-2">Request</p>
      )}
      {reqHeaders.length > 0 && (
        <>
          <p>Headers</p>
          <AddingItems values={reqHeaders} disabled />
        </>
      )}
      {reqParams.length > 0 && (
        <>
          <p>Query params</p>
          <AddingItems values={reqParams} disabled />
        </>
      )}
      {formData.length > 0 && (
        <>
          <p>form-data</p>
          <AddingItems values={formData} disabled />
        </>
      )}
      {urlencoded.length > 0 && (
        <>
          <p>x-www-form-urlencoded</p>
          <AddingItems values={urlencoded} disabled />
        </>
      )}
      {jsonData !== "" && (
        <>
          <p>json</p>
          <JsonEditor value={jsonData} disabled />
        </>
      )}
      {xmlData !== "" && (
        <>
          <p>xml</p>
          <JsonEditor value={xmlData} disabled />
        </>
      )}

      {projectApi.example_request !== "" && (
        <>
          <p>Example request</p>
          <JsonEditor value={projectApi.example_request} disabled />
        </>
      )}
      {(projectApi.response.length > 0 ||
        projectApi.example_response !== "") && (
        <p className="font-bold text-primary py-2">Response</p>
      )}

      {projectApi.response.length > 0 && (
        <TabPanel responses={responses} disabled />
      )}
      {projectApi.example_response !== "" && (
        <>
          <p>Example response</p>
          <JsonEditor value={projectApi.example_response} disabled />
        </>
      )}
    </div>
  );
};

export default ApiView;

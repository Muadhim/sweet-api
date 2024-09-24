import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddingItems from "./addingItems";
import JsonEditor from "@/components/jsonEditor";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  formData: Item[];
  setFormData: (val: Item[]) => void;
  urlencoded: Item[];
  setUrlencoded: (val: Item[]) => void;
  jsonData: string;
  setJsonData: (val: string) => void;
  xmlData: string;
  setXmlData: (val: string) => void;
}

const EditBody: React.FC<Props> = ({
  formData,
  setFormData,
  urlencoded,
  setUrlencoded,
  jsonData,
  setJsonData,
  xmlData,
  setXmlData,
}) => {
  return (
    <Tabs defaultValue="json" className="w-full">
      <TabsList>
        <TabsTrigger value="none">none</TabsTrigger>
        <TabsTrigger value="form-data">form-data</TabsTrigger>
        <TabsTrigger value="x-www-form-urlencoded">
          x-www-form-urlencoded
        </TabsTrigger>
        <TabsTrigger value="json">json</TabsTrigger>
        <TabsTrigger value="xml">xml</TabsTrigger>
      </TabsList>
      <TabsContent value="none">
        <div className="border rounded-lg w-full h-[200px] flex justify-center items-center">
          <p>This requst has no body parameters</p>
        </div>
      </TabsContent>
      <TabsContent value="form-data">
        <AddingItems values={formData} onChange={setFormData} />
      </TabsContent>
      <TabsContent value="x-www-form-urlencoded">
        <AddingItems values={urlencoded} onChange={setUrlencoded} />
      </TabsContent>
      <TabsContent value="json">
        <JsonEditor value={jsonData} onChange={setJsonData} />
      </TabsContent>
      <TabsContent value="xml">
        <Textarea
          value={xmlData}
          onChange={(e) => setXmlData(e.target.value)}
        />
      </TabsContent>
    </Tabs>
  );
};

export default EditBody;

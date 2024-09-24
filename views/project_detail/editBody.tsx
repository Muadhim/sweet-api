import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddingItems from "./addingItems";
import JsonEditor from "@/components/jsonEditor";
import { Textarea } from "@/components/ui/textarea";

const EditBody = () => {
  const [formData, setFormData] = useState<Item[]>([]);
  const [urlencoded, setUrlencoded] = useState<Item[]>([]);
  const [jsonData, setJsonData] = useState<string>("");
  const [xmlData, setXmlData] = useState<string>("");
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

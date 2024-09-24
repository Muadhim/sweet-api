import React, { useState } from "react";
import AddingItems from "./addingItems";

interface Props {
  value: Item[];
}
const EditParams = () => {
  const [params, setParams] = useState<Item[]>([]);
  console.log("params: ", params);
  return (
    <div>
      <p>Query Params</p>
      <br />
      <AddingItems values={params} onChange={setParams} />
    </div>
  );
};

export default EditParams;

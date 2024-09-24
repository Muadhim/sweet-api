import React, { useState } from "react";
import AddingItems from "./addingItems";

const EditHeader = () => {
  const [headers, setHeaders] = useState<Item[]>([]);
  return (
    <div>
      <p>Headers</p>
      <br />
      <AddingItems values={headers} onChange={setHeaders} />
    </div>
  );
};

export default EditHeader;

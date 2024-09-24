import React from "react";
import AddingItems from "./addingItems";

interface Props {
  params: Item[];
  setParams: (val: Item[]) => void;
}
const EditParams: React.FC<Props> = ({ params, setParams }) => {
  return (
    <div>
      <p>Query Params</p>
      <br />
      <AddingItems values={params} onChange={setParams} />
    </div>
  );
};

export default EditParams;

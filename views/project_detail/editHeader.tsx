import React from "react";
import AddingItems from "./addingItems";

interface Props {
  headers: Item[];
  setHeaders: (val: Item[]) => void;
}
const EditHeader: React.FC<Props> = ({ headers, setHeaders }) => {
  return (
    <div>
      <p>Headers</p>
      <br />
      <AddingItems values={headers} onChange={setHeaders} />
    </div>
  );
};

export default EditHeader;

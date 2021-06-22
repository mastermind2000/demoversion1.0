import React from "react";

import ItemForm from "./ItemForm";
import StateDrop from "./StateDrop";

const Step2 = ({ setForm, formData, navigation }) => {
  const { policies } = formData;

  const { previous, next } = navigation;

  return (
    <div className="form">
      <h3>Address</h3>

      <StateDrop
        label="Policies"
        name="policies"
        value={policies}
        onChange={setForm}
      />
      <div>
        <button onClick={previous}>Previous</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Step2;

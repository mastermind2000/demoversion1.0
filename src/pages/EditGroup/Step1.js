import React from "react";

import ItemForm from "./ItemForm";

const Step1 = ({ setForm, formData, navigation }) => {
  const { groupName } = formData;

  const { next } = navigation;

  return (
    <div className="form">
      <ItemForm
        label="Group Name"
        type="text"
        name="groupName"
        value={groupName}
        onChange={setForm}
      />
      <div>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Step1;

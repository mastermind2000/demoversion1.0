import React from "react";

import ItemForm from "./ItemForm";

const Step1 = ({ setForm, formData, navigation }) => {
  const { userName } = formData;

  const { next } = navigation;

  return (
    <div className="form">
      <ItemForm
        label="User Name"
        type="text"
        name="userName"
        value={userName}
        onChange={setForm}
      />
      <div>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Step1;

import React from "react";

const Review = ({ setForm, formData, navigation }) => {
  const { groupName, policies, email } = formData;
  const { go } = navigation;

  return (
    <div className="form">
      <h3>Review your data</h3>
      <h4>
        <button onClick={() => go("names")}>Edit</button>
      </h4>
      <div>
        {" "}
        Group name: {`${groupName}`},
        <br />
      </div>

      <h4>
        <button onClick={() => go("policies")}>Edit</button>
      </h4>
      <div>
        Policies: {`${policies}`},
        <br />
      </div>
      <h4>
        <button onClick={() => go("users")}>Edit</button>
      </h4>
      <div>E-mail: {`${email}`}</div>
      <div>
        <button onClick={() => go("submit")}>Submit</button>
      </div>
    </div>
  );
};

export default Review;

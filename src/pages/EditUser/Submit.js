import React from "react";
const Submit = ({ navigation }) => {
  const { go } = navigation;
  return (
    <div>
      <button onClick={() => go("names")}>Edit User</button>
    </div>
  );
};

export default Submit;

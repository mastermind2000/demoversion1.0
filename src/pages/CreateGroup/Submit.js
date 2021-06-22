import React from "react";
const Submit = ({ navigation }) => {
  const { go } = navigation;
  return (
    <div>
      <button onClick={() => go("names")}>Create Group</button>
    </div>
  );
};

export default Submit;

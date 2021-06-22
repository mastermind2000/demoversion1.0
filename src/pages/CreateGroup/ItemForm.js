import React from "react";

const ItemForm = ({ label, children, type, ...otherProps }) => (
  <div>
    <div>
      <label>{label}</label>
      <input type={type} {...otherProps} />
    </div>
  </div>
);

export default ItemForm;

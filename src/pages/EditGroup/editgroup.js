import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import MultiStepForm from "./MultiStepForm";

export default function editgroup() {
  return (
    <div className="app">
      <div className="wrapper">
        <MultiStepForm />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<editgroup />, rootElement);

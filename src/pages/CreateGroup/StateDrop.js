import React from "react";

const policies = [
  [
    "P1",
    "Jupyter Notebook  of instance type ml.t2.medium for 60 mins duration"
  ],
  ["P2", "Jupyter Notebook of instance type ml.t2.large for 30 mins duration"],
  [
    "P3",
    "HyperParameter Tuning Job ml.t3.medium , no. of training jobs - 10, max parallel training job - 2"
  ],
  [
    "P4",
    "Processing Job ml.t3.medium , instance count - 1, addition volume for storage is 1 GB"
  ],
  [
    "P5",
    "Training Job ml.t3.medium, instance count - 1, additional volume for storage is 1GB"
  ]
];

const StateDrop = ({ label, ...others }) => (
  <div>
    <label>{label}</label>
    <select {...others}>
      {policies.map(([value, name]) => (
        <option value={value}>{name}</option>
      ))}
    </select>
  </div>
);

export default StateDrop;

import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Review from "./Review";
import Submit from "./Submit";

import "./styles.css";

const steps = [
  { id: "names" },
  { id: "policies" },
  { id: "review" },
  { id: "submit" }
];

const defaultData = {
  userName: "email@domain.com",

  policies: "P1"
};

const MultiStepForm = ({ images }) => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };

  switch (id) {
    case "names":
      return <Step1 {...props} />;
    case "policies":
      return <Step2 {...props} />;
    case "review":
      return <Review {...props} />;
    case "submit":
      return <Submit {...props} />;
    default:
      return null;
  }
};

export default MultiStepForm;

import React, { Component } from "react";
import FormUserDetails from "../components/FormUserDetails";
import FormPersonalDetails from "../components/FormPersonnalDetails";
import Confirm from "../components/Confirm";
import Success from "../components/Succes";
import DetailsForm from "../components/DetailsForm";
import Rendu from "../components/double";

export class UserForm extends Component {
  state = {
    step: 1,
    Name: "",
    status: "",
    Role: "",
    Group: "",
    Policy: ""
  };
  // Go to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };
  firstStep = () => {
    this.setState({
      step: 1
    });
  };
  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { Name, Role, Group, Policy } = this.state;
    const values = {
      Name,
      Role,
      Group,
      Policy
    };

    switch (step) {
      default:
        return <h1>User Forms not working. Enable Javascript!</h1>;
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );

      case 3:
        return (
          <DetailsForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );

      case 4:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 5:
        return <Success firstStep={this.firstStep} />;
    }
  }
}
export default UserForm;

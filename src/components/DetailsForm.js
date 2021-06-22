import React, { Component, Fragment } from "react";
import {
  AppBar,
  Button,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";

export class DetailsForm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  constructor() {
    super();
    this.state = {
      disabled: false
    };
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <Fragment>
        <AppBar style={{ background: "#8A0015" }} position="sticky">
          <Toolbar title="Add Policies">
            <Typography color="inherit" variant="title">
              Add Policies
            </Typography>
          </Toolbar>
        </AppBar>
        <br /><p>Policy</p>
        <TextField
          label="Policy"
          hintText="Policy"
          onChange={handleChange("Policy")}
          defaultValue={values.Policy}
        />
        <br />
        <br />
        <br />
        <Button
          style={{
            background: "#8A0015",
            color: "#FFFFFF",
            marginRight: "1em"
          }}
          label="Back"
          onClick={this.back}
        >
          Back
        </Button>
        <Button
          style={{
            background: "#8A0015",
            color: "#FFFFFF"
          }}
          label="Continue"
          onClick={this.continue}
        >
          {" "}
          Continue
        </Button>
      </Fragment>
    );
  }
}

export default DetailsForm;

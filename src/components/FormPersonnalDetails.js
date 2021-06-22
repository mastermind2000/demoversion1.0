import React, { Component, Fragment } from "react";
import {
  AppBar,
  Button,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";

export class FormPersonalDetails extends Component {
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
        <AppBar style={{ background: "#333" }} position="sticky">
          <Toolbar title="Add Roles/Group">
            <Typography color="inherit" variant="title">
              Add Roles/Group
            </Typography>
          </Toolbar>
        </AppBar>
        <p> Roles </p>
        <br />
        <TextField
          label="Role"
          hintText="Add Role"
          onChange={handleChange("Role")}
          defaultValue={values.Role}
        />
        <br />
        <br />
        <br />
        <p>Group</p>
        <br />
        <TextField
          label="Group"
          hintText="Add Group"
          onChange={handleChange("Group")}
          defaultValue={values.Group}
        />
        <br />
        <br />
        <br />
        <Button
          style={{
            background: "#333",
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
            background: "#333",
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

export default FormPersonalDetails;

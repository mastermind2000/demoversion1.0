import React, { Component, Fragment } from "react";
import {
  AppBar,
  Button,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";

export class FormUserDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <Fragment>
        <AppBar style={{ background: "#2E3B55" }} position="sticky">
          <Toolbar title="Enter User Details">
            <Typography color="inherit" variant="title">
              Enter Username
            </Typography>
          </Toolbar>
        </AppBar>
        <TextField
          label="Name"
          onChange={handleChange("Name")}
          defaultValue={values.Name}
        />
        <br />
        <br />
        <Button
          style={{ background: "#2E3B55", color: "#FFFFFF" }}
          label="Continue"
          onClick={this.continue}
        >
          Continue
        </Button>
      </Fragment>
    );
  }
}

export default FormUserDetails;

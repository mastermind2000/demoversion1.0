import React, { Component, Fragment } from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export class Confirm extends Component {
  continue = (e) => {
    e.preventDefault();
    //PROCESS FORM//
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { Name, Role, Group, Policy }
    } = this.props;
    return (
      <Fragment>
        <AppBar style={{ background: "#098F8F" }} position="sticky">
          <Toolbar title="Enter Personal Information">
            <Typography color="inherit" variant="title">
              Confirm Details
            </Typography>
          </Toolbar>
        </AppBar>

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Confirm your info
            </ListSubheader>
          }
        >
          <ListItem>
            <ListItemText primary="Name" secondary={Name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Role" secondary={Role} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Group" secondary={Group} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Policy" secondary={Policy} />
          </ListItem>
        </List>

        <br />

        <br />
        <Button
          style={{
            background: "#EE3B55",
            color: "#FFFFFF",
            marginRight: "1em"
          }}
          label="Continue"
          onClick={this.back}
        >
          Back
        </Button>
        <Button
          style={{
            background: "#3C61B8",
            color: "#FFFFFF",
            marginRight: "1em"
          }}
          label="Continue"
          onClick={this.continue}
        >
          Confirm and Continue
        </Button>
      </Fragment>
    );
  }
}

export default Confirm;

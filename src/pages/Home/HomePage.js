import React, { useState } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel
} from "@material-ui/core";
import CSVReader from "react-csv-reader";
/* Picker
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Add Roles</FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        label="Student"
                        control={
                          <Field
                            name="role"
                            component={Radio}
                            type="radio"
                            value="student"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Faculty"
                        control={
                          <Field
                            name="role"
                            component={Radio}
                            type="radio"
                            value="faculty"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Admin"
                        control={
                          <Field
                            name="role"
                            component={Radio}
                            type="radio"
                            value="admin"
                          />
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>*/
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./style.css";
export default function Home() {
  const [fdata, setData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    group: "",
    policy: "",
    account: "",
    aid: ""
  });
  const url =
    "https://0u6vb56kth.execute-api.us-east-2.amazonaws.com/dev/create";
  const handleForce = (data) => {
    setData(data);
  };
  const handleClick = () => {
    //console.log(fdata);
    var flag = 1;
    console.log(fdata.length);
    fdata.map((user) => {
      if (user.email && user.group && user.name && user.policy && user.role) {
        Axios.post(url, {
          name: user.name,
          email: user.email,
          role: user.role,
          group: user.group,
          policy: user.group
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            flag = 0;
            console.log(error);
          });
      }
    });
    if (flag === 1) {
      window.alert("Users Created");
    } else {
      window.alert("Some Error Occured");
    }
  };
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_")
  };
  const onSubmit = async (values) => {
    Axios.post(url, {
      name: values.name,
      email: values.email,
      role: values.role,
      group: values.group,
      policy: values.group,
      aid: values.aid
    })
      .then((response) => {
        console.log(response);
        window.alert("User Created");
      })
      .catch((error) => {
        console.log(error);
        window.alert("Some Error Occured");
      });
    console.log(values);
    //window.alert(JSON.stringify(values, 0, 2));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.group) {
      errors.group = "Select a group";
    }
    return errors;
  };
  const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  );
  return (
    <React.Fragment>
      <div className="t1">Single user Creation</div>
      <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
        <CssBaseline />
        <Form
          onSubmit={onSubmit}
          initialValues={{
            role: "student",
            account: "existingid",
            policy: "Policy1",
            aid: "405985732162"
          }}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="name"
                      component={TextField}
                      type="text"
                      label="Name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="email"
                      fullWidth
                      required
                      component={TextField}
                      type="email"
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Condition when="role" is="student">
                      <Field
                        fullWidth
                        name="group"
                        component={Select}
                        label="Apply Group"
                        formControlProps={{ fullWidth: true }}
                      >
                        <MenuItem value="Btech-cs-1">B-Tech CS 1st Year</MenuItem>
                        <MenuItem value="Btech-cs-2">B-Tech CS 2nd Year</MenuItem>
                        <MenuItem value="Btech-cs-3">B-Tech CS 3rd Year</MenuItem>
                        <MenuItem value="Btech-cs-4">B-Tech CS 4th Year</MenuItem>
                        <MenuItem value="Mtech-cs-1">M-Tech CS 1st Year</MenuItem>
                        <MenuItem value="Mtech-cs-2">M-Tech CS 2nd Year</MenuItem>

                      </Field>
                    </Condition>
                    <Condition when="role" is="faculty">
                      <Field
                        fullWidth
                        name="group"
                        component={Select}
                        label="Apply Group"
                        formControlProps={{ fullWidth: true }}
                      >
                        <MenuItem value="Faculty">Faculty</MenuItem>
                      </Field>
                    </Condition>
                    <Condition when="role" is="admin">
                      <Field
                        fullWidth
                        name="group"
                        component={Select}
                        label="Apply Group"
                        formControlProps={{ fullWidth: true }}
                      >
                        <MenuItem value="Admin">Admin</MenuItem>
                      </Field>
                    </Condition>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Where Do You want to create user
                      </FormLabel>
                      <RadioGroup row>
                        <FormControlLabel
                          label="Existing ID"
                          control={
                            <Field
                              name="account"
                              component={Radio}
                              type="radio"
                              value="existingid"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Create a new Account"
                          control={
                            <Field
                              name="account"
                              component={Radio}
                              type="radio"
                              value="newaccount"
                            />
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Condition when="account" is="existingid">
                      <Field
                        fullWidth
                        required
                        name="aid"
                        component={TextField}
                        type="text"
                        label="Account ID"
                      />
                    </Condition>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
        />
      </div>
      <div className="t2">Multiple user Creation (Upload .csv file)</div>
      <div className="fr">
        <CSVReader
          cssClass="react-csv-input"
          onFileLoaded={handleForce}
          parserOptions={papaparseOptions}
        />
      </div>
      <div className="bt">
        <button onClick={handleClick}> Upload </button>
      </div>
    </React.Fragment>
  );
}

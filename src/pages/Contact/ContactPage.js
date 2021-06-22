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
// Picker
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import CSVReader from "react-csv-reader";
import "./style.css";
export default function Contact() {
  const [fdata, setData] = useState(null);
  const url =
    "https://0u6vb56kth.execute-api.us-east-2.amazonaws.com/dev/delete";
  const handleForce = (data) => {
    setData(data);
  };
  const handleClick = () => {
    //console.log(fdata);
    var flag = 1;
    console.log(fdata.length);
    fdata.map((user) => {
      if (user.email && user.name) {
        Axios.post(url, {
          name: user.name,
          email: user.email
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
      window.alert("Users Deleted");
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
      email: values.email
    })
      .then((response) => {
        console.log(response);
        window.alert("User Deleted");
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
      errors.Name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    return errors;
  };
  return (
    <React.Fragment>
      <div className="t1"> Single User Deletion </div>
      <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
        <CssBaseline />
        <Form
          onSubmit={onSubmit}
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
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
        />
      </div>
      <div className="t2"> Multiple Users Deletion (Upload .csv file) </div>
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

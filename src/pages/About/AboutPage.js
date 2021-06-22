import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from "axios";
import { Form, Field } from "react-final-form";
import { useForm } from "react-hook-form";
import ReactTable from "react-table";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
//import Button from "@material-ui/core/Button";

//import '../../react-table/react-table.css';
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
import "./table.css";

const About = () => {
  const { handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const url = "https://4veg3aetvd.execute-api.us-east-2.amazonaws.com/dev/user";
  useEffect(() => {
    axios.get(url).then((json) => setData(json.data));

    //console.log(data);
  }, []);
  //console.log(data);
  var temp = data;
  console.log(temp);
  const onSubmit = (data) => {
    console.log(data);
  };
  const customTable = () => {
    const data = temp;
    const columns = [
      {
        title: "Email",
        field: "email"
      },
      {
        title: "Name",
        field: "name"
      },
      {
        title: "Group",
        field: "group"
      }
    ];
    return (
      <MaterialTable
        title=""
        data={data}
        columns={columns}
        editable={{
          onRowUpdate: (newData, oldData) => handleSubmit(onSubmit)()
        }}
      />
    );
  };
  const renderTable = () => {
    return (
      data &&
      data.map((instance) => {
        return (
          <tr>
            <td>{instance.email}</td>
            <td>{instance.name}</td>
            <td>{instance.group}</td>
          </tr>
        );
      })
    );
  };
  const master = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    );
  };
  const secondary = () => {
    const columns = [
      {
        Header: "ARN",
        ancessor: "arn"
      },
      {
        Header: "Instance Name",
        ancessor: "iname"
      },
      {
        Header: "Status",
        ancessor: "statud"
      },
      {
        Header: "Time Left",
        ancessor: "tl"
      }
    ];
    return <ReactTable data={data} columns={columns} />;
  };
  const DeleteButton = () => {
    return (
      <Button onClick={() => (window.location = "/contact")}>
        <DeleteIcon />
      </Button>
    );
  };
  const AddButton = () => {
    return (
      <Button onClick={() => (window.location = "/createuser")}>
        <AddIcon />
      </Button>
    );
  };
  return (
    <React.Fragment>
      <div className="user">Users</div>
      <div id="app">{customTable()}</div>
      <div id="routing">
        {DeleteButton()}
        {AddButton()}
      </div>
    </React.Fragment>
  );
};

export default About;

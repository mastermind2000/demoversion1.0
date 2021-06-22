import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from "axios";
import { Form, Field } from "react-final-form";
import ReactTable from "react-table";
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
import { Bar } from "react-chartjs-2";
// Picker

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./table.css";

const Sauvegarde = () => {
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [trig, setTrig] = useState(false);
  const url =
    "https://0u6vb56kth.execute-api.us-east-2.amazonaws.com/dev/monitor";
  const handleClick = () => {
    setTrigger(true);
  };
  const handClick = () => {
    setTrig(true);
  };
  /*const handleClick = () => {
    axios.get(url).then((json) => setData(json.data));

    console.log(data);
  };*/
  useEffect(() => {
    (async () => {
      const json = await axios.get(url);
      setData(json.data.body);
    })();
  }, []);
  console.log(data);
  /*useEffect(() => {
    axios.get(url).then((json) => setData(json.data));

    console.log(data);
  }, []);*/
  var ty1 = 0;
  var ty2 = 0;
  var arn = [];
  var time = [];
  data.map((instance) => {
    {
      var det = instance.iname + " " + instance.itype;
      arn.push(det);
      time.push(instance.tu);
      instance.itype === "ml.t2.medium" ? ty1++ : ty2++;
    }
  });
  const chart = () => {
    const bdata = {
      labels: arn,
      datasets: [
        {
          label: "# Time Used",
          data: time,
          backgroundColor: ["rgba(255, 99, 132, 0.8)"],
          borderColor: ["rgba(255, 99, 132, 0.8)"],
          borderWidth: 1
        }
      ]
    };
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
    return <Bar data={bdata} options={options} />;
  };
  const rendsub = () => {
    var tu1 = 0;
    var tu2 = 0;
    var dt1 = 60;
    var dt2 = 30;
    var tt1 = ty1 * 60;
    var tt2 = ty2 * 30;
    data.map((instance) => {
      {
        instance.itype === "ml.t2.medium"
          ? (tu1 += instance.tu)
          : (tu2 += instance.tu);
      }
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Instance</th>
            <th>Type</th>
            <th># Instances</th>
            <th>Total Time</th>
            <th>Time Used</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jupyter Notebook</td>
            <td>ml.t2.medium</td>
            <td>{ty1}</td>
            <td>{dt1}</td>
            <td>{tu1}</td>
          </tr>
          <tr>
            <td>Jupyter Notebook</td>
            <td>ml.t2.large</td>
            <td>{ty2}</td>
            <td>{dt2}</td>
            <td>{tu2}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  const renderTable = () => {
    console.log("The type 1 " + ty1 + " The type 2 " + ty2);
    return (
      data &&
      data.map((instance) => {
        return (
          <tr>
            <td>{instance.type}</td>
            <td>{instance.itype}</td>
            <td>{instance.arn}</td>
            <td>{instance.iname}</td>
            <td>{instance.status}</td>
            <td>{instance.tu}</td>
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
            <th>Type</th>
            <th>Instance Type</th>
            <th>Arn</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actual Usage</th>
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
  return (
    <React.Fragment>
      <div className="summary"> Summary </div>
      <div>{rendsub()}</div>
      <div className="monb">
        <button onClick={handleClick}> Show Details </button>
        <button onClick={handClick}> Show Chart </button>
      </div>
      <div className="det">{trigger && "Detail"}</div>
      <div className="detail">{trigger && master()}</div>
      <div className="ct">{trig && "Chart"}</div>
      <div className="ap">{trig && chart()}</div>
    </React.Fragment>
    //<div> In progress </div>
  );
};

export default Sauvegarde;

`use strict`
var AWS = require('aws-sdk');
var sagemaker = new AWS.SageMaker();
var db = new AWS.DynamoDB.DocumentClient();
var mp = new Map();
var c = 0;
var threshold = new Map();
threshold.set("ml.t2.medium",60);
threshold.set("ml.t2.large",30);
exports.handler = (event) => {
    var par = {
      TableName: process.env.TAB
    };
    db.scan(par,function(err,data){
      if(err){
        console.log(err);
      }
      else{
        //console.log(data);
        c = data.Count;
        //for()
        //console.log(data.Items[0]);
       // var arn = data.Items[0].arn;
       // console.log(arn);
        for(var i = 0; i < c; i++){
          //console.log(i);
          mp.set(data.Items[i].arn,data.Items[i].tu);
        }
      }
    });
    console.log(c);
    console.log(mp);
    if(mp.size > 0){
      var params = {
        SortBy : "CreationTime",
        SortOrder : "Ascending"
      };
      sagemaker.listNotebookInstances(params,function(err,data){
        if(err){
          console.log(err);
        }
        else{
          for(var i = 0; i < data.NotebookInstances.length; i++){
            var k = data.NotebookInstances[i].NotebookInstanceArn;
            var tl = threshold.get(data.NotebookInstances[i].InstanceType);
            var st = data.NotebookInstances[i].NotebookInstanceStatus;
            console.log(st);
            if(!mp.has(k)){
              console.log("here");
              mp.set(k,0);
              var t = mp.get(k);
              console.log("Here " + t);
              var pput = {
                TableName: process.env.TAB,
                Item:{
                  type: "Jupyter Notebook",
                  arn: data.NotebookInstances[i].NotebookInstanceArn,
                  iname: data.NotebookInstances[i].NotebookInstanceName,
                  itype: data.NotebookInstances[i].InstanceType,
                  status: data.NotebookInstances[i].NotebookInstanceStatus,
                  tl: tl,
                  tu: t
                }
              };
              db.put(pput,function(err,data){
                if(err){
                  console.log(err);
                }
                else{
                  console.log(data);
                }
              });
            }
            else{
              var t = mp.get(k);
              if(st == "InService"){
                t++;
                var pput = {
                  TableName: process.env.TAB,
                  Item:{
                    type: "Jupyter Notebook",
                    arn: data.NotebookInstances[i].NotebookInstanceArn,
                    iname: data.NotebookInstances[i].NotebookInstanceName,
                    itype: data.NotebookInstances[i].InstanceType,
                    status: data.NotebookInstances[i].NotebookInstanceStatus,
                    tl: tl,
                    tu: t
                  }
                };
                db.put(pput,function(err,data){
                  if(err){
                    console.log(err);
                  }
                  else{
                    console.log(data);
                  }
                });
              }
              else{
                var pput = {
                  TableName: process.env.TABLE,
                  Item:{
                    type: "Jupyter Notebook",
                    arn: data.NotebookInstances[i].NotebookInstanceArn,
                    iname: data.NotebookInstances[i].NotebookInstanceName,
                    itype: data.NotebookInstances[i].InstanceType,
                    status: data.NotebookInstances[i].NotebookInstanceStatus,
                    tl: tl,
                    tu: t
                  }
                };
                db.put(pput,function(err,data){
                  if(err){
                    console.log(err);
                  }
                  else{
                    console.log(data);
                  }
                });
                console.log("There " + t);
              }
            }
          }
        }
      });
    }
    else{
      var params = {
        SortBy : "CreationTime",
        SortOrder : "Ascending"
      };
      sagemaker.listNotebookInstances(params,function(err,data){
        if(err){
          console.log(err);
        }
        else{
          for(var i = 0; i < data.NotebookInstances.length; i++){
            var k = data.NotebookInstances[i].NotebookInstanceArn;
            var tl = threshold.get(data.NotebookInstances[i].InstanceType);
            var st = data.NotebookInstances[i].NotebookInstanceStatus;
            console.log(st);
            if(!mp.has(k)){
              console.log("here");
              mp.set(k,0);
              var t = mp.get(k);
              console.log("Here " + t);
              var pput = {
                TableName: process.env.TAB,
                Item:{
                  type: "Jupyter Notebook",
                  arn: data.NotebookInstances[i].NotebookInstanceArn,
                  iname: data.NotebookInstances[i].NotebookInstanceName,
                  itype: data.NotebookInstances[i].InstanceType,
                  status: data.NotebookInstances[i].NotebookInstanceStatus,
                  tl: tl,
                  tu: t
                }
              };
              db.put(pput,function(err,data){
                if(err){
                  console.log(err);
                }
                else{
                  console.log(data);
                }
              });
            }
          }
        }
      });
    }
};

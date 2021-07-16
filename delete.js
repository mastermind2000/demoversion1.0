`use strict`
var AWS = require('aws-sdk');
var db = new AWS.DynamoDB.DocumentClient();
var iam = new AWS.IAM();
exports.handler = (event, context, callback) => {
    // TODO implement
    var params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key:{
            "id": event.email
        }
    };
    var pld = {
      UserName:event.name
    };
    iam.deleteLoginProfile(pld,function(err,data){
      if(err){
        console.log(err);
      }
      else{
        iam.listGroupsForUser(pld,function(err,data){
          if(err){
            console.log(err);
          }
          else{
            for(var i = 0; i < data.Groups.length; i++){
              var pg = {
                GroupName: data.Groups[i].GroupName,
                UserName: event.name
              };
              iam.removeUserFromGroup(pg,function(err,data){
                if(err){
                  console.log(err);
                }
                else{
                  console.log("Removed");
                }
              }); 
              
            }
            var pd = {
              UserName: event.name
            };
            iam.deleteUser(pd,function(err,data){
              if(err){
                console.log(err);
              }
              else{
                console.log("success");
              }
            });
          }
        });
      }
    });
    db.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t remove',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,DELETE"
        },
      body: JSON.stringify({}),
    };
    callback(null, response);
  });
    
};

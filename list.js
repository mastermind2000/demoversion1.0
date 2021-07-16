`use strict`
var AWS = require('aws-sdk');
var sagemaker = new AWS.SageMaker();
var db = new AWS.DynamoDB.DocumentClient();
exports.handler = (event, context, callback) => {
    var params = {
      TableName: process.env.TAB
    };
    db.scan(params,(error,data) =>{
      if(error){
        console.log(error);
        callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t remove',
        });
      }
      else{
        var result = JSON.stringify(data);
        result = data.Items;
        
        //result = JSON.parse(result);
        const response = {
          statusCode: 200,
          headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
          body: result,
        };
        callback(null, response);
      }
      
    });
};

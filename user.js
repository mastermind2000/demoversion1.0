'use strict';

var AWS = require("aws-sdk"); 



// Set the region 
//AWS.config.update({region: 'REGION'});

var dynamoDb = new AWS.DynamoDB.DocumentClient();
// Create the IAM service object
var iam = new AWS.IAM({apiVersion: '2010-05-08'});
var ses = new AWS.SES();
var s3 = new AWS.S3();
var gps = new Map();
var gp = new Map();

gps.set("Btech-cs-1","Btech-cs-1.txt");
gps.set("Btech-cs-2","Btech-cs-2.txt");
gps.set("Btech-cs-3","Btech-cs-3.txt");
gps.set("Btech-cs-4","Btech-cs-4.txt");
gps.set("Mtech-cs-1","Mtech-cs-1.txt");
gps.set("Mtech-cs-2","Mtech-cs-2.txt");



function createnattach(fl,pl){
  var params = {
    Bucket: "dashboard-policies",
    Key: fl
  };
  s3.getObject(params,function(err,data){
    if(err){
      console.log(err);
    }
    else{
      var res = data.Body.toString();
      var pdata = JSON.stringify(res);
      pdata = JSON.parse(pdata);
      var pp = {
        PolicyDocument: pdata,
        PolicyName: pl
      };
      iam.createPolicy(pp,function(err,data){
        if(err){
          console.log(err);
        }
        else{
          console.log(data);
          var arn = data.Policy.Arn;
          attach(pl,arn);
        }
      });
    }
  });
}

function attach(group,arn){
  var params = {
    GroupName: group,
    PolicyArn: arn
  };
  iam.attachGroupPolicy(params,function(err,data){
    if(err){
      console.log(err);
    }
    else{
      console.log(data);
    }
  });
}
function cg(g){
  var grp = g;
  var params = {
    GroupName: g
  };
  iam.getGroup(params,function(err,data){
    if(err && err.code === "NoSuchEntity"){
      iam.createGroup(params,function(err,data){
        if(err){
          console.log(err);
        }
        else{
          console.log("Group created");
        }
      });
    }
    else{
      console.log("Exists");
      //attach()
    }
  });
}
function init(){
  var params = {
    Bucket: "dashboard-policies",
    Key: "config.txt"
  };
  s3.getObject(params,(err,data)=>{
    if(err){
       console.log(err);
    }
    else{
      var res = data.Body.toString();
      var x = res.split("\n");
               //console.log(x);
      for(var i = 0; i < x.length; i++){
          var l = x[i].split(",");
         // console.log(l);
                    //console.log(l);
          gp.set(l[0],l[1]);
          cg(l[0]);
          
      }
      /*for(var j = 0; j < x.length; j++){
        var m = x[i].split(",");
        cg(m[0])
      }
      for(var k = 0; k < x.length; k++){
        var n = x[i].split(",");
        console.log(n);
        createnattach(n[1],n[0]);
      }*/
      gp.forEach((policy, group) => {
        createnattach(policy,group);
      });
     // console.log(gp);
    }
  });
}

exports.handler = (event, context, callback) => {
  //const data = JSON.parse(event.body);
  init();
  let formdata = '';
  formdata += 'Username: ' + event.name + '\n\n' + 'Password: dummyPass@' + '\n\n' + 'Link: https://' + event.aid + '.signin.aws.amazon.com/console' + '\n\n';
  var pget = {
    TableName: process.env.TABLE,
    Key:{
      id: event.email
    }
  };
  dynamoDb.get(pget,function(err,data){
    var size = 0;
    if(err){
      console.log(err);
    }
    else{
      for(var key in data){
        size++;
      }
      if(size == 0){
        
        var fl = gps.get(event.group);
        var pl = event.policy;
        var params = {
          TableName: process.env.TABLE,
          Item: {
            id: event.email,
            name: event.name,
            email: event.email,
            role: event.role,
            group: event.group,
            policy: event.policy
          },
        };
    
        dynamoDb.put(params,function(err,data){
          if(err){
            console.log(err);
          }
          else{
            console.log(data);
          }
        });
        var par = {
          UserName: event.name
        };
        
        
        iam.createUser(par, function(err, data) {
          if (err) {
            console.log("Error", err);
          } else {
            var parl = {
              Password: "dummyPass@",
              UserName: event.name,
              PasswordResetRequired:true
            };
            iam.createLoginProfile(parl,function(err,data){
              if(err){
                console.log(err);
              }
              else{
                console.log(data);
              }
            });
            console.log("Success", data);
          }
        });
        var parg = {
          GroupName: event.group
        };
        iam.getGroup(parg,function(err,data){
           if(err && err.code === 'NoSuchEntity'){
              console.log("Here");
              iam.createGroup(parg,function(err,data){
                  if(err){
                      console.log(err);
                  }  
                  else{
                      var parm = {
                        GroupName: event.group,
                        UserName: event.name
                      };
                      iam.addUserToGroup(parm,function(err,data){
                          if(err){
                             console.log(err);
                          } 
                          else{
                             console.log(data);
                          }
                      });
                      createnattach(fl,pl);
                  }
              });
           }
           else{
              console.log("Exists");
              var parmg = {
                  GroupName: event.group,
                  UserName: event.name
              };
              iam.addUserToGroup(parmg,function(err,data){
                if(err){
                    console.log(err);
                } 
                else{
                    console.log(data);
                }
              });
          }
          
        });
        
      }
      else{
        console.log("User Exists");
      }
    }
  });
  var parem = {
        Destination: {
            ToAddresses: [event.email]
        },
        Message: {
            Body: {
                Text: { Data: formdata 
                    
                }
                
            },
            
            Subject: { Data: "User Created"
                
            }
        },
        Source: "viharsha@amazon.com"
    };
  ses.sendEmail(parem,function(err,data){
    callback(null, {err: err, data: data});
    if (err) {
        console.log(err);
        context.fail(err);
    } 
    else {
            
        console.log(data);
        context.succeed(event);
    }
  });
  /*var params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: event.email,
      name: event.name,
      email: event.email,
      role: event.role,
      group: event.group,
      policy: event.policy
    },
  };
 
  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
  
  var par = {
    UserName: event.name
  };
  
  
  iam.createUser(par, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
       console.log("Success", data);
    }
  });
  var parg = {
      GroupName: event.group
    };
    iam.getGroup(parg,function(err,data){
       if(err && err.code === 'NoSuchEntity'){
          console.log("Here");
          iam.createGroup(parg,function(err,data){
                if(err){
                    console.log(err);
                }  
                else{
                    var parm = {
                        GroupName: event.group,
                        UserName: event.name
                    };
                    iam.addUserToGroup(parm,function(err,data){
                       if(err){
                           console.log(err);
                       } 
                       else{
                           console.log(data);
                       }
                    });
                    console.log(data);
                }
          });
        }
        else{
           console.log("Exists");
           var parmg = {
                GroupName: event.group,
                UserName: event.name
            };
            iam.addUserToGroup(parmg,function(err,data){
                if(err){
                    console.log(err);
                } 
                else{
                    console.log(data);
                }
            });
       }
    
    });*/
};
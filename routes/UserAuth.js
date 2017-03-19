var express=require('express');
var router=new express.Router();
var mongoose=require('mongoose');
var User=require('../model/user');
var SourceDestinationInfo=require('../model/SourceDestinationInfo');



mongoose.connect('mongodb://localhost:27017/Map_DB');

router.post('/auth',function(req,res){
  var UserObj=new User(req.body);
  UserObj.username=req.body.username;
  UserObj.password=req.body.password;


  User.find({"username": UserObj.username,"password": UserObj.password},function(err,list){
    if(err){
      res.send(err);
    }
    else{
      if(list.length>0){
        req.session.name=req.body.username;
        console.log("*****"+req.session.name)
        console.log("in success flow");
        res.send("success");

      }
      else {
        console.log("in failure flow");
        res.send("failure");
      }
    }
  })

});


router.put('/update',function(req,res){

  var source=req.body.source;
  var destination=req.body.destination;
//  var username=req.body.username;
  var currentdate=new Date();
  var newdate=currentdate.toISOString();
  var username=req.session.name;
console.log("IN UPDATE:"+username);
  var dbDate,dbMonth,dbYear,currDate,currMonth,currYear;
  var isoDate;
  User.find({"username":username},{_id:1},function(err,data){
    if(err){
      res.send(err);
    }
    else{

      var userid=data.map(function(el) { return el._id } )[0];

      SourceDestinationInfo.find({user_id:userid},{"details":{$slice:-1}},function(err,list){
        if(err){
          res.send(err);
        }
        else{

          list.forEach(function(i){

            i.details.forEach(function(j){
              dbDate=j.date.getDate();
              dbMonth=j.date.getMonth();
              dbYear=j.date.getFullYear();
              isoDate=j.date.toISOString();
              console.log("FROM DB"+dbDate+"**"+dbMonth+"**"+dbYear);
            });
          });


          currDate=currentdate.getDate();
          currMonth=currentdate.getMonth();
          currYear=currentdate.getFullYear();

          if((dbDate==currDate) && (dbMonth==currMonth) && (dbYear==currYear))
          {
            //The positional $ operator identifies an element in an array to update without explicitly specifying the position of the element in the array.
            SourceDestinationInfo.update({user_id:userid,"details.date":isoDate},{$push:{"details.$.list":{source:source,destination:destination}}},function(err,result){
              if(err){
                console.log(err);
              }else{
                console.log(result);
                res.send("success");
              }

            });
          }
          else{

            SourceDestinationInfo.update({user_id:userid},{$push:{details:{date:newdate,list:[{source:source,destination:destination}]}}},function(err,result){
              if(err)
              {
                console.log(err);
              } else{
                console.log(result);
                res.send("success");
              }
            });
          }
        }
      });


    }
  });
});


router.post('/getData',function(req,res){
var userName=req.session.name;
console.log("In Get Data : userName:  "+userName);

  User.find({username:userName},function(err,data){
   if(err){
     res.send(err);
   }else{
     var userid=data.map(function(e1){ return e1._id})[0];
     console.log("user id:%%%"+userid);
     SourceDestinationInfo.find({user_id:userid},function(err,list){
       if(err){
         res.send(err);
       }else{
         console.log(list);
         res.send(list);
       }

     });
   }
  });

});


module.exports=router;

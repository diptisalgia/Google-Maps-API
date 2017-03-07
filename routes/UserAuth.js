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
  var username=req.body.username;
  var currentdate=req.body.date;
  console.log("source obtained: "+source);
  console.log("destination obtained: "+destination);


  User.find({"username":username},{_id:1},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      console.log("data out of query: "+"  "+ data+"  "+data.map(function(el) { return el._id } ) );
      var x=data.map(function(el) { return el._id } )[0];
      var obj=new SourceDestinationInfo(req,res);
      console.log("Type Of : "+typeof x);
      SourceDestinationInfo.update({user_id:x,"details.date":"2017-03-02T09:51:05.908Z"},{$push:{"details.$.list":{source:source,destination:destination}}},function(err,result){
        if(err){
          console.log(err);
        }else{
          //console.log(result.map(function(el) { return el.list[0]; }));
          console.log(result);
          res.send("success");
        }

      });
    }
  });
});


router.get('/getData',function(req,res){

  SourceDestinationInfo.find({},function(err,list){
    if(err){
      res.send(err);
    }
    else{

        res.send(list);

    }
  })

});
module.exports=router;

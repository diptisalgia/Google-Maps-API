var express=require('express');

var router=new express.Router();
var mongoose=require('mongoose');
var User=require('../model/user')
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

module.exports=router;

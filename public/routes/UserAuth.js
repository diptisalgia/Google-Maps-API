var express=require('express');

var router=new express.Router();
 


router.post('/auth',function(req,res){
   var UserObj=new User(req.body);
   UserObj.username=req.body.username;
   UserObj.password=req.body.password;

   User.find({"username": UserObj.username,"password": UserObj.password},function(err,list){
     if(err){
       res.send(err);
     }
     else{
        if(list.length>0)
       res.send("success");
       else {
         res.send("failure");
       }
     }
   })

});

module.exports=router;

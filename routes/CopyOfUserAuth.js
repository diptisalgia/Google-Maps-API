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


router.post('/update',function(req,res){

  var source=req.body.source;
  var destination=req.body.destination;
  var username=req.body.username;
  console.log("source obtained: "+source);
  console.log("destination obtained: "+destination);


  User.find({"username":username},{sno:1},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      console.log("data out of query: "+data.map(function(el) { return el.sno } ) );
      var x=data.map(function(el) { return el.sno } )[0];
      var obj=new SourceDestinationInfo(req,res);

      obj.sno=x;
      obj.list.source=source;
      obj.list.destination=destination
      console.log(obj.sno+" "+obj.list.source+" "+obj.list.destination)
      //       SourceDestinationInfo.update({sno:obj.sno},{$set:{list:{"source":source,"destination":destination}}},function(err,result){
      //       if(err){
      //         console.log(err);
      //       }else{
      //         console.log(result);
      //       }
      //     });
      //       res.send("success");
      //     }
      //   });



      //   SourceDestinationInfo.find({},function(err,result){
      //   if(err){
      //     console.log(err);
      //   }else{
      //     console.log(result.map(function(el) { return el.list[0]; }));
      //
      //   res.send("success");
      // }
      //
      // });

      SourceDestinationInfo.update({sno:11},{$push:{list:{source:source,destination:destination}}},function(err,result){
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
    module.exports=router;

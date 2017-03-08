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
  var currentdate=new Date();
  console.log("source obtained: "+source);
  console.log("destination obtained: "+destination);
  var db_date,db_month,db_year,curr_date,curr_month,curr_year;
  var isoDate;
  User.find({"username":username},{_id:1},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      console.log("data out of query: "+"  "+ data+"  "+data.map(function(el) { return el._id } ) );
      var userid=data.map(function(el) { return el._id } )[0];

      SourceDestinationInfo.find({user_id:userid},{"details":{$slice:-1}},function(err,list){
        if(err){
          res.send(err);
        }
        else{

          list.forEach(function(i){

            i.details.forEach(function(j){
              db_date=j.date.getDate();
              db_month=j.date.getMonth();
              db_year=j.date.getFullYear();
              isoDate=j.date.toISOString();
              console.log("FROM DB"+db_date+"**"+db_month+"**"+db_year);
            });
          });


          curr_date=currentdate.getDate();
          curr_month=currentdate.getMonth();
          curr_year=currentdate.getFullYear();
          console.log(curr_date+"**"+curr_month+"**"+curr_year);
          if((db_date==curr_date) && (db_month==curr_month) && (db_year==curr_year))
          {
            //The positional $ operator identifies an element in an array to update without explicitly specifying the position of the element in the array.
            SourceDestinationInfo.update({user_id:userid,"details.date":isoDate},{$push:{"details.$.list":{source:source,destination:destination}}},function(err,result){
              if(err){
                console.log(err);
              }else{
                //console.log(result.map(function(el) { return el.list[0]; }));
                console.log(result);
                res.send("success");
              }

            });
          }
          else{
             
          }



        }
      });


    }
  });
});


router.get('/getData',function(req,res){

  SourceDestinationInfo.find({user_id:"58b416a288e8e1e1aff52982"},{"details":{$slice:-1}},function(err,list){
    var dd;
    if(err){
      res.send(err);
    }
    else{var currentdate=new Date();
      list.forEach(function(i){
        console.log(i.user_id);
        i.details.forEach(function(j){
          console.log(j.date+" "+j.list);
          console.log(j.date.getDate());
          console.log(j.date.getMonth());
          console.log(j.date.getFullYear());
          console.log("****j.date******"+j.date);
        });
      });
      console.log("Current date:"+new Date());
      console.log(currentdate.getDate());
      console.log(currentdate.getMonth());
      console.log(currentdate.getFullYear());

      res.send(list);

    }
  })

});
module.exports=router;

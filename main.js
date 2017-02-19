// call the packages we need
var express=require('express');  // call express
var app=express(); // define our app using express
var bodyparser=require('body-parser');
var router=express.Router();
var mongoose=require('mongoose');
var User=require('./model/user');

mongoose.connect('mongodb://localhost:27017/Map_DB');



//support parsing of application/json type post data
app.use(bodyparser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyparser.urlencoded({extended:true}));

//we have used the use method of the app object. This method tells Express which folder we want to use for serving static assets
app.use(express.static(__dirname+'/public'));

app.use(express.static(__dirname+'/Views'));

// apply the routes to our application
app.use('/api',router);



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
          console.log("Success");
          res.send("success");
          //res.sendFile(__dirname + "/Views/" + "map.html");
        }

       else {
         res.send("failure");
       }
     }
   })

});


//app.use('/user', require('./routes/UserAuth').middleware);

app.get('/',function(req,res){
  res.sendFile(__dirname+'/Views/'+'Login.html');
});


app.get('/map',function(req,res){
  res.sendFile(__dirname+'/Views/'+'map.html');
});

app.listen(5000,function(){
  console.log('listening on port 5000');
});

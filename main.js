// call the packages we need
var express=require('express');  // call express
var app=express(); // define our app using express
var bodyparser=require('body-parser');
//var router=express.Router();
//var mongoose=require('mongoose');
//var User=require('./model/user');
var router=require('./routes/UserAuth');
// mongoose.connect('mongodb://localhost:27017/Map_DB');



//support parsing of application/json type post data
app.use(bodyparser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyparser.urlencoded({extended:true}));

//we have used the use method of the app object. This method tells Express which folder we want to use for serving static assets
app.use(express.static(__dirname+'/public'));

app.use(express.static(__dirname+'/Views'));

// apply the routes to our application
app.use('/api',router);

app.use('/auth', router);

app.use('/save',router);

app.get('/',function(req,res){
  res.sendFile(__dirname+'/Views/'+'Login.html');
});


app.get('/map',function(req,res){
   res.sendFile(__dirname+'/Views/'+'map.html');

});

app.listen(5000,function(){
  console.log('listening on port 5000');
});

//https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions

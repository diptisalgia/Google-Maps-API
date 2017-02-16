// call the packages we need
var express=require('express');  // call express
var app=express(); // define our app using express
var bodyparser=require('body-parser');
var http=require('http');
var server=http.createServer(app);

var router=express.Router(); // get an instance of the express Router

//support parsing of application/json type post data
app.use(bodyparser.json);

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyparser.urlencoded({extended:true}));

//we have used the use method of the app object. This method tells Express which folder we want to use for serving static assets
app.use(express.static(__dirname+'/public'));

app.use(express.static(__dirname+'/Views'));


router.get('/',function(req,res){
  res.sendFile(__dirname+'/Views'+'Login.html');
});


server.listen(5000,function(){
  console.log('listening on port 3000');
});

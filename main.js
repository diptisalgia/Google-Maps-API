// call the packages we need
var express=require('express');  // call express
var app=express(); // define our app using express
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
//var router=express.Router();

//support parsing of application/json type post data
app.use(bodyparser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyparser.urlencoded({extended:true}));

//we have used the use method of the app object. This method tells Express which folder we want to use for serving static assets
app.use(express.static(__dirname+'/public'));

app.use(express.static(__dirname+'/Views'));


app.get('/',function(req,res){
  res.sendFile(__dirname+'/Views/'+'Login.html');
});


//Middleware : A set of statements that is executed for every incoming request
//Routes : A set of statements that defines server routes, endpoints, and pages
//https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
//http://junerockwell.com/difference-parameters-query-strings-express-js/
//http://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get
// this imp :https://www.terlici.com/2014/09/29/express-router.html
//https://www.terlici.com/2014/08/25/best-practices-express-structure.html


app.post('/map',function(req,res){
if(req.body.username=='abcd' && req.body.password=='1234'){
 res.sendFile(__dirname+'/Views/'+"map.html");
}
else{
  res.sendFile(__dirname+'/Views/'+"Login.html");
}

});

app.listen(5000,function(){
  console.log('listening on port 5000');
});

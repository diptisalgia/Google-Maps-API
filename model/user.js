var mongoose=require('mongoose');
//The mongoose Schema is what is used to define attributes for our documents.
var Schema=mongoose.Schema;
// create a schema
var userSchema=new Schema({
  username:{type:String,required:true,unique:true},
  password:{type:String,required:true}
});

// the schema is useless so far
// we need to create a model using it
var User=mongoose.model('userLoginDetails',userSchema);

// make this available to our users in our Node applications
module.exports(User);

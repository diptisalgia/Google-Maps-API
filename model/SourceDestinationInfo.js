var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var infoSchema=new Schema({
  //sno:{type:mongoose.Schema.Types.ObjectId},
  sno:{type:String},
  list:[{_id:false,source:String,destination:String}]
});

module.exports=mongoose.model('sourcedestinationinfos',infoSchema);
//https://specify.io/how-tos/find-documents-in-mongodb-using-the-mongo-shell
//http://doduck.com/node-js-mongodb-hello-world-example/

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var infoSchema=new Schema({
   sno:{type:mongoose.Schema.Types.ObjectId},
   list:[{source:String,destination:String}]
});

module.exports=mongoose.model('sourcedestinationinfos',infoSchema);

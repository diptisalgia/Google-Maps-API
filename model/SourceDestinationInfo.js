var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var infoSchema=new Schema({
  //sno:{type:mongoose.Schema.Types.ObjectId},
  user_id:{type:String},
  details:[{_id:false,date:Date,list:[{_id:false,source:String,destination:String}]}]

});

module.exports=mongoose.model('sourcedestinationinfos',infoSchema);
//https://specify.io/how-tos/find-documents-in-mongodb-using-the-mongo-shell
//http://doduck.com/node-js-mongodb-hello-world-example/
//http://techbrij.com/mongodb-aggregation-query-records-max
//http://davenewson.com/posts/2013/conditional-aggregation-on-arrays-of-objects-in-mongodb.html
//http://pingax.com/mongodb-aggregation-examples
//http://stackoverflow.com/questions/23254363/return-only-specific-fields-from-projection-array-sub-document
//https://docs.mongodb.com/manual/reference/operator/update-array/
//	//https://learn.jquery.com/ajax/jquery-ajax-methods/

//for session managment:
//https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions
//https://www.thepolyglotdeveloper.com/2015/01/session-management-expressjs-web-application/

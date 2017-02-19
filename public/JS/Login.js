var login={


  Init:function(){
   var me=login;
   me.BindEvents();
 },
  BindEvents:function(){
    var me=login;
    $('#error_message').hide();
    $('#submit').off("click");
    $('#submit').on("click",function(){
    var request = JSON.stringify({username:$("#username").val(),password:$("#password").val()});
    $.ajax({
               url: "/api/auth",
               type: "POST",
               data: request,
               contentType: "application/json",
               success: function(data) {
                //  console.log(data);
                //  console.log('process success');
                window.location.replace("/map");
              },
               error: function(err) {
                 console.log(err);
               },
             });
    });
   }

}
//all jQuery methods are inside a document ready event
$(function(){
  login.Init();
});

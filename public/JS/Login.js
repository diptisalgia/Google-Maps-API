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
      var request = JSON.stringify({username:$("#username").val().trim(),password:$("#password").val().trim()});
      $.ajax({
        url: "/api/auth",
        type: "POST",
        data: request,
        contentType: "application/json",
        success: function(data) {

          if(data=="success"){
          //  sessionStorage.setItem("username",$("#username").val().trim());
            window.location.href="/map";
          }
          else {
            $("#username").val('');
            $("#password").val('');
            $('#error_message').show();


          }
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

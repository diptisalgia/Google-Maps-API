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
      
    });

  }
}

//all jQuery methods are inside a document ready event
$('document').ready(function(){
  login.init();
});

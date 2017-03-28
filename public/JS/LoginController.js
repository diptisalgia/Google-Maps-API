var module=angular.module("myApp",[]);
module.controller("LoginController",function($scope,$http){
 $scope.username;
 $scope.password;
 $scope.error_message=false;

 $scope.submit=function(userdetails){
 var data={username:$scope.username,password:$scope.password};
   var config = {
             headers : {
                       'Content-Type': 'application/json'
             }
         }
console.log(data);
   $http.post('/api/auth',data,config)
   .then(
     function(response){
       console.log(response);
     if(response.data=="success"){
           window.location.href="/map";
      }
     },
     function(response){
       $("#username").val('');
       $("#password").val('');
       $scope.error_message=true;
     }
   )
 }
});

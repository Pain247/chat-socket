 (function(window,angular,undefined){
   angular.module('chatApp').controller('userCreationCtrl',['$rootScope','$scope',function($rootScope,$scope){
     var vm = this;
     var socket = window.io(window.location.origin+"/");
     $scope.value = true;
     vm.username = undefined;
     vm.users = [];
     vm.createUser= function(username){
       $rootScope.$emit('new-user',username);
     socket.emit('new-join', username);
   }
     socket.on("receive-join",function(msg){
       console.log(msg);
       var k=0;
       $scope.$apply(function(){
         for(var i=0; i<vm.users.length;i++){
           if(vm.users[i]===msg) k=1; break;
         }
         if(k===0)vm.users.push(msg)
         $scope.value= false;
         console.log(vm.users)
       });

     });
   }]);
 })(window,window.angular);

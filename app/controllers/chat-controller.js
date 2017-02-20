(function(window,angular,undefined){
  angular.module('chatApp').controller('chatCtrl',['$rootScope','$scope','$http',function($rootScope,$scope,$http){
    var vm = this;
    vm.newMessage= undefined;
    vm.messages=[];
    var socket = window.io(window.location.origin+'/');
    vm.username = undefined;
 $http.get(window.location.origin+'/conversation').success(function(res){
   var response = angular.fromJson(res);
   vm.messages = response;
 });
    socket.on("receive-message", function(msg){
      $scope.$apply(function(){
        vm.messages.push(msg)
      });
    })
    $rootScope.$on('new-user',function(event,username){
      vm.username = username;
    });
    vm.send =function(){
        var newMessage ={
          username: vm.username,
          message: vm.newMessage
        };
        socket.emit("new-message", newMessage);
        vm.newMessage= undefined;
    };
    $scope.$watch(function(){
      return vm.username;
    });
  }]);
})(window,window.angular);

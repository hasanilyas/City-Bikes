angular.module('emptyslotController', [])

.controller('emptyslotCtrl', function(){
    this.submit= function(city){
       console.log(this.city);
    };
    
});

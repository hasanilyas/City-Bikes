angular.module('stationController', [])

.controller('statCtrl', function(){
    this.submit= function(city){
       this.global = this.city;
       console.log(this.city);
    };
    
});

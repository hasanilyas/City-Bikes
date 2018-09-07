           //====== Server 
var express 	= require('express');   
var app 		= express();
var morgan      = require('morgan');
app.use(morgan('dev'));

var path 		= require('path');

app.use(express.static(__dirname + '/public'));
app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'),function(){
	console.log('Express started');
});

			//======> default angular page 
			
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/view/index.html'));
});



                       //=======> backend Calculations <=========

const request = require('request');
var path1 , path2;
var stationarr=[];
var freeslots=[];


//======> Stations present in a City 

request('https://api.citybik.es/v2/networks', {json:true}, (err,res,body) =>{
	if(err){return console.log(err); }

	var obj = body.networks;

	obj.forEach(element => {
		
		if(element.location.city == 'Melbourne'){
			var id = element.id;
			path1 = 'https://api.citybik.es/v2/networks/'+id;
			console.log('path :', path1);

			request(path1, {json:true}, (error,response,body1)=> {
				if (err) throw err;
				var obj1 = body1.network.stations;	
				obj1.forEach(element => {
					var station={};
					if(element.free_bikes > 0){
						station[element.name] = element.free_bikes;
						stationarr.push(station);
					} 
				});
				console.log('Stations present in a City are: ');
				console.log(stationarr);
			});
		}
	});	
});


//=======> Find Empty Slots in a destination City. 

request('https://api.citybik.es/v2/networks', {json:true}, (err,res,body) =>{
	if(err){return console.log(err); }

	var obj = body.networks;

	obj.forEach(element => {
		
		if(element.location.city == 'Melbourne'){
			var id = element.id;
			path2 = 'https://api.citybik.es/v2/networks/'+id;
			console.log('path :', path2);

			request(path2, {json:true}, (error,response,body1)=> {
				if (err) throw err;
				var obj1 = body1.network.stations;	
				obj1.forEach(element => {
					var station={};
					if(element.empty_slots > 0){
						station[element.name] = element.empty_slots;
						freeslots.push(station);
					} 
				});
				console.log("Congratulations You will be able to find empty parking slot..");
			});
		}
	});	
});


 


var mongoose = require('mongoose');
var Record = require('../model/record.js');
var moment = require('moment');

// set mongodb connection
// mongoose.connect('mongodb://localhost/logging');


exports.showresult = function(req, res){
	// console.log(req.query.days);

	//find checked days 
	var days = [];
	for(i=0; i<req.query.days.length; i++){
		days.push({day:req.query.days[i]});
	}
	console.log(days);

	var condition = {$or:days};
	Record.find(condition, {'activity':1, 'code':1, 'duration':1, 'day':1, '_id':0}, function(err, data) {
		// console.log(data);






		res.send('Hello. Good weather!!');

	});

// // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
// Array.prototype.unique = function() {
//     var o = {}, i, l = this.length, r = [];
//     for(i=0; i<l;i+=1) o[this[i]] = this[i];
//     for(i in o) r.push(o[i]);
//     return r;
// };


};

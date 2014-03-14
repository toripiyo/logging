var mongoose = require('mongoose');
var Record = require('../model/record.js');
var moment = require('moment');

// set mongodb connection
// mongoose.connect('mongodb://localhost/logging');


exports.showresult = function(req, res){
	// console.log(req.query.days);

	//find checked days 
	var days = [];
	var condition;
	console.log(typeof req.query.days);
	console.log(req.query.days);
	console.log(req.query.days.length);
	if (typeof req.query.days == 'string') {
		days = req.query.days;
		condition = {day:days};
	} else {
		for(i=0; i<req.query.days.length; i++){
			days.push({day:req.query.days[i]});
		}
		condition = {$or:days};
	}
	console.log(days);

	Record.find(condition, {'to':1, 'from':1, 'activity':1, 'code':1, 'duration':1, 'day':1, '_id':0}, function(err, data) {
		console.log(data);

		res.render('calculating', {days:JSON.stringify(days), data:data});

	});

// // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
// Array.prototype.unique = function() {
//     var o = {}, i, l = this.length, r = [];
//     for(i=0; i<l;i+=1) o[this[i]] = this[i];
//     for(i in o) r.push(o[i]);
//     return r;
// };


};

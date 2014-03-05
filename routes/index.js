var mongoose = require('mongoose');
var Record = require('../model/record.js');

mongoose.connect('mongodb://localhost/logging');

exports.index = function(req, res){

	Record.find(null, {'_id':0, 'from':1, 'to':1, 'activity':1, 'code':1}, function(err, data) {
		// specify not retrieving _id
		// http://stackoverflow.com/questions/9598505/mongoose-retrieving-data-without-id-field
		console.log(data);
		res.render('index', {data: data})
	});

};

exports.save = function(req, res){

	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	// console.log(req.body);

	var record = new Record({ "from" : "10:10", "to" : "12:34", "activity" : "play soccer", "code" : "441" });

	record.save(function(err) {
		if( err ) console.log(err);
		else res.end( "User saved");
	});
};
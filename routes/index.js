var mongoose = require('mongoose');
var Record = require('../model/record.js');

mongoose.connect('mongodb://localhost/logging');

exports.index = function(req, res){

	Record.find(function(err, data) {
		console.log(data);
		res.render('index', {data: data})
	});

};
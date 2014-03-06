var mongoose = require('mongoose');
var Record = require('../model/record.js');

mongoose.connect('mongodb://localhost/logging');

exports.index = function(req, res){

	// http://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
	Record.find(null, {'_id':0, 'from':1, 'to':1, 'activity':1, 'code':1}, 
		{sort:{from: 1}},
		function(err, data) {
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

	Record.find().remove(function(err){
		if(err){
			console(err);
		}
	});

	for (var i=0; i<req.body.length; i++ ) {
		var record = 
			new Record( {"from" : req.body[i].from, "to" : req.body[i].to, "activity" : req.body[i].activity, "code" : req.body[i].code} );
		record.save(function(err){
			if(err) console.log(err);
		});
	};

	res.end("User saved");
};
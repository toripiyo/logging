var mongoose = require('mongoose');
var Record = require('../model/record.js');
var moment = require('moment');

// set mongodb connection
// mongoose.connect('mongodb://localhost/logging');


exports.showresult = function(req, res){
	console.log(req.query.days);

	var condition = {$and:[{'day':'20140305'}, {'day':'20140306'}, {'day':'20140307'}]};
	Record.find({$or:[{'day':'20140305'},{'day':'20140306'}]}, function(err, data) {
		console.log(data);
		res.send('Hello. Good weather!!');
	})

};

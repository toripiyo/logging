var mongoose = require('mongoose');
var Record = require('../model/record.js');
var moment = require('moment');

// set mongodb connection
mongoose.connect('mongodb://localhost/logging');

// set moment property
// http://momentjs.com/docs/
moment.lang('en', {calendar:{
	lastDay : '[Yesterday]',
	sameDay : '[Today]',
	lastWeek : 'YYYYMMDD [This] ddd',
	sameElse : 'YYYYMMDD ddd'
}});

exports.logging = function(req, res){

	// define day value
	var day;
	if (typeof(req.query.days) == "undefined"){
		day = moment().date(0).format('YYYYMMDD');
		console.log(day);
	} else {
		day = req.query.days;
	}

	// http://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
	Record.find({'day':day}, {'_id':0, 'from':1, 'to':1, 'activity':1, 'code':1}, 
		// specify not retrieving _id from mongodb http://stackoverflow.com/questions/9598505/mongoose-retrieving-data-without-id-field
		{sort:{index: 1}},
		function(err, data) {
			var days = [];
			var link;
			var title;
			var test = [];

			for(i=0; i < 30; i++){
				link = moment().subtract("days", i).format('YYYYMMDD');
				title = moment().subtract("days", i).calendar();
				days.push({link:link, title:title});

				// days.push('\''+moment().subtract("days", i).format('YYYYMMDD')+'\'');
				// days.push('\''+moment().subtract("days", i).calendar()+'\'');
			}

			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
			res.render('logging', {data: data, day:day, days: JSON.stringify(days)});
		});

};

exports.save = function(req, res){

	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	// console.log(req.body);

	Record.find({'day':req.body[0].day}).remove(function(err){
		if(err){
			console(err);
		}
	});

	for (var i=0; i<req.body.length; i++ ) {
		var record = 
			new Record( {"index": i, "day": req.body[i].day, "from" : req.body[i].from, "to" : req.body[i].to, "duration" : req.body[i].duration, "activity" : req.body[i].activity, "code" : req.body[i].code} );
		record.save(function(err){
			if(err) console.log(err);
		});
	};

	res.end("User saved");
};
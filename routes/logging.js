const Record = require('../model/record.js');
const moment = require('moment');

// set moment property
// http://momentjs.com/docs/
moment.locale('en', {calendar:{
	lastDay : '[Yesterday]',
	sameDay : '[Today]',
	lastWeek : 'YYYYMMDD [This] ddd',
	sameElse : 'YYYYMMDD ddd'
}});

exports.logging = async function(req, res, next){

	// define day value
	var day;
	if (typeof(req.query.days) == "undefined"){
		// day = moment().date(0).format('YYYYMMDD');
		day = moment().format('YYYYMMDD');
		console.log(day);
	} else {
		day = req.query.days;
	}

	// http://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
	try {
		// specify not retrieving _id from mongodb http://stackoverflow.com/questions/9598505/mongoose-retrieving-data-without-id-field
		const data = await Record.find(
			{'day':day},
			{'_id':0, 'from':1, 'to':1, 'activity':1, 'code':1}
		).sort({index: 1}).exec();

			var days = [];
			var link;
			var title;

			for(var i=0; i < 30; i++){
				link = moment().subtract("days", i).format('YYYYMMDD');
				title = moment().subtract("days", i).calendar();
				days.push({link:link, title:title});

				// days.push('\''+moment().subtract("days", i).format('YYYYMMDD')+'\'');
				// days.push('\''+moment().subtract("days", i).calendar()+'\'');
			}

			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
			res.render('logging', {data: data, day:day, days: JSON.stringify(days)});
	} catch (err) {
		next(err);
	}

};

exports.save = async function(req, res, next){

	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	// console.log(req.body);

	if (!Array.isArray(req.body) || req.body.length === 0) {
		return res.status(400).send('No records supplied');
	}

	try {
		await Record.deleteMany({'day':req.body[0].day}).exec();

		const records = req.body.map(function(item, index) {
			return {
				"index": index,
				"day": item.day,
				"from": item.from,
				"to": item.to,
				"duration": item.duration,
				"activity": item.activity,
				"code": item.code
			};
		});
		await Record.insertMany(records);

		res.end("User saved");
	} catch (err) {
		next(err);
	}
};

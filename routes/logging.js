const Record = require('../model/record.js');
const moment = require('moment');

moment.updateLocale('en', {calendar: {
	lastDay: '[Yesterday]',
	sameDay: '[Today]',
	lastWeek: 'YYYYMMDD [This] ddd',
	sameElse: 'YYYYMMDD ddd',
}});

const projection = {_id: 0, from: 1, to: 1, activity: 1, code: 1};

exports.logging = async (req, res, next) => {
	const day = req.query.days ?? moment().format('YYYYMMDD');
	try {
		const data = await Record.find({day}, projection)
			.sort({index: 1})
			.lean()
			.exec();
		const days = Array.from({length: 30}, (_, index) => {
			const date = moment().subtract(index, 'days');
			return {
				link: date.format('YYYYMMDD'),
				title: date.calendar(),
			};
		});

		return res.render('logging', {
			data,
			day,
			days,
		});
	} catch (err) {
		return next(err);
	}
};

exports.save = async (req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost');
	res.header('Access-Control-Allow-Methods', 'GET, POST');

	if (!Array.isArray(req.body) || req.body.length === 0) {
		return res.status(400).send('No records supplied');
	}

	try {
		const [{day}] = req.body;
		await Record.deleteMany({day}).exec();

		const records = req.body.map((item, index) => ({
			index,
			day: item.day,
			from: item.from,
			to: item.to,
			duration: item.duration,
			activity: item.activity,
			code: item.code,
		}));
		await Record.insertMany(records);

		return res.send('User saved');
	} catch (err) {
		return next(err);
	}
};

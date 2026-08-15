const Record = require('../model/record.js');

const projection = {
	_id: 0,
	to: 1,
	from: 1,
	activity: 1,
	code: 1,
	duration: 1,
	day: 1,
};

exports.showresult = async (req, res, next) => {
	const requestedDays = req.query.days;

	if (!requestedDays) {
		return res.status(400).send('At least one day must be selected');
	}

	const days = Array.isArray(requestedDays) ? requestedDays : [requestedDays];

	try {
		const data = await Record.find({day: {$in: days}}, projection)
			.sort({index: 1})
			.lean()
			.exec();

		return res.render('calculating', {
			days,
			data,
		});
	} catch (err) {
		return next(err);
	}
};

var mongoose = require('mongoose');

var RecordSchema = new mongoose.Schema({
	// _id: {type:String},
	index: {type: Number, required: true},
	day: {type: String, required: true},
    from: {type: String, required: false},
    to: {type: String, required: false},
    duration: {type: Number, required: false},
    activity: {type: String, required: false},
    code: {type: String, required: false},
},{collection: 'record'});

module.exports = mongoose.model('Record', RecordSchema);
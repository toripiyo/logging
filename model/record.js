var mongoose = require('mongoose');

var RecordSchema = new mongoose.Schema({
	// _id: {type:String},
    from: {type: String, required: true},
    to: {type: String, required: false},
    activity: {type: String, required: false},
    code: {type: String, required: false},
},{collection: 'record'});

module.exports = mongoose.model('Record', RecordSchema);
var mongoose = require('mongoose');

var RecordSchema = new mongoose.Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    activity: {type: String, required: true},
    code: {type: String, required: true},
},{collection: 'record'});

module.exports = mongoose.model('Record', RecordSchema);
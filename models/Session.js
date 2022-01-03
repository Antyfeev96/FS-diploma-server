const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const schema = new Schema({
    _id: { type: String, default: uuidv4 },
    hall: { type: Object , required: true},
    film: { type: Object, required: true },
    start_time: { type: String, required: true, unique: false }
});

module.exports = model('Session', schema)

const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const schema = new Schema({
    _id: { type: String, default: uuidv4 },
    hall: { type: String , required: true},
    film: { type: String, required: true },
    start_time: { type: String, required: true, unique: true },
    end_time: { type: String, required: true, unique: true },
});

module.exports = model('Session', schema)

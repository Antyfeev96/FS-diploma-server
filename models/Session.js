const { Schema, model } = require('mongoose');

const schema = new Schema({
    start_time: { type: String, required: true, unique: true },
    end_time: { type: String, required: true, unique: true },
    film: { type: String, required: true }
});

module.exports = model('Session', schema)
const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const schema = new Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true, unique: true },
    duration: { type: Number, required: true }
});

module.exports = model('Film', schema)


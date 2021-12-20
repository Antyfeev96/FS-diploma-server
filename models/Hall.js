const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const schema = new Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true, unique: true },
    rows: { type: Array, required: true },
    checked: { type: Boolean, required: true },
    prices: { type: Object, required: true }
});

module.exports = model('Hall', schema)

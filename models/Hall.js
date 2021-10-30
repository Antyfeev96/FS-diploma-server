const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true, unique: true },
    rows: { type: Array, required: true },
    checked: { type: Boolean, required: true }
});

module.exports = model('Hall', schema)
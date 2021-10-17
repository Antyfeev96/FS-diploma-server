const { Schema, model } = require('mongoose');

const schema = new Schema({
    id: { type: Number, required: true, unique: true },
    status: { type: String, required: true }
});

module.exports = model('Place', schema)
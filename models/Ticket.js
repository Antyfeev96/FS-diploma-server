const { Schema, model } = require('mongoose');

const schema = new Schema({
    row: { type: Number, required: true },
    place: { type: Number, required: true },
    session: { type: String, required: true }
});

module.exports = model('Ticket', schema)
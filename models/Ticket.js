const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const schema = new Schema({
    _id: { type: String, default: uuidv4 },
    row: { type: Number, required: true },
    place: { type: Number, required: true },
    session: { type: String, required: true }
});

module.exports = model('Ticket', schema)

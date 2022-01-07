const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const schema = new Schema({
    _id: { type: String, default: uuidv4 },
    film: { type: String, required: true},
    hall: { type: String, required: true },
    seats: {
        type: [{
            row: {type: Number, required: true},
            place: {type: Number, required: true}
        }],
        required: true,
        default: []
    },
    session: { type: String, required: true }
});

module.exports = model('Ticket', schema)

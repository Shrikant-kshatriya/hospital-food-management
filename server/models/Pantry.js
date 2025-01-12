// pantry staff model
const mongoose = require('mongoose');

const pantrySchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Pantry = mongoose.model('Pantry', pantrySchema);

module.exports = Pantry;
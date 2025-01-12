// delivery personnel model

const mongoose = require('mongoose');

const deliveryPersonnelSchema = new mongoose.Schema({
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
    }
});

const DeliveryPersonnel = mongoose.model('DeliveryPersonnel', deliveryPersonnelSchema);

module.exports = DeliveryPersonnel;
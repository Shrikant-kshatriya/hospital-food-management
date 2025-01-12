const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    room: {
        type: Number,
        required: true
    },
    bed: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['delivered', 'yet to be delivered', 'delayed'],
        default: 'yet to be delivered'
    },
    deliveryBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPersonnel',
        required: true
    },
    mealTime: {
        type: String,
        enum: ['morning', 'evening', 'night'],
        required: true
    }, 
    preparation: {
        status: {
            type: String,
            enum: ['in-progress', 'completed'],
            default: 'in-progress'
        },
        by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pantry'
        }
    },
    notes: {
        type: String,
    },
    deliveryTime: {
        type: Date,
    }
});

const Box = mongoose.model('Box', boxSchema);
module.exports = Box;
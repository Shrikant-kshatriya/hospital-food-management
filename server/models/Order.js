// meal order model
const mongoose = require('mongoose');

const mealOrderSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    foodchart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Foodchart',
        required: true
    },
    preparationBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pantry',
        required: true
    },
    issues:{
        type: String,
    },
    preparation: {
        morning: {
            type: String,
            enum: ['Pending', 'In-Progress', 'Completed'],
            default: 'Pending',
            required: true
        },
        evening: {
            type: String,
            enum: ['Pending', 'In-Progress', 'Completed'],
            default: 'Pending',
            required: true
        },
        night: {
            type: String,
            enum: ['Pending', 'In-Progress', 'Completed'],
            default: 'Pending',
            required: true
        }
    },
    delivery: {
        morning: {
            type: Boolean,
            required: true,
            default: false
        },
        evening: {
            type: Boolean,
            required: true,
            default: false
        },
        night: {
            type: Boolean,
            required: true,
            default: false
        }
    }
});

const MealOrder = mongoose.model('Order', mealOrderSchema);

module.exports = MealOrder;
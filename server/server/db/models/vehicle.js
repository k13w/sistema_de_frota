const mongoose = require('..')

const VehicleSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    license_plate: {
        type: String,
        required: true,
        unique: true
    },
    renavam_code: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});


const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;
const mongoose = require('..')

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    siape: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;
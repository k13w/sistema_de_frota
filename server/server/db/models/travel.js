const mongoose = require('..')

const TravelSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    date_start: {
        type: String,
    },
    date_finish: {
        type: Date
    },
    request_status: {
        type: Boolean,
        default: true
    },
    request_name: {
        type: String,
        required: true
    },
    request_siape: {
        type: String,
        required: true
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    }
}, {
    timestamps: true
});

const Travel = mongoose.model('Travel', TravelSchema);

module.exports = Travel;
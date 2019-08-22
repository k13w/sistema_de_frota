const mongoose = require('..');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
}, {
    timestamps: true 
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 7);
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
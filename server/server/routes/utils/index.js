const mongoose = require('mongoose');

const user = mongoose.model("User");

module.exports = {
    async index(req, res) {
        const users = await user.find().select("-email -password -__v")

        return res.json(users);
    }
}
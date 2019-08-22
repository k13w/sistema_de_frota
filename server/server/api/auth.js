const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const authConfig = require('../config/auth')
const User = require('../db/models/users');
const Travel = require('../db/models/vehicle');
const api = require('../routes/utils')


const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.get('/users', api.index)

router.post('/singup', async (req, res) => {
    const { username, cpf, email, password } = req.body;

    try {
        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já existe! '});

        const user = await User.create(req.body);
        return res.send({
            user,
            token: generateToken({ id: user.id }),
        });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar novo usuário!' });
    }
})

router.post('/singin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'Usuário não encontrado! '});

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Senha inválida! '});

    user.cpf = undefined;
    user.email = undefined;
    user.password = undefined;
    user.__v = undefined;

    res.send({
        user, 
        token: generateToken({ id: user.id }),
    });
});

module.exports = router;
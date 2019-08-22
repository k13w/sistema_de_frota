const express = require('express');
const Travel = require('../db/models/travel');
const Driver = require('../db/models/drivers');
const Vehicle = require('../db/models/vehicle');
const multer = require('multer')
const multerConfig = require('../config/multer');

const router = express.Router();

router.get('/drivers', async (req, res) => {
    try {
        const drivers = await Driver.find().populate({
            path: 'driver'
        });

        return res.send({ drivers });

    } catch (err) {
        return res.sendStatus(400).send({ error: 'Erro ao listar pilotos!'});
    }

});

router.get('/driver/:driverId', async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.driverId).populate({
            path: 'driver'
        });

        return res.send({ driver });

    } catch (err) {
        return res.sendStatus(400).send({ error: 'Erro ao listar Piloto'});
    }

});

router.post('/new_driver', async (req, res) => {
    const { name, cpf, siape } = req.body;

    try {
        if(await Driver.findOne({ cpf }))
            return res.status(400).send({ error: 'Piloto já existe! '});

        const driver = await Driver.create(req.body);
        return res.send({
            driver
        });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar novo piloto!' });
    }
});

router.put('/driver/:driverId', async(req, res) => {
    try {
        const { name, cpf, siape } = req.body;

        const driver = await Driver.findByIdAndUpdate(req.params.driverId, {
            name, cpf, siape
        }, { new: true });

        return res.send({ driver });
    } catch(err) {
        return res.sendStatus(400).send({ error: 'Erro ao Atualizar Piloto'});
    }
});

router.delete('/driver/:driverId', async (req, res) => {
    try {
        await Driver.findByIdAndRemove(req.params.driverId);

        return res.send();

    } catch (err) {
        return res.sendStatus(400).send({ error: 'Erro ao deletar Piloto :p'});
    }

});

router.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate({
            path: 'vehicle'
        });

        return res.send({ vehicles });

    } catch (err) {
        return res.sendStatus(400).send({ error: 'Erro ao listar veiculos'});
    }

});

router.get('/vehicle/:vehicleId', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.vehicleId).populate({
            path: 'vehicle'
        });

        return res.send({ vehicle });

    } catch (err) {
        return res.sendStatus(400).send({ error: 'Erro ao listar Veículo'});
    }

});

router.post('/new_vehicle', async (req, res) => {
    const { license_plate } = req.body;

    try {
        if(await Vehicle.findOne({ license_plate }))
            return res.status(400).send({ error: 'veiculo já existe! '});

        const vehicle = await Vehicle.create(req.body);
        return res.send({
            vehicle
        });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar novo veiculo!' });
    }
});

router.put('/vehicle/:vehicleId', async(req, res) => {
    try {
        const { brand, model, year, license_plate, renavam_code } = req.body;

        const vehicle = await Vehicle.findByIdAndUpdate(req.params.vehicleId, {
            brand, model, year, license_plate, renavam_code
        }, { new: true });

        return res.send({ vehicle });
    } catch(err) {
        return res.sendStatus(400).send({ error: 'Erro ao Atualizar Veículo'});
    }
});

router.delete('/vehicle/:vehicleId', async (req, res) => {
    try {
        await Vehicle.findByIdAndRemove(req.params.vehicleId);

        return res.send();

    } catch (err) {
        return res.sendStatus(400).send({ error: 'Erro ao deletar veículo :p'});
    }

});

router.get('/travels', async (req, res) => {
    try {
        const travels = await Travel.find().populate({
            path: 'vehicle',
            populate: {
                path: 'driver'
            }
        });

        return res.send({ travels });

    } catch (err) {
        return res.sendStatus(400).send({ error: 'Erro ao listar viagens'});
    }

});

router.get('/travel/:travelId', async (req, res) => {
    try {
        const travel = await Travel.findById(req.params.travelId).populate({
            path: 'vehicle',
            populate: {
                path: 'driver'
            }
        });

        return res.send({ travel });

    } catch (err) {
        return res.sendStatus(400).send({ error: 'Erro ao listar viagem'});
    }

});


router.post('/new_travel', async (req, res) => {
    try {
        const travel = await Travel.create(req.body);

        return res.send({ travel });

    } catch (err) {
        return res.sendStatus(400).send({ error: 'Erro ao cadastrar nova viagem'});
    }

});

router.put('/travel/:travelId', async(req, res) => {
    try {
        const { to, from, date_start, request_name, request_siape } = req.body;

        const travel = await Travel.findByIdAndUpdate(req.params.travelId, {
            to, from,  date_start, request_name, request_siape
        }, { new: true });

        return res.send({ travel });
    } catch(err) {
        return res.sendStatus(400).send({ error: 'Erro ao Atualizar Viagem'});
    }
});

router.delete('/travel/:travelId', async (req, res) => {
    try {
        await Travel.findByIdAndRemove(req.params.travelId);

        return res.send();

    } catch (err) {
        return res.sendStatus(400).send({ error: 'Erro ao deletar viagem :p'});
    }

});

router.post('/uploads', multer(multerConfig).single("file"), async (req, res) => {
    console.log(req.file);

    return res.json({ hello: 'heaven'});

});


module.exports = router;
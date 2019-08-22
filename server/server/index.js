const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

const auth = require('./api/auth');
const controllers = require('./api/controllers');

app.use('/api/users', auth);
app.use('/api/controllers', controllers);

const port = process.env.PORT || 5000;

app.listen(port, () => 
    console.log(`%s Listening on http://localhost:%s`, 
    chalk.green('✓'), port));


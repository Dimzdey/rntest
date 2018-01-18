const express = require('express');
const mongoose = require('mongoose');
const conf = require('./config/config');
const bodyParser = require('body-parser');

const config = JSON.parse(process.env.APP_CONFIG);

mongoose.Promise = global.Promise;
mongoose.connect( "mongodb://" + config.mongo.user + ":" + encodeURIComponent(mongoPassword) + "@" + 
config.mongo.hostString ||config.database);
mongoose.connection.on('connected', () => {
    console.log('connected to database: ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Error: ' + err);
});

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

const api = require('./routes/api');
app.use('/api', api);

app.listen(port, () => {
    console.log('Server started listen on port: ' + port);
});


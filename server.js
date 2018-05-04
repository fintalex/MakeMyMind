var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');

var config = require('./server/config/index');

var app = express();

var initMongo = require('./server/config/mongo');

var userRoutes = require('./server/routes/user');
var categoryRoutes = require('./server/routes/category');
var brickTypeRoutes = require('./server/routes/brickType');
var brickRoutes = require('./server/routes/brick');

initMongo();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brickTypes', brickTypeRoutes);
app.use('/api/bricks', brickRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Set port
app.set('port', config.server.port);

const server = http.createServer(app);

server.listen(config.server.port, () => console.log(`Running on localhost:${config.server.port}`));


var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');

//============== Schedule CRON =================
var brickType = require('./server/models/brickType');
var schedule = require('node-schedule');

// SEEMS the SERVER where the ZOMRO is situated, have -11 hours.
var j = schedule.scheduleJob('0 0 18 * * *', (fireDate) => {
    //console.log("LOG every 1 minute when 30 second is");
    console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
    brickType.updateSkippeDays((err, result) => {
        if (err){
            console.log('Error posting brickType -', err);
        } 
    });
});
// var j = schedule.scheduleJob('30 * * * * *', function(){
//     console.log('The answer to life, the universe, and everything!');
// });

// var j = schedule.scheduleJob('20 * * * * *', function(fireDate){
//     console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
// });

// var j = schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function(){
//     console.log('Time for tea!');
//   });

// var date = new Date(2018, 11, 03, 10, 49, 0);
// var j = schedule.scheduleJob(date, function(y){
//     console.log('Time 03.12.2018 10:49!');
// });

// var rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(4, 6)];
// rule.hour = 17;
// rule.minute = 0;
 
// var j = schedule.scheduleJob(rule, function(){
//   console.log('Today is recognized by Rebecca Black!');
// });
//==============//==============//==============

var config = require('./server/config/index');

var app = express();

var initMongo = require('./server/config/mongo');

var userRoutes = require('./server/routes/user');
var categoryRoutes = require('./server/routes/category');
var brickTypeRoutes = require('./server/routes/brickType');
var brickRoutes = require('./server/routes/brick');
var frendRoutes = require('./server/routes/frend');
var goalRoutes = require('./server/routes/goal');

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
app.use('/api/frends', frendRoutes);
app.use('/api/goals', goalRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Set port
app.set('port', config.server.port);

const server = http.createServer(app);

server.listen(config.server.port, () => console.log(`Running on :${config.server.port}`));


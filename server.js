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

// ==================  nodemailer ======================
// // const nodemailer = require('nodemailer'),
// //     transporter = nodemailer.createTransport({
// //         service: 'gmail',
// //         auth: {
// //             user: 'asdf',
// //             pass: 'sdfa'
// //         }
// //     }),
// const email = require('email-templates');
//     //path = require('path'),
//     //Promise = require('bluebird');
// const email = new Email({
//     message: {
//         from: 'fintalex@mail.ru'
//     },
//     transport: {
//         jsonTransport: true
//     }
// })

// let users = [
//     {
//         name: 'Alex Harper',
//         email: 'fintalex@mail.ru'
//     },
//     {
//         name: 'Alexey Gmail',
//         email: 'fintalex1989@gmail.com'
//     }
// ];

// function sendEmail(obj){
//     return transporter.sendMail(obj);
// }

// function loadTemplate(templateName, contexts) {
//     let template = EmailTemplate(path.join(__dirname, 'server/email/templates', templateName));
//     return Promise.all(contexts.map((context)=>{
//         return new Promise((resolve, reject) => {
//             template.render(context, (err, result) => {
//                 if (err) reject(err);
//                 else resolve(result);
//             });
//         });
//     }));
// }

// loadTemplate('welcome', users).then((results) => {
//     console.log(JSON.stringify(results, null, 4));
// })

const nodemailer = require('nodemailer');

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kharchenko.lyokha@yandex.ru',
        pass: 'Ramss01071989'
    }
});

// Step 2
let mailOptions = {
    to: 'fintalex@mail.ru',
    from: 'fintalex1989@gmail.com',
    subject: 'Testing',
    text: 'IT Works'
};

// Step 3
transporter.sendMail(mailOptions, function(err, data){
    if (err){
        console.log('Error Occurs', err);
    } else {
        console.log('Email sent!!!');
    }
})


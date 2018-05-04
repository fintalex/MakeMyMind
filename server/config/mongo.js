const mongoose = require('mongoose');
const config = require('./index');

const init = () => {
  connectMongo();
  mongoose.connection.on('connected', () => {
    console.log('MONGOOSE CONNECTED TO ' + config.mongo.host);
  });

  mongoose.connection.on('error', (err) => {
    console.log('MONGOOSE CONNECTION ERROR: ' + err);
  });
}

const connectMongo = () => {
    mongoose.connect(config.mongo.host)
              .catch(err => {
                log.report('mongo', 'HERE connection to db failed', err.message || err);
                setTimeout(connectMongo, 2000);
              });
}

module.exports = init;

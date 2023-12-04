const mongoose = require('mongoose');
const app = require('./app');
// const rabbitConsumer=require('./utils/consumer')

// const AppDataSource = require('./utils/createDatabaseConnection')
const config = require('./config/config');
const logger = require('./config/logger');

let server;

// rabbitConsumer(['user.*']).catch((error) => {
//   console.error('Error consuming messages:', error);
// });

// AppDataSource.initialize().then(() => {
//   logger.info('Connected to Postgres through Typeorm');
//   server = app.listen(config.port, () => {
//     logger.info(`Listening to port http://localhost:${config.port}`);
//   });
// }).catch((e) => {
//   logger.error(`Exception Error ${e}`)
// })

mongoose.connection.once('open', () => {
  logger.info('Connected to MongoDB through Mongoose');
 server = app.listen(3000, () => {
    logger.info(`Listening to port http://localhost:${3000}`);
  });
});

mongoose.connection.on('error', (error) => {
  logger.error(`MongoDB connection error: ${error}`);
});

// Initialize the Mongoose connection
mongoose.connect("mongodb://root:root@mongodb:27017/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

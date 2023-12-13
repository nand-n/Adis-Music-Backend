const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./config/logger');

let server;

mongoose.connection.once('open', () => {
  logger.info('Connected to MongoDB through Mongoose');
 server = app.listen(process.env.PORT, () => {
    logger.info(`Listening to port http://localhost:${process.env.PORT}`);
  });
});

mongoose.connection.on('error', (error) => {
  logger.error(`MongoDB connection error: ${error}`);
});

// Initialize the Mongoose connection
mongoose.connect(process.env.DATABASE_URL, {
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

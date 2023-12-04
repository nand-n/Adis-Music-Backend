// const { DataSource } =require("typeorm")
// const dbConfig= require('../config/dbConfig')

// const AppDataSource = new DataSource(dbConfig);

// module.exports= AppDataSource


const mongoose = require('mongoose');
const dbConfig = require('../config/dbConfig');

mongoose.connect(dbConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Additional options if needed
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;

// Set up express server
const express = require('express');

const server = express();
require('dotenv').config();
const helmet = require('helmet');

const port = process.env.DEV_PORT;
const database = require('mongoose');

const databaseUrl = process.env.DEV_DATABASE_URL;

// Import routes
const authRoutes = require('./routes/authRoutes');
const spacesRoutes = require('./routes/spacesRoutes');
// Connect to database
database
  .connect(databaseUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database Connection Successful');
  });
// Middleware
server.use(express.json()); // parse requests of content-type - application/json
server.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
server.use(helmet()); // Security settings for HTTP headers
// Route middleware
server.use('/api/user', authRoutes);
server.use('/api/spaces', spacesRoutes);
server.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server is up on port ${port}`);
});

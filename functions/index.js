const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const ServerlessHttp = require('serverless-http');
const authRoute = require('../src/routes/auth.js');
const usersRoute = require('../src/routes/users.js');
const hotelsRoute = require('../src/routes/hotels.js');
const roomsRoute = require('../src/routes/rooms.js');
const dbConnect = require('../src/lib/mongoose.js');

const app = express();

dotenv.config();

dbConnect().catch(err => console.log(err));

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage =
    err.message || 'Something went wrong!';

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

module.exports.handler = ServerlessHttp(app);

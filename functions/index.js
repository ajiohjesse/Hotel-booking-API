const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const ServerlessHttp = require('serverless-http');
const authRouter = require('../src/routes/auth.js');
const usersRouter = require('../src/routes/users.js');
const hotelsRouter = require('../src/routes/hotels.js');
const roomsRouter = require('../src/routes/rooms.js');

const app = express();

dotenv.config();

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

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);

module.exports.handler = ServerlessHttp(app);

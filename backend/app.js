const logger = require('morgan')
const cookieParser = require('cookie-parser')
const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const path = require('path')

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/users', usersRouter);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('message', 'Hello')
});


server.listen(3001, () => {
  console.log('server up on 3001')
})

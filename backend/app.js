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
  socket.emit('message', 'Hello');

  socket.on('join', data => {
    const { interviewId } = data
    socket.join(interviewId)
  })

  socket.on('updateCode', data => {
    const { interviewId, code } = data
    socket.to(interviewId).emit('codeUpdate', code)
  })
  socket.on('lockCode', data => {
    const { interviewId, lock } = data
    socket.to(interviewId).emit('codeLock', lock)
  })
  socket.on('webcamOffer', data => {
    const { interviewId, webcamId, offer } = data
    socket.to(interviewId).emit('webcamAnswer', { webcamId, offer })
  })
});


server.listen(3001, () => {
  console.log('server up on 3001')
})

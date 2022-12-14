const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '/',
    methods: ['GET', 'POST'],
  },
});

const path = require('path');
const authRouter = require('./routes/authRouter');
const friendsRouter = require('./routes/friendsRouter');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(morgan('dev'));

const sessionParser = session({
  name: 'sid_socket',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
});

app.use(sessionParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/friends', friendsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('finalShake', (Object) => {
    socket.broadcast.emit(Object.ownerId, Object);
  });
  socket.on('JoinGame', (joinObject) => {
    console.log(`JoinGame request received from ${joinObject.senderId}`);
    console.log(`password of room: ${joinObject.pw}`);
    socket.broadcast.emit('gameSend', joinObject);
  });
  socket.on('PositionSend', (FENinfo) => {
    console.log('Position send worked');
    socket.broadcast.emit('NewFenFromServer', FENinfo);
  });
});

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));

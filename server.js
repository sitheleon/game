// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

let players = [];

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
        players = players.filter(player => player.id !== socket.id);
        io.emit('updatePlayers', players);
    });

    socket.on('play', (playerSelection) => {
        const player = players.find(player => player.id === socket.id);
        if (player) {
            player.selection = playerSelection;
            io.emit('updatePlayers', players);
        }
    });

    socket.on('newPlayer', () => {
        players.push({ id: socket.id, selection: null });
        io.emit('updatePlayers', players);
    });
});

// 정적 파일 제공을 위한 미들웨어 추가
app.use(express.static(path.join(__dirname, 'public')));

// 루트 URL에 대한 GET 요청 처리
app.get('/', (req, res) => {
    // index.html 파일을 전송
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

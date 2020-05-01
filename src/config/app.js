import http from 'http';
import SocketIo from 'socket.io'

module.exports = app => {
    const server = http.createServer(app);
    const io = SocketIo(server);
    const users = {};
    const socketToRoom = {};

    io.on('connection', function (socket) {
        console.log(`a user connected: ${socket.id}`);

        socket.on('new-op', function (msg) {
            socket.broadcast.emit('new-remote-op', msg);
        });

        socket.on("join room", roomID => {
            if (users[roomID]) {
                const length = users[roomID].length;
                if (length === 4) {
                    socket.emit("room full");
                    return;
                }
                users[roomID].push(socket.id);
            } else {
                users[roomID] = [socket.id];
            }
            socketToRoom[socket.id] = roomID;
            const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

            socket.emit("all users", usersInThisRoom);
        });

        socket.on("sending signal", payload => {
            io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
        });

        socket.on("returning signal", payload => {
            io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
        });

        socket.on('disconnect', () => {
            console.log(`a user disconnected: ${socket.id}`);
            const roomID = socketToRoom[socket.id];
            let room = users[roomID];
            if (room) {
                room = room.filter(id => id !== socket.id);
                users[roomID] = room;
            }
        });
    });

    server.listen(process.env.PORT, () => {
        console.log(`Listening on port: ${process.env.PORT}`);
    });

    // sequelize.sync({ force: true }).then(() => {
    //     io.on('connection', function (socket) {
    //         console.log(`a user connected: ${socket.id}`);
    //         socket.on('disconnect', () => {
    //             console.log(`a user disconnected: ${socket.id}`);
    //         });

    //         socket.on('new-op', function (msg) {
    //             socket.broadcast.emit('new-remote-op', msg);
    //         });
    //     });

    //     server.listen(APP_PORT, () => {
    //         console.log(`Listening on port: ${APP_PORT}`);
    //     });
    // }).catch(error => {
    //     console.log(error);
    // });

    return { io }
}
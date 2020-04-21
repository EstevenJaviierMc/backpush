import http from 'http';
import SocketIo from 'socket.io'

module.exports = app => {
    const server = http.createServer(app);
    const io = SocketIo(server);

    const { APP_PORT } = process.env;

    io.on('connection', function (socket) {
        console.log(`a user connected: ${socket.id}`);
        socket.on('disconnect', () => {
            console.log(`a user disconnected: ${socket.id}`);
        });

        socket.on('new-op', function (msg) {
            socket.broadcast.emit('new-remote-op', msg);
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
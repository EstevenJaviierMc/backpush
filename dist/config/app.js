"use strict";

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  var server = _http["default"].createServer(app);

  var io = (0, _socket["default"])(server);
  var APP_PORT = process.env.APP_PORT;
  io.on('connection', function (socket) {
    console.log("a user connected: ".concat(socket.id));
    socket.on('disconnect', function () {
      console.log("a user disconnected: ".concat(socket.id));
    });
    socket.on('new-op', function (msg) {
      socket.broadcast.emit('new-remote-op', msg);
    });
  });
  server.listen(APP_PORT, function () {
    console.log("Listening on port: ".concat(APP_PORT));
  }); // sequelize.sync({ force: true }).then(() => {
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

  return {
    io: io
  };
};
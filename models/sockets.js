

class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('nueva conexion');
            socket.on('mensaje-to-server', (data) => {
                console.log(data);
                this.io.emit('mensaje-from-server', data);
            });
        });
    }
}

module.exports = Sockets;
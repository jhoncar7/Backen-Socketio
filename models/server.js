//servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT || 3000;

        //http server
        this.server = http.createServer(this.app);

        //configuracion del socket server
        this.io = socketio(this.server, {/*Configuraciones*/ });
    }

    middleware() {
        //desplegar directorio publico
        //app.use(express.static('public'));
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(cors());
    }

    configurarSocket() {
        new Sockets(this.io);
    }

    execute() {
        this.middleware();
        this.configurarSocket();
        this.server.listen(this.port, () => {
            console.log('servidor corriendo en el puerto: ', this.port);
        });
    }
}

module.exports = Server;



//io.on('connection', (socket) => {
    //console.log('cliente conectado!', socket.id);
    //socket.emit('mensaje-bienvenida', 'Bienvenido al chat');
/* socket.emit('mensaje-bienvenida', {
    msg: 'Bienvenido al chat',
    fecha: new Date().getTime()
}) */

/* socket.on('mensaje-to-server', (data) => {
    console.log(data);

    io.emit('mensaje-from-server', data);
}) */
//});
const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8070;
        this.usuariosPath = '/api/usuarios';

        //Middlewares: funciones que siempre se ejecutaran al momento de levantar el servidor
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y Parseo 
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));

    }

    routes() {
        //ENDPOINTS
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}


module.exports = Server;

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a BD - Se agrega después de crear las instancias del servidor
        this.conectarDB();

        //Middlewares: funciones que siempre se ejecutaran al momento de levantar el servidor 
        //(Se ejecutan antes de llamar a un controlador o hacer una peticion)
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors()); //Permite prteger el servidor de una manera superficiasl. Navegadores como chrome o firefox requieren cors activo. No es necesario si la app seejecuta desde la red interna del trabajo

        //Lectura y Parseo del "body"
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
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario'); //Al momento de llamar un esquema. Se debe comenzar con mayúscula. Es un estandar


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = false, limit } = req.query;

    res.json({
        msg: "Soy el mejor get-controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: "Soy el mejor put-controlador",
        id
    });
}

const usuariosPost = async(req, res = response) => {



    const { nombre, correo, password, rol } = req.body;
    // const body = req.body;

    // const usuario = new Usuario(body);
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya se encuentra registrado.'
        });
    }

    //Encriptar contraseña (Hash de la contraseña)
    const salt = bcryptjs.genSaltSync(); //SaltSync: Número de vuelta que requiere el usuario para hacer más compleja la desencripación (10 por defecto)
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        msg: "Soy el mejor post-controlador",
        usuario
    });
}

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: "Soy el mejor delete-controlador"
    });
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: "Soy el mejor patch-controlador"
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}
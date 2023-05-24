const { response } = require('express');

const usuariosGet = (req, res = response) => {

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

const usuariosPost = (req, res = response) => {

    //const body = req.body; 
    const { nombre, edad } = req.body;

    res.json({
        msg: "Soy el mejor post-controlador",
        nombre,
        edad
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
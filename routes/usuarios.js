const { Router } = require('express');
const { check } = require('express-validator');


const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middelwares/validar-campos');


const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //.not() es igual a NO o negación. En este caso no tiene que estar vacio - not().IsEmpty()
    check('password', 'El password es obligatorio y debe tener más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido.').isEmail(),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']), //que exista en (ARREGLO)
    //check('rol').custom((rol) => esRoleValido(rol)),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);




module.exports = router;
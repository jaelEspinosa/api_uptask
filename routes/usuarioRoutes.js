import  express  from "express";
import  { registrar, autenticar, confirmar, olvidePassword, comprobarToken }  from "../controllers/usuarioController.js";


const router = express.Router()


// Autenticación, Registro y Confirmacion de Usuarios
router.post('/', registrar); // crea un nuevo usuario

router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar)

router.post('/olvide-password', olvidePassword)
router.get('/olvide-password/:token', comprobarToken)

export default router
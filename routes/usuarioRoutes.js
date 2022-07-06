import  express  from "express";
import  {registrar, autenticar}  from "../controllers/usuarioController.js";


const router = express.Router()


// Autenticación, Registro y Confirmacion de Usuarios
router.post('/', registrar); // crea un nuevo usuario

router.post('/login', autenticar);

export default router
import Usuario from "../models/Usuario.js"
import generarID from "../helpers/generarID.js";
import bcrypt from 'bcrypt'

const registrar = async (req,res)=> {
   
    //Evitar registros duplicados

    const{email} = req.body;
    const existeUsuario = await Usuario.findOne({email});

    if(existeUsuario){
        const error = new Error('El Usuario ya está registrado');
        return res.status(400).json({msg: error.message})
    }
    
    try {
       const usuario = new Usuario(req.body) 
       usuario.token = generarID()
       const usuarioAlmacenado = await usuario.save()
       res.json(usuarioAlmacenado)       
    } catch (error) {
       console.log(error) 
    }    
};

// **** AUTENTICAR USUARIO


const autenticar = async (req, res)=>{
    const {email, password} = req.body;

   // comprobar si el usuario existe

    const usuario = await Usuario.findOne({email})
    if (!usuario){
        const error = new Error('USUARIO NO ENCONTRADO');
        return res.status(404).json({msg: error.message})       
   
    } 
    // comprobar si está confirmado   
   
    if (!usuario.confirmado){
        const error = new Error('LA CUENTA NO ESTA CONFIRMADA');
        return res.status(400).json({msg: error.message})    
    }
    
   // comprobar su password

   if(await usuario.comprobarPassword(password)){
    res.json({
        _id:usuario._id,
        nombre: usuario.nombre,
        email:usuario.email
    })
   }else{
    const error = new Error('PASSWORD INCORRECTO');
    return res.status(403).json({msg: error.message}) 
   }
}
export {
    registrar,
    autenticar
}


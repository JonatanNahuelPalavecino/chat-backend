import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth"
import auth from "../config/config.js"

class Usuario {
    constructor(logeado, socketId, usuario) {
        this.logeado = logeado;
        this.socketId = socketId;
        this.usuario = usuario;
    }
}

const usuariosConectados = []

const crearUsuario = (estado, socketId, usuario) => {
    const nuevoUsuario = new Usuario(estado, socketId, usuario)
    usuariosConectados.push(nuevoUsuario)
    console.log(`El usuario ${usuario} inició sesión.`);
}

export const onSignInWithEmail = async (req, res) => {

    const {email, pass} = req.body

    await createUserWithEmailAndPassword(auth, email, pass)
        .then((resp) => {
            console.log("Usuario registrado con su email", resp.user.email);
            res.send({success: "Usuario Registrado"});
        })
        .catch((err) => {
            console.log("Error porque ", err);
            res.status(500).json({ error: "Usuario no registrado por un error" });
        })
}

export const onLogInWithEmail = async (req, res) => {

    const {email, pass, socketId} = req.body

    await signInWithEmailAndPassword(auth, email, pass)
        .then((resp) => {
            console.log("Inicio de sesion correcto");
            crearUsuario(true, socketId, resp.user.email)
            res.send({success: resp.user.email});
        })
        .catch((err) => {
            console.log("Error porque ", err);
            res.status(500).json({ error: "El inicio de sesion fallo por un error" });
        })
}

export const onLogInWithGoogle = (req, res) => {

    const {email, socketId} = req.body
    try {
        crearUsuario(true, socketId, email)
        res.send({success: email});
    } catch {
        res.status(500).json({ error: "El inicio de sesion con Google fallo por un error" });
    }
} 

export default usuariosConectados
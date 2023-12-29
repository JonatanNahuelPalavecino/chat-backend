import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth"
import auth from "../config/config.js"

export const onSignInWithEmail = async (req, res) => {

    const {email, pass} = req.body

    await createUserWithEmailAndPassword(auth, email, pass)
        .then((resp) => {
            console.log("Usuario registrado con su email");
            res.send({success: resp.user.email});
        })
        .catch((err) => {
            console.log("Error porque ", err);
            res.status(500).json({ error: "Usuario no registrado por un error" });
        })
}

export const onLogInWithEmail = async (req, res) => {

    const {email, pass} = req.body

    await signInWithEmailAndPassword(auth, email, pass)
        .then((resp) => {
            console.log("Inicio de sesion correcto");
            res.send({success: resp.user.email});
        })
        .catch((err) => {
            console.log("Error porque ", err);
            res.status(500).json({ error: "El inicio de sesion fallo por un error" });
        })
}

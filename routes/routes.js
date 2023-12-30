import express from "express"
import { onLogInWithEmail, onLogInWithGoogle, onSignInWithEmail } from "../funciones/funciones.js"
const router = express()

router.get("/prueba-api", (req, res) => {
    res.send("¡Hola!, Esto es una ruta de prueba")
})

router.post("/signin-with-email", onSignInWithEmail)

router.post("/login-with-email", onLogInWithEmail)

router.post("/login-with-google", onLogInWithGoogle)

export default router
//STANDAR DE ECMASCRIPT 6 O MODULOS DE JAVASCRIPT
//SE AGREGA "type": "module" en package.json

import express from "express"
import http from "http"
import { Server as SocketServer } from "socket.io";
import router from "./routes/routes.js"
import cors from "cors"
import bodyParser from "body-parser";
import morgan from "morgan";
import usuariosConectados from "./funciones/funciones.js";

const app = express()
const server= http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(router)

io.on('connection', socket => {

    socket.on("message", (data) => { 

        const usuario = usuariosConectados.find(usuario => usuario.socketId === socket.id);
        const from = usuario ? usuario.usuario : socket.id;

        socket.broadcast.emit("message", {
            data,
            from: from
        })
    })

    socket.on("logout", (mail) => {

        const usuario = usuariosConectados.find(usuario => usuario.usuario === mail);
        if (usuario) {
          const index = usuariosConectados.indexOf(usuario);
          usuariosConectados.splice(index, 1);
          socket.emit('userOnLine', {...usuariosConectados})
          console.log(`El usuario ${mail} cerró sesión.`);
        }

    })

    socket.on('userOnLine', (mail) => {

        const online = usuariosConectados.some(user => user.usuario === mail)
        console.log(online);

        socket.emit('userOnLine', {...usuariosConectados})
    })

})

server.listen(8000)
console.log("Server on port", 8000);
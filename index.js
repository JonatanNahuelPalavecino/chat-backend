//STANDAR DE ENMASCRIPT 6 O MODULOS DE JAVASCRIPT
//SE AGREGA "type": "module" en package.json

import express from "express"
import http from "http"
import { Server as SocketServer } from "socket.io";

const app = express()
const server= http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on('connection', socket => {
    console.log(socket.id);

    socket.on("message", (data) => {
        socket.broadcast.emit("message", {
            data,
            from: socket.id.slice(6)
        })
    })
})

server.listen(8000)
console.log("Server on port", 8000);
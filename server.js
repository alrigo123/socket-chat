import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("Un usuario se ha conectado:", socket.id);

    socket.emit("message", {
        text: "¡Hola! ¿En qué puedo ayudarte?",
        options: ["Soporte técnico", "Información de productos", "Hablar con un humano"]
    });

    socket.on("userResponse", (data) => {
        console.log(`Usuario seleccionó: ${data}`);

        if (data === "Soporte técnico") {
            socket.emit("message", { text: "¿Qué problema tienes?", options: ["Error de conexión", "Problema con el pago"] });
        } else if (data === "Información de productos") {
            socket.emit("message", { text: "Tenemos varios productos. ¿Qué te interesa?", options: ["Laptops", "Teléfonos"] });
        } else if (data === "Hablar con un humano") {
            socket.emit("message", { text: "Te conectaremos con un agente en breve." });
        }
    });

    socket.on("disconnect", () => {
        console.log("Un usuario se ha desconectado");
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Servidor WebSocket corriendo en el puerto ${PORT}`));

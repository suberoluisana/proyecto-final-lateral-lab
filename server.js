require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const clientesRouter = require("./routes/clientes");

const app = express();
const PORT = process.env.PORT || 3000;

// Permite recibir información en formato JSON
app.use(express.json());

// Permite servir los archivos del frontend
app.use(express.static(path.join(__dirname, "public")));

// Conecta las rutas de clientes
app.use("/clientes", clientesRouter);

// Conecta con MongoDB y luego inicia el servidor
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Conexión exitosa con MongoDB.");

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar con MongoDB:", error.message);
    });

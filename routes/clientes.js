const express = require("express");
const Cliente = require("../models/Cliente");

const router = express.Router();


// POST /clientes → guarda un nuevo registro en MongoDB
router.post("/", async (req, res) => {
    const { nombre, edad, ciudad } = req.body;

    // Validar campos obligatorios
    if (
        !nombre || !String(nombre).trim() ||
        edad === undefined || edad === null || edad === "" ||
        !ciudad || !String(ciudad).trim()
    ) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios: nombre, edad y ciudad."
        });
    }

    // Convertir y validar edad
    const edadNumero = Number(edad);

    if (!Number.isFinite(edadNumero) || edadNumero <= 0) {
        return res.status(400).json({
            error: "La edad debe ser un número positivo."
        });
    }

    try {
        const nuevoCliente = new Cliente({
            nombre: String(nombre).trim(),
            edad: edadNumero,
            ciudad: String(ciudad).trim()
        });

        await nuevoCliente.save();

        res.status(201).json({
            mensaje: `Hola ${nuevoCliente.nombre} de ${nuevoCliente.ciudad}, tienes ${nuevoCliente.edad} años. Gracias por tu interés en Lateral Lab.`,
            cliente: nuevoCliente
        });

    } catch (error) {
        res.status(500).json({
            error: "No fue posible guardar el registro en la base de datos."
        });
    }
});


// GET /clientes → devuelve los últimos registros de MongoDB
router.get("/", async (req, res) => {
    try {
        const clientes = await Cliente.find()
            .sort({ _id: -1 })
            .limit(10);

        res.json(clientes);

    } catch (error) {
        res.status(500).json({
            error: "No fue posible consultar los registros."
        });
    }
});


module.exports = router;

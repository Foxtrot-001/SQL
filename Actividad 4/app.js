const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint 1: /api/
app.get("/api/", (req, res) => {
  res.status(200).json({ mensaje: "Hola mundo" });
});

// Endpoint 2: /api/suma
app.get("/api/suma", (req, res) => {
  const { num1, num2 } = req.query;
  const resultado = parseInt(num1) + parseInt(num2);
  res.status(200).json({ resultado });
});

// Endpoint 3: /api/usuario/:nombre
app.get("/api/usuario/:nombre", (req, res) => {
  const { nombre } = req.params;
  res.status(200).json({ usuario: nombre });
});

// Endpoint 4: /api/swapi/:id
const axios = require("axios");

app.get("/api/swapi/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${id}`);
    const personaje = response.data;
    res.status(200).json({ personaje });
  } catch (error) {
    res.status(404).json({ error: "Personaje no encontrado" });
  }
});

// Endpoint 5: /api/body
app.put("/api/body", (req, res) => {
  const bodyData = req.body;
  res.status(200).json(bodyData);
});

// Endpoint 6: /api/suma (POST)
app.post("/api/suma", (req, res) => {
  const { num1, num2 } = req.body;
  const resultado = parseInt(num1) + parseInt(num2);
  res.status(200).json({ resultado });
});

// Endpoint 7: DELETE
app.delete("/api/:id", (req, res) => {
  const { id } = req.params;
  if (id === "3") {
    res.status(200).json({ mensaje: "Se ha eliminado el objeto con ID 3" });
  } else {
    res
      .status(404)
      .json({ mensaje: "No se encontró el objeto con el ID especificado" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

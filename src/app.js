const express = require("express");
const app = express();
const port = 8080;
const ProductManager = require("./ProductManager");
const productManager = new ProductManager("../DesafioC4/files/productos.json");

// ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const productos = await productManager.getProducts();
  limit? res.send(productos.slice(0, limit)): res.send(productos);
});

// ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos.

app.get("/products/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const producto = await productManager.getProductById(id);
  producto? res.send(producto): res.send("Producto no encontrado");
});

app.listen(port, () => {
  console.log(`El servidor corre en el puerto ${port}`);
});


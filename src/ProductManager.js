
const fs = require("fs"); // llamo a fs para poder usarlo
const path = require("path"); // llamo a path para poder usarlo

class ProductManager {
  // creo la clase ProductManager
  constructor(path, producto) {
    // creo el constructor
    this.path = path; // creo la variable path
    this.producto = producto; // creo la variable productos
  }

  producto = []; // creo el array productos vacio

  async addProduct(producto) {
    // creo el metodo addProduct
    try {
      const productos = await this.getProducts(); // llamo al metodo getProducts
      if (productos.length === 0) {
        // si el array esta vacio le asigno el id 1
        producto.id += 1;
      } else {
        producto.id = productos[productos.length - 1].id + 1; // si no le asigno el id del ultimo producto + 1
      }
      productos.push(producto);
      await fs.promises.writeFile(
        // escribo en el archivo
        path.resolve("./", this.path), // le paso la ruta y el nombre del archivo
        JSON.stringify(productos, null, 2) // le paso el contenido del archivo
      );
      return producto.id;
    } catch (error) {
      // si hay un error lo muestro por consola
      console.log(error);
    }
  }

  async getProducts() {
    // creo el metodo getProducts
    try {
      const contenido = await fs.promises.readFile(
        path.resolve("./", this.path),
        "utf-8"
      );
      return JSON.parse(contenido);
    } catch (error) {
      console.log(error);
    }
  }
// creo el metodo getProductById para buscar un producto por id y devolverlo en formato objeto y de no encontrarlo devolver un error
// el archivo es formato json  uso JSON.parse para convertirlo en objeto

  async getProductById(id) {
    try {
      const productos = await this.getProducts();
      const producto = productos.find((producto) => producto.id === id);
      
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      return producto;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, producto) {
    try {
      const productos = await this.getProducts();
      const index = productos.findIndex((producto) => producto.id === id);
      productos[index] = producto;
      await fs.promises.writeFile(
        // escribo en el archivo
        path.resolve("./", this.path), // le paso la ruta y el nombre del archivo
        JSON.stringify(productos, null, 2) // le paso el contenido del archivo actualizado
      );
      return producto; // devuelvo el producto actualizado
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productos = await this.getProducts();
      const productosFiltrados = productos.filter(
        (producto) => producto.id !== id
      );
      await fs.promises.writeFile(
        path.resolve("./", this.path),
        JSON.stringify(productosFiltrados, null, 2)
      );
      return productosFiltrados;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductManager; // exporto la clase ProductManager

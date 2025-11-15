/**
 * MÓDULO: catalogo.js
 * -----------------------------------------------
 * Contiene el listado global de productos
 * Este catálogo LO UTILIZAN:
 *  - index.html (productos destacados)
 *  - menu.html (lista completa)
 *  - detalles.html (página de detalle)
 *  - carrito (precio, imagen)
 *  - pagos (resumen)
 *
 * OBJETIVO:
 * Tener toda la información del negocio
 * en un solo archivo administrable.
 */
export const PRODUCTOS = {
  americano: {
    id: "americano",
    nombre: "Café Americano",
    precio: 4.30,
    precioAnterior: 5.00,
    categoria: "Cafés Calientes",
    img: "img/IMAG-MENU/cafeamericano.jpg",
    descripcion: "Clásico café americano de sabor intenso.",
    galeria: ["img/IMAG-MENU/cafeamericano.jpg"]
  },

  frappe: {
    id: "frappe",
    nombre: "Frappe de Chocolate",
    precio: 6.00,
    precioAnterior: 7.50,
    categoria: "Bebidas Frías",
    img: "img/IMAG-MENU/frappe.jpg",
    descripcion: "Cremoso frappe con chocolate.",
    galeria: ["img/IMAG-MENU/frappe.jpg"]
  },

  tarta: {
    id: "tarta",
    nombre: "Tarta de Manzana",
    precio: 6.50,
    precioAnterior: 7.50,
    categoria: "Postres",
    img: "img/IMAG-MENU/tartamanzana.jpg",
    descripcion: "Tarta tradicional con manzanas frescas.",
    galeria: ["img/IMAG-MENU/tartamanzana.jpg"]
  },

  expresso: {
    id: "expresso",
    nombre: "Expresso Doble",
    precio: 4.50,
    precioAnterior: 0,
    categoria: "Cafés Calientes",
    img: "img/IMAG-MENU/expressodoble.jpg",
    descripcion: "Doble espresso fuerte para los amantes del café.",
    galeria: ["img/IMAG-MENU/expressodoble.jpg"]
  },

  frappuccino: {
    id: "frappuccino",
    nombre: "Frappuccino Clásico",
    precio: 7.00,
    precioAnterior: 8.00,
    categoria: "Bebidas Frías",
    img: "img/IMAG-MENU/frappuccino.jpg",
    descripcion: "Refrescante frappuccino preparado al momento.",
    galeria: ["img/IMAG-MENU/frappuccino.jpg"]
  },

  pie: {
    id: "pie",
    nombre: "Pie de Limón",
    precio: 6.00,
    precioAnterior: 6.50,
    categoria: "Postres",
    img: "img/IMAG-MENU/piedelimon.jpg",
    descripcion: "Pie suave y cremoso con toque de limón.",
    galeria: ["img/IMAG-MENU/piedelimon.jpg"]
  },

  mocaccino: {
    id: "mocaccino",
    nombre: "Mocaccino",
    precio: 6.00,
    precioAnterior: 7.00,
    categoria: "Cafés Calientes",
    img: "img/IMAG-MENU/mocaccino.jpg",
    descripcion: "Delicioso café con chocolate y espuma.",
    galeria: ["img/IMAG-MENU/mocaccino.jpg"]
  }
};
/**
 * Renderiza productos según categoría
 */
export function iniciarCatalogo() {
    const contCalientes = document.querySelector("#cat-cafes-calientes");
    const contFrias = document.querySelector("#cat-bebidas-frias");
    const contPostres = document.querySelector("#cat-postres");

    if (!contCalientes) return;

    const lista = Object.values(PRODUCTOS);

    lista.forEach(prod => {
        const card = document.createElement("article");
        card.className = "card-product";

        card.innerHTML = `
            <div class="container-img">
                <img src="${prod.img}" alt="${prod.nombre}">
            </div>
            <div class="content-card-product">
                <h3>${prod.nombre}</h3>
                <div class="add-cart" data-id="${prod.id}">
                    <img class="icono-carrito" src="img/carrito.png">
                </div>
                <div class="price">S/${prod.precio.toFixed(2)}</div>
            </div>
        `;

        card.querySelector("h3").addEventListener("click", () => {
            window.location.href = `detalles.html?id=${prod.id}`;
        });

        if (prod.categoria === "Cafés Calientes") contCalientes.appendChild(card);
        if (prod.categoria === "Bebidas Frías") contFrias.appendChild(card);
        if (prod.categoria === "Postres") contPostres.appendChild(card);
    });
}

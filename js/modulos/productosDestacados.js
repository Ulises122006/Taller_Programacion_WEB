/**
 * MÓDULO: productosDestacados.js
 * -----------------------------------------------
 * Este módulo se encarga de:
 * 1. Cargar productos dinámicos en la sección "Productos Destacados"
 * 2. Generar tarjetas (cards) de productos a partir del catálogo central
 * 3. Activar botones:
 *    - Ver producto → detalles.html?id=xxx
 *    - Añadir al carrito (redirige al detalle para seleccionar cantidad)
 * 4. Evitar contenido “quemado” y permitir administración desde un solo archivo
 */

import { PRODUCTOS } from "./catalogo.js";

/**
 * FUNCIÓN PRINCIPAL:
 * Renderiza los productos destacados en el index.html
 */
export function cargarProductosDestacados() {
console.log("cargarProductosDestacados se está ejecutando");
    // Contenedor donde irán las tarjetas
    const contenedor = document.querySelector(".container-products .slider-track");
    if (!contenedor) return; // Prevención por si no existe el contenedor

    contenedor.innerHTML = ""; // Limpio productos fijos que tenías en el HTML

    /**
     * Recorremos todos los productos del catálogo.
     * PRODUCTOS es un objeto, por eso usamos Object.values(PRODUCTOS)
     * para obtener un arreglo de productos.
     */
    Object.values(PRODUCTOS).forEach(p => {

        // Crear artículo (tarjeta del producto)
        const card = document.createElement("article");
        card.className = "card-product";

        // Cálculo del porcentaje de descuento
        const descuento = p.precioAnterior
            ? "-" + Math.round(((p.precioAnterior - p.precio) / p.precioAnterior) * 100) + "%"
            : "";

        // HTML de la tarjeta del producto
        card.innerHTML = `
            <div class="container-img">
                <img src="${p.img}" alt="${p.nombre}">
                <span class="discount">${descuento}</span>

                <!-- Botones flotantes: ver producto / favoritos -->
                <div class="button-group">
                    <button class="icon-button ver-btn" data-id="${p.id}">
                        <img src="img/ver.png" alt="Ver producto">
                    </button>
                    <button class="icon-button">
                        <img src="img/favorito.png" alt="Agregar a favoritos">
                    </button>
                </div>
            </div>

            <div class="content-card-product">
                <h3>${p.nombre}</h3>

                <!-- Botón añadir al carrito -->
                <div class="add-cart" data-id="${p.id}">
                    <img class="icono-carrito" src="img/carrito.png" alt="Carrito">
                </div>

                <div class="price">
                    S/${p.precio.toFixed(2)}
                    ${p.precioAnterior ? `<span>S/${p.precioAnterior.toFixed(2)}</span>` : ""}
                </div>
            </div>
        `;

        // Añadir tarjeta al contenedor
        contenedor.appendChild(card);
    });

    /**
     * EVENTOS: Ver producto
     * Redirigimos a la página detalles.html pasando el id del producto
     */
    document.querySelectorAll(".ver-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            window.location.href = `detalles.html?id=${id}`;
        });
    });

    /**
     * EVENTOS: Añadir al carrito desde el index
     * Por simplicidad, enviamos al usuario al detalle para seleccionar cantidad
     */
    document.querySelectorAll(".add-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            window.location.href = `detalles.html?id=${id}`;
        });
    });
}

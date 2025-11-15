import { PRODUCTOS } from "./catalogo.js";

/**
 * Carga los productos en menu.html agrupados por categoría
 */
/**
 * Carga los productos en menu.html agrupados por categoría
 */
export function iniciarMenu() {
    const catCalientes = document.getElementById("cat-cafes-calientes");
    const catFrias = document.getElementById("cat-bebidas-frias");
    const catPostres = document.getElementById("cat-postres");

    const productos = Object.values(PRODUCTOS);

    productos.forEach(p => {
        const card = document.createElement("article");
        card.className = "card-product";

        card.innerHTML = `
            <div class="container-img">
                <img src="${p.img}" alt="${p.nombre}">
            </div>

            <div class="content-card-product">
                <h3 class="nombre-producto" data-id="${p.id}">
                    ${p.nombre}
                </h3>

                <div class="add-cart" data-id="${p.id}">
                    <img class="icono-carrito" src="img/carrito.png" alt="Agregar al Carrito">
                </div>

                <div class="price">S/${p.precio.toFixed(2)}</div>
            </div>
        `;

        // Evento: clic en nombre
        card.querySelector(".nombre-producto").addEventListener("click", () => {
            window.location.href = `detalles.html?id=${p.id}`;
        });

        // Evento: clic en icono carrito
        card.querySelector(".icono-carrito").addEventListener("click", () => {
            window.location.href = `detalles.html?id=${p.id}`;
        });

        // Evento: clic en el contenedor del carrito
        card.querySelector(".add-cart").addEventListener("click", () => {
            window.location.href = `detalles.html?id=${p.id}`;
        });

        // Insertar según categoría
        if (p.categoria.includes("Calientes")) catCalientes.appendChild(card);
        if (p.categoria.includes("Frías")) catFrias.appendChild(card);
        if (p.categoria.includes("Postres")) catPostres.appendChild(card);
    });
}
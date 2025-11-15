// busquedaResultados.js
import { PRODUCTOS } from "./catalogo.js";

/**
 * Cargar resultados en buscar.html usando la búsqueda guardada
 */
export function iniciarResultadosBusqueda() {

    const cont = document.querySelector("#resultadosBusqueda");
    const textoElem = document.querySelector("#busquedaTexto");

    if (!cont) return;

    const termino = (localStorage.getItem("ultimaBusqueda") || "").toLowerCase();

    if (textoElem) {
        textoElem.textContent = termino
            ? `Resultados para: "${termino}"`
            : "Escribe algo en el buscador para ver resultados.";
    }

    // Convertir catálogo en array
    const catalogo = Object.values(PRODUCTOS);

    // Filtro principal
    const resultados = catalogo.filter(p =>
        p.nombre.toLowerCase().includes(termino) ||
        p.categoria.toLowerCase().includes(termino)
    );

    // Si no hay texto
    if (termino.length === 0) {
        cont.innerHTML = `<p style="padding:20px;">Ingresa un término de búsqueda.</p>`;
        return;
    }

    // No hubo coincidencias
    if (resultados.length === 0) {
        cont.innerHTML = `<p style="padding:20px;">No se encontraron resultados.</p>`;
        return;
    }

    // Limpiar contenedor
    cont.innerHTML = "";

    // Crear tarjetas dinámicas
    resultados.forEach(prod => {
        const card = document.createElement("article");
        card.className = "card-product";

        card.innerHTML = `
            <div class="container-img">
                <img src="${prod.img}" alt="${prod.nombre}">
            </div>
            <div class="content-card-product">
                <h3>${prod.nombre}</h3>

                <div class="add-cart">
                    <img src="img/carrito.png" alt="Carrito">
                </div>

                <div class="price">
                    S/${prod.precio.toFixed(2)}
                </div>
            </div>
        `;

        // Click al título → ir a detalles
        card.querySelector("h3").addEventListener("click", () => {
            window.location.href = `detalles.html?id=${prod.id}`;
        });

        cont.appendChild(card);
    });
}

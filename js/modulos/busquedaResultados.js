// busquedaResultados.js
import { PRODUCTOS } from "./catalogo.js";

/**
 * Cargar resultados en buscar.html usando la búsqueda guardada
 */
export function iniciarResultadosBusqueda() {

    const cont = document.querySelector("#resultadosBusqueda");
    const textoElem = document.querySelector("#busquedaTexto");

    if (!cont) return;

    // Si el contenedor está usando las clases del carrusel, desactivarlas
    // aquí para que en la página de búsqueda los resultados no se desplacen.
    if (cont.classList.contains('slider-track')) {
        cont.classList.remove('slider-track');
        cont.classList.add('search-results');
        // asegurar que no quede animación aplicada por inline styles
        cont.style.animation = 'none';
        cont.style.gap = '2rem';
        cont.style.alignItems = 'flex-start';
    }

    // Leer término prioritariamente desde query param 'q', si no existe usar localStorage
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('q');
    const termino = ( (qParam) ? qParam : (localStorage.getItem("ultimaBusqueda") || "") ).toLowerCase();

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

                <div class="add-cart" role="button" tabindex="0" data-id="${prod.id}">
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

        // Click en el icono de carrito también lleva al detalle (o puede añadir al carrito)
        const addBtn = card.querySelector('.add-cart');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.href = `detalles.html?id=${prod.id}`;
            });
            // permitir activar con Enter
            addBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = `detalles.html?id=${prod.id}`;
                }
            });
        }

        cont.appendChild(card);
    });
}

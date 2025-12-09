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

    // Leer término desde query param 'q'
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('q') || "";
    const termino = decodeURIComponent(qParam).toLowerCase();

    // Si no hay texto, mostrar mensaje
    if (termino.length === 0) {
        if (textoElem) {
            textoElem.textContent = "Escribe un término para buscar";
        }
        cont.innerHTML = `<div class="search-empty-state"><p>¿Qué te gustaría encontrar? Usa el buscador para descubrir nuestros productos.</p></div>`;
        return;
    }

    // Mostrar qué se está buscando
    if (textoElem) {
        textoElem.textContent = `Búsqueda: "${termino}"`;
    }

    // Convertir catálogo en array y filtrar
    const catalogo = Object.values(PRODUCTOS);
    const resultados = catalogo.filter(p => {
        const nombre = p.nombre.toLowerCase();
        const categoria = (p.categoria || "").toLowerCase();
        const descripcion = (p.descripcion || "").toLowerCase();
        return nombre.includes(termino) || categoria.includes(termino) || descripcion.includes(termino);
    });

    // No hubo coincidencias
    if (resultados.length === 0) {
        cont.innerHTML = `<div class="search-empty-state"><svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg><h3>No encontramos lo que buscas</h3><p>Intenta con otras palabras clave o explora nuestro <a href="menu.html">menú completo</a></p></div>`;
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

        // Click al título, ir a detalles
        card.querySelector("h3").addEventListener("click", () => {
            window.location.href = `detalles.html?id=${prod.id}`;
        });

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

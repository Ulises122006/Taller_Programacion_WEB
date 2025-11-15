// buscador.js
import { PRODUCTOS } from "./catalogo.js";

/**
 * Activa el buscador del navbar en todas las páginas
 */
export function iniciarBuscador() {
    const form = document.querySelector("#searchForm");
    const input = document.querySelector("#searchInput");

    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const texto = input.value.trim();

        if (texto.length === 0) return;

        // Guardar búsqueda para usarla en buscar.html
        localStorage.setItem("ultimaBusqueda", texto);

        // Redirigir a página de resultados
        window.location.href = "buscar.html";
    });
}

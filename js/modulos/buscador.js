// buscador.js
import { PRODUCTOS } from "./catalogo.js";

/**
 * Activa el buscador del navbar en todas las páginas
 * - Maneja submit (redirige a buscar.html y guarda la búsqueda)
 * - Muestra sugerencias mientras se escribe (usando PRODUCTOS)
 * - Prefill del input si estamos en buscar.html
 */
export function iniciarBuscador() {
    const form = document.querySelector("#searchForm");
    const input = document.querySelector("#searchInput");
    const suggestions = document.querySelector("#search-suggestions");

    if (!form || !input) return;

    // Prefill: si la URL contiene ?q=..., ponerlo en el input
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('q');
    if (qParam) input.value = decodeURIComponent(qParam);

    // Enviar formulario: guardar término y redirigir
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const texto = input.value.trim();
        if (texto.length === 0) return;

        // Redirigir con query param (más robusto y compartible)
        const url = `buscar.html?q=${encodeURIComponent(texto)}`;
        window.location.href = url;
    });

    // Sugerencias en tiempo real
    if (!suggestions) return; // si no hay contenedor, no intentamos sugerencias

    const productosArray = Object.values(PRODUCTOS || {});

    input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();
        suggestions.innerHTML = "";

        if (q.length < 2) return; // mostrar sugerencias desde 2 caracteres

        const matches = productosArray.filter(p =>
            p.nombre.toLowerCase().includes(q) ||
            (p.categoria || "").toLowerCase().includes(q)
        ).slice(0, 6);

        if (matches.length === 0) return;

        const list = document.createElement('ul');
        list.className = 'suggestions-list';
        list.setAttribute('role', 'listbox');

        matches.forEach(m => {
            const item = document.createElement('li');
            item.className = 'suggestion-item';
            item.setAttribute('role', 'option');
            item.textContent = m.nombre;
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                const url = `buscar.html?q=${encodeURIComponent(m.nombre)}`;
                window.location.href = url;
            });
            list.appendChild(item);
        });

        suggestions.appendChild(list);
    });

    // Cerrar sugerencias al perder foco (con retraso para permitir click)
    input.addEventListener('blur', () => {
        setTimeout(() => { suggestions.innerHTML = ''; }, 150);
    });
}

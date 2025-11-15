/**
 * Carrito de compras dinámico con localStorage:
 * - Carga productos
 * - Renderiza la tabla
 * - Control de cantidad
 * - Eliminar productos
 * - Total, subtotal, envío
 */

const STORAGE_KEY = "carritoDulceAroma";

/* -----------------------------
      LOCAL STORAGE
----------------------------- */
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}

function actualizarContador() {
    const carrito = obtenerCarrito();
    const numero = document.querySelector(".contenido-carrito .number");
    if (numero) numero.textContent = `(${carrito.length})`;
}

/* -----------------------------
      RENDERIZAR CARRITO
----------------------------- */
function renderizarCarrito() {
    const tbody = document.querySelector(".cart-table tbody");
    if (!tbody) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:20px;">
                    🛒 Tu carrito está vacío.
                </td>
            </tr>
        `;
        actualizarResumen();
        return;
    }

    tbody.innerHTML = "";

    carrito.forEach((p, i) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <div class="product-info">
                    <img src="${p.img}" class="product-image-cart">
                    <span>${p.nombre}</span>
                </div>
            </td>

            <td>S/${p.precio.toFixed(2)}</td>

            <td>
                <div class="quantity-selector">
                    <button class="quantity-btn minus-btn" data-index="${i}">-</button>
                    <input type="number" min="1" value="${p.cantidad}" disabled>
                    <button class="quantity-btn plus-btn" data-index="${i}">+</button>
                </div>
            </td>

            <td>S/${(p.precio * p.cantidad).toFixed(2)}</td>

            <td>
                <button class="remove-item-btn" data-index="${i}">X</button>
            </td>
        `;

        tbody.appendChild(row);
    });

    actualizarResumen();
    agregarEventos();
}

/* -----------------------------
        EVENTOS
----------------------------- */
function agregarEventos() {
    const carrito = obtenerCarrito();

    // Botones +
    document.querySelectorAll(".plus-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const i = Number(btn.dataset.index);
            carrito[i].cantidad++;
            guardarCarrito(carrito);
            renderizarCarrito();
        });
    });

    // Botones -
    document.querySelectorAll(".minus-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const i = Number(btn.dataset.index);
            carrito[i].cantidad = Math.max(1, carrito[i].cantidad - 1);
            guardarCarrito(carrito);
            renderizarCarrito();
        });
    });

    // Eliminar item
    document.querySelectorAll(".remove-item-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const i = Number(btn.dataset.index);
            carrito.splice(i, 1);
            guardarCarrito(carrito);
            renderizarCarrito();
            actualizarContador();
        });
    });
}

/* -----------------------------
        RESUMEN
----------------------------- */
function actualizarResumen() {
    const carrito = obtenerCarrito();

    const subtotalElemento = document.querySelector(".cart-subtotal");
    const envioElemento = document.querySelector(".cart-envio");
    const totalElemento = document.querySelector(".cart-total");

    const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const envio = carrito.length > 0 ? 5 : 0;
    const total = subtotal + envio;

    if (subtotalElemento) subtotalElemento.textContent = `S/${subtotal.toFixed(2)}`;
    if (envioElemento) envioElemento.textContent = `S/${envio.toFixed(2)}`;
    if (totalElemento) totalElemento.textContent = `S/${total.toFixed(2)}`;
}

/* -----------------------------
        INICIAR CARRITO
----------------------------- */
export function iniciarCarrito() {
    renderizarCarrito();
    actualizarContador();
}

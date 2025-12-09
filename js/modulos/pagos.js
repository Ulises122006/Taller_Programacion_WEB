/**
 * Página de pago (pagos.html):
 * - Resumen del carrito
 * - Integración Culqi Checkout v4
 * - Validación de datos de facturación
 * - Tokenización de tarjetas
 */

import { inicializarCulqi, abrirCulqi } from "./culqi.js";

const STORAGE_KEY = "carritoDulceAroma";

/* -----------------------------
      BASE: Carrito
------------------------------ */
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function limpiarCarrito() {
    localStorage.removeItem(STORAGE_KEY);
}

/* -----------------------------
      TOAST
------------------------------ */
function mostrarToast(msg, tipo = "error") {
    const toast = document.createElement("div");
    toast.className = `toast-footer ${tipo}`;
    toast.textContent = msg;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 40);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

/* -----------------------------
      MODAL FINAL
------------------------------ */
function mostrarModalFinal() {
    const modal = document.createElement("div");
    modal.className = "modal-confirm";

    modal.innerHTML = `
        <div class="modal-content">
            <h3>🎉 Pedido Realizado</h3>
            <p>¡Gracias por tu compra! Ya estamos preparando tu pedido.</p>
            <button id="goHome">Volver al Inicio</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#goHome").addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

/* ===================================================================
      FUNCIÓN PRINCIPAL
=================================================================== */
export function iniciarPagos() {
    const carrito = obtenerCarrito();

    const contenedor = document.querySelector(".summary-items");
    const subtotalElem = document.querySelector(".checkout-subtotal");
    const envioElem = document.querySelector(".checkout-envio");
    const totalElem = document.querySelector(".checkout-total");
    const form = document.querySelector("#form-pago");

    if (!contenedor || !form) return;

    /* -------------------------------------
            CARGAR RESUMEN DEL CARRITO
    ------------------------------------- */
    if (carrito.length === 0) {
        contenedor.innerHTML = `<p style="padding:15px; text-align:center;">Tu carrito está vacío.</p>`;
        subtotalElem.textContent = "S/0.00";
        envioElem.textContent = "S/0.00";
        totalElem.textContent = "S/0.00";
        return;
    }

    contenedor.innerHTML = "";
    let subtotal = 0;

    carrito.forEach(p => {
        const totalProducto = p.precio * p.cantidad;
        subtotal += totalProducto;

        const div = document.createElement("div");
        div.className = "summary-product";
        div.innerHTML = `
            <span>${p.nombre} (x${p.cantidad})</span>
            <span>S/${totalProducto.toFixed(2)}</span>
        `;
        contenedor.appendChild(div);
    });

    const envio = 5;
    const total = subtotal + envio;

    subtotalElem.textContent = `S/${subtotal.toFixed(2)}`;
    envioElem.textContent = `S/${envio.toFixed(2)}`;
    totalElem.textContent = `S/${total.toFixed(2)}`;

    /* ======================================
       SUBMIT: VALIDACIÓN Y CULQI
    ====================================== */
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.querySelector("#firstname").value.trim();
        const apellidos = document.querySelector("#lastname").value.trim();
        const direccion = document.querySelector("#address").value.trim();
        const telefono = document.querySelector("#phone").value.trim();
        const email = document.querySelector("#email").value.trim();

        // Validación de campos obligatorios
        if (!nombre || !apellidos || !direccion || !telefono || !email) {
            mostrarToast(" Todos los campos son obligatorios.");
            return;
        }

        // Validación de email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            mostrarToast(" Correo inválido.");
            return;
        }

        // Validación de teléfono (al menos 7 dígitos)
        const soloNumeros = telefono.replace(/\D/g, "");
        if (soloNumeros.length < 7) {
            mostrarToast(" Teléfono inválido.");
            return;
        }

        // ✔ Datos válidos → Abrir Culqi
        const totalSinSimbolos = parseFloat(
            document.querySelector(".checkout-total").textContent.replace("S/", "")
        );

        if (!inicializarCulqi(totalSinSimbolos)) {
            mostrarToast(" Error al inicializar Culqi.");
            return;
        }

        if (abrirCulqi()) {
            console.log(" Modal de Culqi abierto");
        } else {
            mostrarToast(" No se pudo abrir el modal de Culqi.");
        }
    });
}

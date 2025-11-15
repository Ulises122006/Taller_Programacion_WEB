/**
 * Página de pago (pagos.html):
 * - Resumen del carrito
 * - Formateo automático de tarjeta y fecha
 * - Validación real (tarjeta, fecha, cvv, email)
 * - Modal final
 */

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
       MOSTRAR / OCULTAR CAMPOS DE TARJETA
    ====================================== */
    const radios = document.querySelectorAll("input[name='payment']");
    const cardFields = document.querySelector(".card-fields");

    radios.forEach(r => {
        r.addEventListener("change", () => {
            if (r.value === "creditcard") {
                cardFields.style.display = "block";
            } else {
                cardFields.style.display = "none";
            }
        });
    });

    /* -------------------------------------
            FORMATEO DE TARJETA
    ------------------------------------- */
    const cardInput = document.querySelector("#cardNumber");
    cardInput.addEventListener("input", (e) => {
        let valor = e.target.value.replace(/\D/g, "");
        valor = valor.substring(0, 16);
        valor = valor.replace(/(.{4})/g, "$1 ").trim();
        e.target.value = valor;
    });

    /* -------------------------------------
            FORMATEO DE FECHA MM/AA
    ------------------------------------- */
    const expiryInput = document.querySelector("#expiry");
    expiryInput.addEventListener("input", (e) => {
        let v = e.target.value.replace(/\D/g, "");
        if (v.length >= 3) {
            v = v.substring(0, 4);
            v = v.replace(/(\d{2})(\d{1,2})/, "$1/$2");
        }
        e.target.value = v;
    });

    /* -------------------------------------
            SUBMIT: VALIDACIÓN COMPLETA
    ------------------------------------- */
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.querySelector("#firstname").value.trim();
        const apellidos = document.querySelector("#lastname").value.trim();
        const direccion = document.querySelector("#address").value.trim();
        const telefono = document.querySelector("#phone").value.trim();
        const email = document.querySelector("#email").value.trim();
        const metodo = document.querySelector("input[name='payment']:checked").value;

        // Campos obligatorios
        if (!nombre || !apellidos || !direccion || !telefono || !email) {
            mostrarToast("❌ Todos los campos son obligatorios.");
            return;
        }

        // Email válido
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            mostrarToast("❌ Correo inválido.");
            return;
        }

        // Validación tarjeta si corresponde
        if (metodo === "creditcard") {
            const card = cardInput.value.replace(/\s/g, "");
            const exp = expiryInput.value.trim();
            const cvv = document.querySelector("#cvv").value.trim();

            if (card.length !== 16) {
                mostrarToast("❌ La tarjeta debe tener 16 dígitos.");
                return;
            }

            // fecha MM/AA
            if (!/^\d{2}\/\d{2}$/.test(exp)) {
                mostrarToast("❌ Formato de fecha inválido (MM/AA).");
                return;
            }

            const [MM, AA] = exp.split("/").map(Number);

            if (MM < 1 || MM > 12) {
                mostrarToast("❌ Mes inválido (01-12).");
                return;
            }

            const hoy = new Date();
            const añoActual = Number(String(hoy.getFullYear()).slice(-2));
            const mesActual = hoy.getMonth() + 1;

            if (AA < añoActual || (AA === añoActual && MM < mesActual)) {
                mostrarToast("❌ La tarjeta está vencida.");
                return;
            }

            if (cvv.length !== 3) {
                mostrarToast("❌ CVV inválido.");
                return;
            }
        }

        // ✔ Todo correcto → finalizar
        limpiarCarrito();
        mostrarModalFinal();
    });
}

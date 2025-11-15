/**
 * Maneja el formulario de suscripción del boletín (footer).
 * Valida email y muestra confirmación.
 */
export function iniciarBoletin() {
    const form = document.querySelector(".footer-boletin form");
    if (!form) return;

    const input = form.querySelector("input[type='email']");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const correo = input.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(correo)) {
            mostrarToastBoletin("❌ Correo inválido. Ingresa un email correcto.", "error");
            return;
        }

        mostrarToastBoletin(`📬 ¡Gracias por suscribirte, ${correo}!`, "success");

        input.value = "";
    });
}

/* ---------------------
   TOAST DEL BOLETÍN
---------------------- */
function mostrarToastBoletin(mensaje, tipo = "success") {
    const toast = document.createElement("div");
    toast.className = `toast-footer ${tipo}`;
    toast.textContent = mensaje;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

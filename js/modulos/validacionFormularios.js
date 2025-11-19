import { paginaActual } from './utilidades.js';

/* ============================
      MODAL ELEGANTE CONTACTO
============================ */
function mostrarModalContacto() {
    const modal = document.createElement("div");
    modal.className = "modal-confirm";

    modal.innerHTML = `
        <div class="modal-content">
            <h3>📩 Mensaje Enviado</h3>
            <p>¡Gracias por escribirnos! Te responderemos muy pronto.</p>

            <button id="cerrarModal">Aceptar</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#cerrarModal").addEventListener("click", () => {
        modal.remove();
    });
}

/* ============================
      VALIDACIÓN CONTACTO
============================ */
export function validarFormularios() {
    const page = paginaActual();
    if (page !== 'contacto.html') return;

    const form = document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = form.querySelector('#name');
        const email = form.querySelector('#email');
        const mensaje = form.querySelector('#message');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let ok = true;

        [nombre, email, mensaje].forEach(el => {
            if (!el.value.trim()) {
                el.classList.add("error");
                ok = false;
            } else {
                el.classList.remove("error");
            }
        });

        if (!emailRegex.test(email.value.trim())) {
            email.classList.add('error');
            ok = false;
        }

        if (!ok) return;

        
        mostrarModalContacto();
        form.reset();
    });
}

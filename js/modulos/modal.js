/**
 * Provee utilidades para abrir/cerrar modales (.modal).
 * Expone window.abrirModal(id) y window.cerrarModal(id).
 * Cierra al hacer clic fuera del contenido.
 */
export function manejarModales() {
  // Disponibles globalmente para usar en onclick del HTML
  window.abrirModal = (id) => {
    const m = document.getElementById(id);
    if (m) m.style.display = 'flex';
  };

  window.cerrarModal = (id) => {
    const m = document.getElementById(id);
    if (m) m.style.display = 'none';
  };

  // Cerrar al hacer click fuera del cuadro
  window.addEventListener('click', (e) => {
    if (e.target.classList?.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // Cerrar con ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal[style*="display: flex"]').forEach((m) => {
        m.style.display = 'none';
      });
    }
  });
}
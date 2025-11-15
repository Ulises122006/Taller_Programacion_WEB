/**
 * Controla el menú hamburguesa usando el checkbox #menu-toggle.
 * Cierra el menú automáticamente al hacer clic en cualquier enlace <a>.
 */
export function iniciarMenuResponsivo() {
  const menuToggle = document.querySelector('#menu-toggle');
  const menu = document.querySelector('.menu');
  if (!menuToggle || !menu) return;

  // Aplica/quita clase .active cuando cambia el checkbox
  menuToggle.addEventListener('change', () => {
    menu.classList.toggle('active', menuToggle.checked);
  });

  // Cierra al navegar por un enlace
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.checked = false;
      menu.classList.remove('active');
    });
  });
}
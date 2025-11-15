/**
 * Helpers reutilizables para el proyecto.
 */

/** Formatea un número a moneda "S/xx.xx". */
export const formatearMoneda = (v) => `S/${Number(v || 0).toFixed(2)}`;

/** Convierte "S/6.30" → 6.30 */
export const precioATextoANumero = (txt) =>
  Number((txt || '').replace(/[^\d.]/g, '')) || 0;

/** Devuelve el nombre de archivo de la página actual (e.g., "index.html") */
export const paginaActual = () => window.location.pathname.split('/').pop() || 'index.html';
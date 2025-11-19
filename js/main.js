// GLOBAL
import { iniciarMenuResponsivo } from './modulos/menuResponsivo.js';
import { iniciarBoletin } from './modulos/boletin.js';
import { paginaActual } from './modulos/utilidades.js';

// BUSCADOR
import { iniciarBuscador } from "./modulos/buscador.js";
import { iniciarResultadosBusqueda } from "./modulos/busquedaResultados.js";

// PÁGINAS
import { iniciarMenu } from "./modulos/menu.js";
import { iniciarCatalogo } from "./modulos/catalogo.js";
import { iniciarCarrito } from './modulos/carrito.js';
import { iniciarPagos } from './modulos/pagos.js';
import { iniciarDetalleProducto } from './modulos/detalleProducto.js';
import { validarFormularios } from './modulos/validacionFormularios.js';

// OPCIONALES
import { cargarProductosDestacados } from "./modulos/productosDestacados.js";

document.addEventListener('DOMContentLoaded', () => {

  // Ejecuta funciones globales
  iniciarMenuResponsivo();
  iniciarBoletin();
  iniciarBuscador();
  const page = paginaActual();

  switch (page) {

    case "index.html":
      cargarProductosDestacados?.();
      break;

    case "menu.html":
      iniciarMenu();       // Render tarjetas del menú
      iniciarCatalogo?.(); // Si existe, carga catálogo organizado por categoría
      break;

    case "carrito.html":
      iniciarCarrito();
      break;

    case "pagos.html":
      iniciarPagos()
      break;

    case "detalles.html":
      iniciarDetalleProducto();
      break;

    case "contacto.html":
      validarFormularios();
      break;

    case "buscar.html":
      iniciarResultadosBusqueda();
      break;
  }
  // ---- Página especial: buscar.html ----
    if (window.location.pathname.endsWith("buscar.html")) {
        iniciarResultadosBusqueda();
    }
});

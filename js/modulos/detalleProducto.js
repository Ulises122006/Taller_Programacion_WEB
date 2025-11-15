/**
 * Módulo detalle de producto:
 * Carga dinámicamente el producto según el ID en la URL
 * Miniaturas → imagen principal
 * Control de cantidad
 * Añadir al carrito con localStorage
 * Productos relacionados automáticos
 */

import { PRODUCTOS } from "./catalogo.js";

const STORAGE_KEY = "carritoDulceAroma";

/* ---------------------------
   FUNCIONES DE CARRITO
--------------------------- */
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

/* ---------------------------
   TOAST
--------------------------- */
function mostrarToast(mensaje) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = mensaje;
  document.body.appendChild(t);

  setTimeout(() => t.classList.add("visible"), 50);
  setTimeout(() => {
    t.classList.remove("visible");
    setTimeout(() => t.remove(), 300);
  }, 2500);
}

/* ---------------------------
   MODAL CONFIRMACIÓN
--------------------------- */
function mostrarModalConfirmacion() {
  const modal = document.createElement("div");
  modal.className = "modal-confirm";

  modal.innerHTML = `
      <div class="modal-content">
        <p>🛒 Producto agregado. ¿Deseas ir al carrito?</p>
        <div class="modal-buttons">
          <button id="goCart">Ir al carrito</button>
          <button id="stayHere">Seguir comprando</button>
        </div>
      </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#goCart").addEventListener("click", () => {
    window.location.href = "carrito.html";
  });

  modal.querySelector("#stayHere").addEventListener("click", () => {
    modal.remove();
  });
}

/* ------------------------------------------
   FUNCIÓN: Generar productos relacionados
------------------------------------------- */
function cargarRelacionados(productoActual, contenedor) {
  const relacionados = Object.values(PRODUCTOS)
    .filter(p => p.categoria === productoActual.categoria && p.id !== productoActual.id)
    .slice(0, 3); // máximo 3

  if (relacionados.length === 0) {
    contenedor.innerHTML = "<p>No hay productos relacionados.</p>";
    return;
  }

  relacionados.forEach(p => {
    const card = document.createElement("article");
    card.className = "item-card";

    card.innerHTML = `
      <div class="item-img">
        <img src="${p.img}" alt="${p.nombre}">
      </div>

      <div class="item-content">
        <h3 class="rel-nombre" data-id="${p.id}">
          ${p.nombre}
        </h3>

        <div class="item-bottom">
          <div class="add-btn" data-id="${p.id}">
            <img src="img/carrito.png" alt="Agregar al Carrito">
          </div>
          <div class="item-price">S/${p.precio.toFixed(2)}</div>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  });

  // Eventos de clic
  contenedor.querySelectorAll(".rel-nombre").forEach(el => {
    el.addEventListener("click", () => {
      window.location.href = `detalles.html?id=${el.dataset.id}`;
    });
  });

  contenedor.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = `detalles.html?id=${btn.dataset.id}`;
    });
  });
}

/* ---------------------------
   INICIAR DETALLE PRODUCTO
--------------------------- */
export function iniciarDetalleProducto() {

  // Obtener ID
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const cont = document.querySelector("#detalle-producto");

  if (!id || !PRODUCTOS[id]) {
    cont.innerHTML = "<p>Producto no encontrado</p>";
    return;
  }

  const p = PRODUCTOS[id];

  // Insertar HTML dinámico
  cont.innerHTML = `
        <div class="product-gallery">
            <div class="main-image">
                <img src="${p.img}" alt="${p.nombre}" id="mainProductImage">
            </div>

            <div class="thumbnail-images">
                ${p.galeria.map(img => `<img src="${img}" class="thumbnail">`).join("")}
            </div>
        </div>

        <div class="product-details-content">
            <h2 class="product-title">${p.nombre}</h2>

            <div class="product-price">
                S/${p.precio.toFixed(2)}
                ${p.precioAnterior ? `<span>S/${p.precioAnterior}</span>` : ""}
            </div>

            <p class="product-description">${p.descripcion}</p>

            <div class="quantity-selector">
                <label for="quantity">Cantidad:</label>
                <button type="button" class="quantity-btn minus-btn">-</button>
                <input type="number" id="quantity" value="1" min="1">
                <button type="button" class="quantity-btn plus-btn">+</button>
            </div>

            <button type="button" class="btn-add-to-cart">Añadir al Carrito</button>

            <div class="product-meta">
                <p><strong>Categoría:</strong> ${p.categoria}</p>
            </div>
        </div>
    `;

  /* Miniaturas */
  const mainImage = document.querySelector("#mainProductImage");
  document.querySelectorAll(".thumbnail").forEach(img => {
    img.addEventListener("click", () => {
      mainImage.src = img.src;
    });
  });

  /* Cantidad */
  const quantityInput = document.querySelector("#quantity");

  document.querySelector(".plus-btn").addEventListener("click", () => {
    quantityInput.value = Number(quantityInput.value) + 1;
  });

  document.querySelector(".minus-btn").addEventListener("click", () => {
    quantityInput.value = Math.max(1, Number(quantityInput.value) - 1);
  });

  /* Añadir al carrito */
  document.querySelector(".btn-add-to-cart").addEventListener("click", () => {
    const cantidad = Number(quantityInput.value);

    const producto = {
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      img: p.img,
      cantidad
    };

    let carrito = obtenerCarrito();
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) existente.cantidad += cantidad;
    else carrito.push(producto);

    guardarCarrito(carrito);
    actualizarContador();

    mostrarToast(`✔ ${p.nombre} añadido al carrito`);
    mostrarModalConfirmacion();
  });

  /* ---------------------------
     CARGAR PRODUCTOS RELACIONADOS
  --------------------------- */
  const contRelacionados = document.querySelector("#relacionados");
  cargarRelacionados(p, contRelacionados);

  actualizarContador();
}

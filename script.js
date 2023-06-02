document.addEventListener('DOMContentLoaded', function() {
  Swal.fire('¡Hola!', '¡Bienvenido a Marmoleria Sabatino!');

  const carritoList = document.getElementById('carrito-list');
  const totalAmount = document.getElementById('total-amount');
  const cartIcon = document.querySelector('.cart-icon');
  const carrito = document.querySelector('.carrito');
  const countProductos = document.getElementById('carrito-count');
  const finalizarCompraBtn = document.getElementById('finalizar-compra');
  let total = 0;
  let carritoItems = [];

  function cargarDatosDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem('carritoItems');
    if (datosGuardados) {
      carritoItems = JSON.parse(datosGuardados);
      cargarCarrito();
    }
  }

  function cargarCarrito() {
    carritoList.innerHTML = '';
    total = 0;

    carritoItems.forEach(function(bachaItem) {
      const bachaElement = document.createElement('li');
      bachaElement.textContent = `Bacha ${bachaItem.tipo} x${bachaItem.cantidad}`;
      carritoList.appendChild(bachaElement);

      total += bachaItem.precio * bachaItem.cantidad;
    });

    totalAmount.textContent = `$${total.toLocaleString('es-AR')}`;
    countProductos.textContent = obtenerTotalProductos();
  }

  function obtenerTotalProductos() {
    let totalProductos = 0;

    carritoItems.forEach(function(bachaItem) {
      totalProductos += bachaItem.cantidad;
    });

    return totalProductos;
  }

  cartIcon.addEventListener('click', function() {
    carrito.classList.toggle('show');
  });

  const bachasContainer = document.getElementById('bachas-container');

  fetch('bachas.json')
    .then(response => response.json())
    .then(data => {
      const bachas = data;

      bachas.forEach(function(bacha) {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = `img/${bacha.imagen}`;

        const tipo = document.createElement('p');
        tipo.textContent = bacha.tipo;

        const precio = document.createElement('p');
        precio.classList.add('precio');
        precio.textContent = `Precio: $${bacha.precio.toLocaleString('es-AR')}`;

        const agregarBtn = document.createElement('button');
        agregarBtn.textContent = 'Agregar';
        agregarBtn.classList.add('agregar-btn');

        card.appendChild(image);
        card.appendChild(tipo);
        card.appendChild(precio);
        card.appendChild(agregarBtn);

        agregarBtn.addEventListener('click', function() {
          const bachaTipo = tipo.textContent;
          const bachaPrecio = parseInt(precio.textContent.replace('Precio: $', '').replace(',', ''));

          const bachaItem = carritoItems.find(item => item.tipo === bachaTipo);
          if (bachaItem) {
            bachaItem.cantidad++;
          } else {
            carritoItems.push({ tipo: bachaTipo, precio: bachaPrecio, cantidad: 1 });
          }

          cargarCarrito();
          guardarDatosEnLocalStorage();
        });

        bachasContainer.appendChild(card);
      });

      cargarDatosDesdeLocalStorage();
    });

  finalizarCompraBtn.addEventListener('click', function() {
    Swal.fire('¡Gracias por tu compra!', '', 'success');
    carritoItems = [];
    cargarCarrito();
    guardarDatosEnLocalStorage();
  });

  function guardarDatosEnLocalStorage() {
    localStorage.setItem('carritoItems', JSON.stringify(carritoItems));
  }
});

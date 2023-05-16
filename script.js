function cargarDatosDesdeLocalStorage() {
  const datosGuardados = localStorage.getItem('carritoItems');
  if (datosGuardados) {
    carritoItems = JSON.parse(datosGuardados);
    cargarCarrito();
  }
}

function cargarCarrito() {

  localStorage.setItem('carritoItems', JSON.stringify(carritoItems));
}



document.addEventListener('DOMContentLoaded', function() {
  const bachasList = document.getElementById('bachas-list');
  const agregarBtns = document.getElementsByClassName('agregar-btn');
  const carritoList = document.getElementById('carrito-list');
  const totalAmount = document.getElementById('total-amount');
  let total = 0;


  fetch('bachas.json')
    .then(response => response.json())
    .then(data => {
      const bachas = data;


      for (let i = 0; i < agregarBtns.length; i++) {
        agregarBtns[i].addEventListener('click', function() {
          const bachaTipo = this.parentNode.querySelector('.bacha-tipo').textContent;
          const bachaPrecio = parseInt(this.parentNode.querySelector('.bacha-precio').textContent.replace('$', '').replace(',', ''));
          const cantidadBachas = 1;

          const precioTotal = calcularPrecioTotal(bachaPrecio, cantidadBachas);
          total += precioTotal;


          const bachaItem = document.createElement('li');
          bachaItem.textContent = `${cantidadBachas} bachas ${bachaTipo}`;
          carritoList.appendChild(bachaItem);


          totalAmount.textContent = `$${total.toLocaleString('es-AR')}`;
        });
      }

      const bachasContainer = document.getElementById('bachas-container');
      const carrito = document.getElementById('carrito');
      let carritoItems = [];

  
      bachas.forEach(function(bacha) {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = `img/${bacha.imagen}`;

        const tipo = document.createElement('p');
        tipo.textContent = bacha.tipo;

        const precio = document.createElement('p');
        precio.textContent = `Precio: $${bacha.precio.toLocaleString('es-AR')}`;

        card.appendChild(image);
        card.appendChild(tipo);
        card.appendChild(precio);
        card.addEventListener("click", () => {

          // Agregar bacha al carrito
          const item = document.createElement("p");
          item.textContent = `Bacha ${bacha.tipo}`;
          const carritoList = document.getElementById("carrito-list");
          carritoList.appendChild(item);
          carritoItems.push(bacha);
          cargarCarrito();
        });

        bachasContainer.appendChild(card);
      });

      function cargarCarrito() {
        carritoList.innerHTML = '';
        let total = 0;

        carritoItems.forEach(function(bachaItem) {
          const bachaElement = document.createElement('li');
          bachaElement.textContent = `Bacha ${bachaItem.tipo}`;
          carritoList.appendChild(bachaElement);

          total += bachaItem.precio;
        });

        totalAmount.textContent = `$${total.toLocaleString('es-AR')}`;
      }

      const btnVerCarrito = document.getElementById('btn-ver-carrito');
      btnVerCarrito.addEventListener('click', function() {
        carrito.classList.toggle('show');
      });
    });

  function calcularPrecioTotal(precio, cantidad) {
    return precio * cantidad;
  }


  cargarDatosDesdeLocalStorage();

});

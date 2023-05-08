function calcularPrecioTotal(bacha, cantidad) {
  const precioTotal = bacha.precio * cantidad;
  return precioTotal;
}

const bachas = [
  { tipo: "simple", precio: 20000 },
  { tipo: "doble", precio: 40000 },
  { tipo: "cuadrada", precio: 60000 },
  { tipo: "circular", precio: 15000 }
];

let seguirComprando = true;
let total = 0;

while (seguirComprando) {
  const tipoBacha = prompt(`Elija el tipo de bacha que desea comprar: ${bachas.map(bacha => bacha.tipo).join(', ')}`);
  const cantidadBachas = parseInt(prompt('Ingrese la cantidad de bachas que desea comprar: '));
  const bachaElegida = bachas.find(bacha => bacha.tipo === tipoBacha);

  if (bachaElegida) {
    const precioTotal = calcularPrecioTotal(bachaElegida, cantidadBachas);
    total += precioTotal;
    alert(`Usted ha comprado ${cantidadBachas} bachas ${tipoBacha}, con un precio total de $${precioTotal.toLocaleString('es-AR')}. El total a pagar hasta ahora es de $${total.toLocaleString('es-AR')}.`);

  } else {
    alert('La bacha elegida no existe. Por favor, elija otra.');
  }

  const seguirComprandoStr = prompt('¿Desea seguir comprando bachas? (s/n)');
  seguirComprando = seguirComprandoStr.toLowerCase() === 's';
}

alert(`El total a pagar es de$ $${total.toLocaleString('es-AR')}. Gracias por su compra!`);

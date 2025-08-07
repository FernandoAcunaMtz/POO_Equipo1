// Cambia el color del navbar cuando se hace scroll
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Definimos una clase llamada AnimacionFlotante
class AnimacionFlotante {
  // El constructor recibe el ID del elemento HTML que queremos animar
  constructor(elementId) {
    // Guardamos el elemento en una propiedad para usarlo después
    this.element = document.getElementById(elementId);

    // Empezamos en la posición vertical 0 (sin desplazamiento)
    this.posicion = 0;

    // La dirección indica si va hacia arriba (1) o hacia abajo (-1)
    this.direccion = -1;

    // Llamamos al método que hace la animación
    this.iniciar();
  }

  // Método que se encarga de hacer que la imagen se mueva
  iniciar() {
    // Usamos setInterval para repetir esta función cada 30 milisegundos
    setInterval(() => {
      // Cambiamos la posición sumando o restando 1, según la dirección
      this.posicion += this.direccion;

      // Si la posición supera los 15 píxeles o baja de -15, cambiamos de dirección
      if (this.posicion > 5 || this.posicion < -5) {
        this.direccion *= -1; // Invierte la dirección
      }

      // Usamos CSS transform para mover la imagen hacia arriba o abajo
      this.element.style.transform = `translateY(${this.posicion}px)`;
    }, 60); // Esto se repite cada 70 milisegundos
  }
}

// Creamos una instancia de la clase para iniciar la animación en la imagen con ID "imagenFlotante"
new AnimacionFlotante("imagenFlotante");


//Carritodocument.addEventListener('DOMContentLoaded', () => {
  const carrito = [];
  const contador = document.getElementById('contador');
  const carritoLista = document.getElementById('carrito-lista');
  const carritoItems = document.getElementById('carrito-items');
  const btnCarrito = document.getElementById('btn-carrito');
  const btnPago = document.getElementById('btn-pago'); // botón para pago

  btnCarrito.addEventListener('click', () => {
    carritoLista.classList.toggle('show');
  });

  window.agregarAlCarrito = function(curso) {
    if (!carrito.includes(curso)) {
      carrito.push(curso);
      actualizarCarrito();
      alert(`"${curso}" se agregó al carrito.`);
    } else {
      alert(`El curso "${curso}" ya está en el carrito.`);
    }
  };

  function actualizarCarrito() {
    carritoItems.innerHTML = '';
    carrito.forEach(curso => {
      const li = document.createElement('li');
      li.textContent = curso;
      carritoItems.appendChild(li);
    });

    contador.textContent = carrito.length;

    // Mostrar u ocultar el botón de pago
    if (btnPago) {
      btnPago.style.display = carrito.length > 0 ? 'block' : 'none';
    }
  
};

// Llama a las funciones una vez que se carga el html
document.addEventListener("DOMContentLoaded", function () {
	cargarProductos();
	cargarCarrito();
});

// Cargar productos desde JSON
function cargarProductos(){
	fetch('musicStore.json') // Cargamos el archivo JSON
		.then(response => response.json())
		.then(productos => {
			var listaProductos = document.getElementById('lista-productos');
			listaProductos.innerHTML = ""; // Limpiar productos previos si los hay	

			// Crear los productos dinámicamente
			productos.forEach(function(producto){

				// Creamos tarjeta de producto
				var divBox = document.createElement('div');
				divBox.classList.add("producto-box");

				// Creamos img tag para la tarjeta de producto
				var imgBox = document.createElement('img');
				imgBox.src = producto.imagen;
				imgBox.alt = producto.nombre
				imgBox.classList.add("img-box");

				// Creamos titulo para el producto
				var titleBox = document.createElement('h3');
				titleBox.textContent = producto.nombre;
				titleBox.classList.add("title-box");

				// Creamos texto para el producto
				var textBox = document.createElement("p");
				textBox.textContent = producto.precio;
				textBox.classList.add("text-box");
				
				// Crear boton de "Agregar al carrito"
				var botonAgregar = document.createElement("button");
				botonAgregar.textContent = "Agregar al carrito";
				botonAgregar.classList.add("agregar-carrito");
				botonAgregar.setAttribute("data-id", producto.id);
				botonAgregar.setAttribute("data-nombre", producto.nombre);
				botonAgregar.setAttribute("data-precio", producto.precio);
				botonAgregar.setAttribute("data-imagen", producto.imagen);

				botonAgregar.addEventListener("click", agregarProducto);

				divBox.appendChild(imgBox);
				divBox.appendChild(titleBox);
				divBox.appendChild(textBox);
				divBox.appendChild(botonAgregar);

				listaProductos.appendChild(divBox);			

			})
		})
}


// Función para agregar un producto al carrito
function agregarProducto(event){

	var producto = {

		id: event.target.getAttribute("data-id"),
		nombre: event.target.getAttribute("data-nombre"),
		precio: event.target.getAttribute("data-precio"),
		imagen: event.target.getAttribute("data-imagen")
	}

	var carrito = JSON.parse(localStorage.getItem("carrito")) || [];	
	carrito.push(producto);
	localStorage.setItem("carrito", JSON.stringify(carrito));
	cargarCarrito();
}


// Función para cargar el carrito
// Función para cargar y mostrar los productos del carrito
function cargarCarrito() {
    var listaCarrito = document.getElementById('lista-carrito');

    listaCarrito.innerHTML = ""; // Limpiar contenido previo

    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    var total = 0;

    carrito.forEach(function (producto) {
        var li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
		li.classList.add("li-carrito");

		var botonEliminar = document.createElement("button");
		botonEliminar.textContent = "Eliminar del carrito";
		botonEliminar.classList.add("eliminar-carrito");
		botonEliminar.setAttribute("data-id", producto.id);

		botonEliminar.addEventListener("click", eliminarProducto);

		li.appendChild(botonEliminar);

        listaCarrito.appendChild(li);

        total += parseFloat(producto.precio); // Sumar precio
    });

    // Mostrar el total en el carrito
    var totalCarrito = document.getElementById('total-carrito');
	totalCarrito.textContent = `Total: $${total}`;
    
}

// Eliminar producto del carrito
function eliminarProducto(event) {
	var idProducto = event.target.getAttribute("data-id");
	var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
	carrito = carrito.filter(function(producto){
		return producto.id !== idProducto;
	});
	localStorage.setItem("carrito", JSON.stringify(carrito));
	cargarCarrito();
}

// Vaciar el carrito
document.addEventListener("click", function (event) {
    if (event.target.id === 'vaciar-carrito') {
        localStorage.removeItem("carrito");
        cargarCarrito(); // Actualiza la vista del carrito
    }
});


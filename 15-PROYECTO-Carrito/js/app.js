// Selección de Elementos del DOM
const carrito = document.querySelector('#carrito');
const contenerdorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articuloCarrito = [];

// Cargar Event Listeners
cargarEventListeners();
function cargarEventListeners(){
    // Agregar curso cuando se presiona "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articuloCarrito = []; // Resetea el arreglo
        limpiarHTML(); // Elimina todo el HTML del carrito
    });
}

// Función para agregar un curso al carrito
function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Lee el contenido del curso seleccionado y extrae su información
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
        total: 0
    }

    // Verificar si el curso ya existe en el carrito
    const existe = articuloCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizamos la cantidad
        articuloCarrito = articuloCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son duplicados
            }
        });
    } else {
        // Agrega el curso al carrito
        articuloCarrito = [...articuloCarrito, infoCurso];
    }

    // Actualiza el carrito en el HTML
    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML(){
    // Limpiar el HTML
    limpiarHTML();

    // Recorrer el carrito y generar el HTML
    articuloCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad , id} = curso
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenerdorCarrito.appendChild(row);
    });

    // Agregar evento para eliminar curso
    document.querySelectorAll('.borrar-curso').forEach(btn => {
        btn.addEventListener('click', eliminarCurso);
    });
}

// Elimina los cursos del tbody
function limpiarHTML(){
    // Forma lenta
    // contenerdorCarrito.innerHTML = '';

    // Forma rápida
    while (contenerdorCarrito.firstChild) {
        contenerdorCarrito.removeChild(contenerdorCarrito.firstChild);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    const cursoId = e.target.getAttribute('data-id');

    // Elimina del arreglo de articulosCarrito por el data-id
    articuloCarrito = articuloCarrito.filter(curso => curso.id !== cursoId);

    // Volvemos a renderizar el carrito
    carritoHTML();
}

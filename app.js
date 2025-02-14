// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Agregar un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);


    // Vaciar Carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reseteamos el array

        limpiarHTML(); // Eliminamos todo el HTML
    })
}


// Funciones
function agregarCurso(event) {
    event.preventDefault();


    if( event.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = event.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
    
};

// Elimina un curso del carrito
function eliminarCurso(event) {
    if(event.target.classList.contains('borrar-curso')){
        const cursoId = event.target.getAttribute('data-id');
        
        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Funcion que lee el HTML al que le di click y extrae la info del curso
function leerDatosCurso(curso) {
    //console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id == infoCurso.id );
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso =>  {
            if(curso.id == infoCurso.id) {
                curso.cantidad++;
                return curso; // Devuelve el objeto actualizado
            } else 
            return curso; // Devuelve los objetos que no son duplicados
        } );
        articulosCarrito = [...cursos];
    } else{
        // Agrega elementos al array del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

   
    
    console.log(articulosCarrito);

    carritoHTML();
}


// Muestra el carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src ="${imagen}" width="100" >
        </td>
        <td> ${titulo} </td>      
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td>
            <a href = "#" class = "borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })


}

// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    //contenedorCarrito.innerHTML = '';


    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
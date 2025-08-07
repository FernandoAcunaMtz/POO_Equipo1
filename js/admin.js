document.addEventListener("DOMContentLoaded", () => {
    cargarCursos();
    cargarAlumnos();
    cargarProfesores();
});

function cargarCursos() {
    fetch('http://localhost:3000/api/cursos')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("tabla-cursos");
            data.forEach(curso => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
          <td>${curso.id}</td>
          <td>${curso.nombre}</td>
          <td>${curso.descripcion}</td>
        `;
                tbody.appendChild(tr);
            });
        });
}

function cargarAlumnos() {
    fetch('http://localhost:3000/api/alumnos')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("tabla-alumnos");
            data.forEach(alumno => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
          <td>${alumno.nombre}</td>
          <td>${alumno.email}</td>
          <td>${alumno.grupo}</td>
        `;
                tbody.appendChild(tr);
            });
        });
}

function cargarProfesores() {
    fetch('http://localhost:3000/api/profesores')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("tabla-profesores");
            data.forEach(profe => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
          <td>${profe.nombre}</td>
          <td>${profe.email}</td>
        `;
                tbody.appendChild(tr);
            });
        });
}
// Función para cargar cursos desde la API
function cargarCursos() {
    fetch('http://localhost:3000/api/cursos')
        .then(res => {
            if (!res.ok) {
                throw new Error('Error al cargar cursos');
            }
            return res.json();
        })
        .then(data => {
            const tbody = document.querySelector("#tabla-cursos tbody");
            tbody.innerHTML = ''; // Limpiar tabla antes de agregar datos
            
            data.forEach((curso, index) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${curso.nombre}</td>
                    <td>${curso.descripcion}</td>
                `;
                tbody.appendChild(tr);
            });
        })
}

// Función para cargar alumnos desde la API
function cargarAlumnos() {
    fetch('http://localhost:3000/api/alumnos')
        .then(res => {
            if (!res.ok) {
                throw new Error('Error al cargar alumnos');
            }
            return res.json();
        })
        .then(data => {
            const tbody = document.querySelector("#tabla-alumnos tbody");
            tbody.innerHTML = ''; // Limpiar tabla antes de agregar datos
            
            data.forEach(alumno => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${alumno.nombre}</td>
                    <td>${alumno.email}</td>
                    <td>${alumno.cursos.join('<br>')}</td>
                `;
                tbody.appendChild(tr);
            });
        })
}

// Función para cargar profesores desde la API
function cargarProfesores() {
    fetch('http://localhost:3000/api/profesores')
        .then(res => {
            if (!res.ok) {
                throw new Error('Error al cargar profesores');
            }
            return res.json();
        })
        .then(data => {
            const tbody = document.querySelector("#tabla-profesores tbody");
            tbody.innerHTML = ''; // Limpiar tabla antes de agregar datos
            
            data.forEach(profesor => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${profesor.nombre}</td>
                    <td>${profesor.email}</td>
                    <td>${profesor.cursos.join('<br>')}</td>
                `;
                tbody.appendChild(tr);
            });
        })
}

// Función para mostrar errores
function mostrarError(mensaje) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show';
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('.container');
    container.prepend(alertDiv);
}

// Verificar autenticación al cargar
document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    
    if (!usuario || usuario.rol !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    // Cargar datos si es admin
    cargarCursos();
    cargarAlumnos();
    cargarProfesores();
});
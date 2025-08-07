// Datos de usuarios válidos
const usuarios = [
    { correo: "admin@gmail.com", contrasena: "1234", rol: "admin" },
    { correo: "estudiante@gmail.com", contrasena: "Temporal#123", rol: "estudiante" },
    { correo: "profesor@gmail.com", contrasena: "Profe0sito", rol: "profesor" }
];

// Guardar sesión en localStorage
function guardarSesion(usuario) {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
}

// Obtener sesión actual
function obtenerSesion() {
    const usuario = localStorage.getItem('usuarioLogueado');
    return usuario ? JSON.parse(usuario) : null;
}

// Cerrar sesión (actualizada)
function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    // Redirigir a login después de cerrar sesión
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 100);
}

// Redirigir según rol
function redirigirSegunRol() {
    const usuario = obtenerSesion();
    if (!usuario) return;

    const paginaActual = window.location.pathname.split('/').pop();

    // Si ya está en la página correcta, no redirigir
    if ((usuario.rol === 'admin' && paginaActual === 'admin.html') ||
        (usuario.rol === 'estudiante' && paginaActual === 'perfil.html') ||
        (usuario.rol === 'profesor' && paginaActual === 'profesor.html')) {
        return;
    }

    switch (usuario.rol) {
        case 'admin':
            window.location.href = 'admin.html';
            break;
        case 'estudiante':
            window.location.href = 'perfil.html';
            break;
        case 'profesor':
            window.location.href = 'profesor.html';
            break;
    }
}

// Verificar sesión al cargar página (actualizada)
function verificarSesion() {
    const usuario = obtenerSesion();
    const paginaActual = window.location.pathname.split('/').pop();

    // Páginas que requieren autenticación
    const paginasProtegidas = ['admin.html', 'profesor.html', 'perfil.html'];

    if (!usuario && paginasProtegidas.includes(paginaActual)) {
        window.location.href = 'login.html';
        return;
    }

    // Redirigir si está en login pero ya tiene sesión
    if (usuario && paginaActual === 'login.html') {
        redirigirSegunRol();
    }

    // Forzar actualización del navbar en todas las páginas
    actualizarNavbar();
}

// Configurar navbar según estado de sesión (versión mejorada)
function actualizarNavbar() {
    const usuario = obtenerSesion();
    const adminNavItem = document.querySelector('.nav-item-admin');
    const perfilNavItem = document.querySelector('.nav-item-perfil');
    const profesorNavItem = document.querySelector('.nav-item-profesor'); // Nuevo
    const btnCerrarSesion = document.querySelector('.btn-cerrar-sesion');
    const btnIniciarSesion = document.querySelector('.btn-iniciar-sesion');

    if (usuario) {
        // Ocultar todos los elementos primero
        if (adminNavItem) adminNavItem.style.display = 'none';
        if (perfilNavItem) perfilNavItem.style.display = 'none';
        if (profesorNavItem) profesorNavItem.style.display = 'none';

        // Mostrar según rol
        switch(usuario.rol) {
            case 'admin':
                if (adminNavItem) adminNavItem.style.display = 'block';
                break;
            case 'estudiante':
                if (perfilNavItem) perfilNavItem.style.display = 'block';
                break;
            case 'profesor':
                if (profesorNavItem) profesorNavItem.style.display = 'block';
                break;
        }
        
        // Configurar botones de sesión
        if (btnCerrarSesion) {
            btnCerrarSesion.style.display = 'block';
            btnCerrarSesion.onclick = cerrarSesion;
        }
        if (btnIniciarSesion) btnIniciarSesion.style.display = 'none';
    } else {
        // Usuario no logueado - ocultar todo
        if (adminNavItem) adminNavItem.style.display = 'none';
        if (perfilNavItem) perfilNavItem.style.display = 'none';
        if (profesorNavItem) profesorNavItem.style.display = 'none';
        if (btnCerrarSesion) btnCerrarSesion.style.display = 'none';
        if (btnIniciarSesion) {
            btnIniciarSesion.style.display = 'block';
            btnIniciarSesion.onclick = () => window.location.href = 'login.html';
        }
    }
}

// Modificar la función de redirección
function redirigirSegunRol() {
    const usuario = obtenerSesion();
    if (!usuario) return;

    const paginaActual = window.location.pathname.split('/').pop();
    
    // Páginas permitidas para cada rol
    const paginasPermitidas = {
        'admin': ['admin.html'],
        'estudiante': ['perfil.html'],
        'profesor': ['profesor.html']
    };

    // Si ya está en una página permitida, no redirigir
    if (paginasPermitidas[usuario.rol].includes(paginaActual)) {
        return;
    }

    // Redirigir según rol
    switch(usuario.rol) {
        case 'admin':
            window.location.href = 'admin.html';
            break;
        case 'estudiante':
            window.location.href = 'perfil.html';
            break;
        case 'profesor':
            window.location.href = 'profesor.html';
            break;
    }
}

// Configurar formulario de login
function configurarLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const correo = document.getElementById('usuario').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();
        const alerta = document.getElementById('alerta');

        const usuarioValido = usuarios.find(u =>
            u.correo === correo && u.contrasena === contrasena
        );

        if (usuarioValido) {
            guardarSesion(usuarioValido);
            redirigirSegunRol();
        } else {
            alerta.textContent = "Credenciales incorrectas";
            alerta.classList.remove('d-none');
        }
    });
}

// Inicialización (actualizada)
function inicializar() {
    verificarSesion();
    configurarLoginForm();

    // Asegurar que el navbar se actualice incluso si el DOM ya está cargado
    setTimeout(actualizarNavbar, 100);
}

// Ejecutar inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    inicializar();
}
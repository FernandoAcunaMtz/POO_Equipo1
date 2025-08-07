// Datos del estudiante (simulados - en un caso real estos vendrían de una API)
const studentData = {
    id: "STU-2024-001",
    name: "Estudiante",
    email: "estudiante@gmail.com",
    bio: "Estudiante de desarrollo de software apasionado por la tecnología y el aprendizaje continuo. Actualmente enfocado en mejorar mis habilidades en UI/UX y desarrollo frontend.",
    joinDate: "15/01/2024",
    overallProgress: 78,
    skills: ["HTML", "CSS", "JavaScript", "UI/UX", "Python"],
    courses: [
        {
            id: "CRS-001",
            title: "Desarrollo UI/UX",
            description: "Aprende los fundamentos del diseño de experiencia de usuario e interfaces.",
            image: "./img/uiuxgrained.jpeg",
            progress: 65,
            currentLesson: 5,
            totalLessons: 8,
            status: "progress",
            startDate: "10/04/2024",
            lastAccess: "28/05/2024"
        },
        {
            id: "CRS-002",
            title: "Minijuegos con Python",
            description: "Crea juegos simples como Pong, adivinanzas o laberintos usando Python paso a paso.",
            image: "./img/juegosgrained.jpg",
            progress: 42,
            currentLesson: 3,
            totalLessons: 7,
            status: "progress",
            startDate: "05/05/2024",
            lastAccess: "28/05/2024"
        },
        {
            id: "CRS-003",
            title: "Piensa como programador",
            description: "Curso de lógica para entender cómo se resuelven problemas con código.",
            image: "./img/piensa_bueno.jpg",
            progress: 100,
            currentLesson: 10,
            totalLessons: 10,
            status: "completed",
            startDate: "20/02/2024",
            completeDate: "15/05/2024"
        },
        {
            id: "CRS-004",
            title: "Fundamentos de Bases de Datos con SQL",
            description: "Conecta, consulta y administra bases de datos con SQL desde cero usando MySQL.",
            image: "./img/sqqq.jpg",
            progress: 100,
            currentLesson: 8,
            totalLessons: 8,
            status: "completed",
            startDate: "01/03/2024",
            completeDate: "22/03/2024"
        }
    ],
    certificates: [
        {
            id: "CTW-2024-05842",
            courseId: "CRS-003",
            courseTitle: "Piensa como programador",
            issueDate: "15/05/2024",
            expiryDate: "15/05/2026",
            downloadUrl: "#"
        },
        {
            id: "CTW-2024-04176",
            courseId: "CRS-004",
            courseTitle: "Fundamentos de Bases de Datos con SQL",
            issueDate: "22/03/2024",
            expiryDate: "22/03/2026",
            downloadUrl: "#"
        },
        {
            id: "CTW-2024-02931",
            courseId: "CRS-005",
            courseTitle: "Inteligencia artificial para todos",
            issueDate: "10/02/2024",
            expiryDate: "10/02/2026",
            downloadUrl: "#"
        }
    ],
    achievements: [
        {
            id: "ACH-001",
            title: "Primer curso completado",
            description: "Completaste tu primer curso en nuestra plataforma",
            icon: "bi-star-fill",
            date: "10/02/2024"
        },
        {
            id: "ACH-002",
            title: "Estudiante rápido",
            description: "Completaste un curso en menos de 3 semanas",
            icon: "bi-lightning-charge-fill",
            date: "22/03/2024"
        },
        {
            id: "ACH-003",
            title: "5 lecciones en un día",
            description: "Completaste 5 lecciones en un solo día",
            icon: "bi-book-half",
            date: "05/05/2024"
        }
    ]
};

// Función para cargar los datos del perfil
function loadProfileData() {
    // Información básica del usuario
    document.querySelector('.profile-username').textContent = studentData.name;
    document.querySelector('.profile-email').textContent = studentData.email;
    document.querySelector('.profile-avatar').src = studentData.avatar;
    document.querySelector('.profile-bio').textContent = studentData.bio;

    // Estadísticas
    document.querySelector('.stat-number:nth-child(1)').textContent = studentData.courses.length;
    document.querySelector('.stat-number:nth-child(2)').textContent = studentData.certificates.length;
    document.querySelector('.stat-number:nth-child(3)').textContent = `${studentData.overallProgress}%`;

    // Barra de progreso general
    document.querySelector('.progress-bar').style.width = `${studentData.overallProgress}%`;
    document.querySelector('.progress-bar').setAttribute('aria-valuenow', studentData.overallProgress);
    document.querySelector('.progress-percent').textContent = `${studentData.overallProgress}% completado`;

    // Habilidades
    const skillsContainer = document.querySelector('.skill-tags');
    skillsContainer.innerHTML = '';
    studentData.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });

    // Cursos
    loadCourses();

    // Certificados
    loadCertificates();

    // Logros
    loadAchievements();
}

// Función para cargar los cursos
function loadCourses() {
    const coursesContainer = document.querySelector('.row.course-card').parentNode;
    coursesContainer.innerHTML = '';

    studentData.courses.forEach(course => {
        const courseCol = document.createElement('div');
        courseCol.className = 'col-md-6 mb-4 course-card';
        courseCol.setAttribute('data-status', course.status);

        const statusBadgeClass = course.status === 'completed' ? 'bg-success' : 'bg-warning';
        const statusText = course.status === 'completed' ? 'Completado' : 'En progreso';
        const completeDateText = course.status === 'completed' ?
            `Completado el ${course.completeDate}` :
            `Lección ${course.currentLesson}/${course.totalLessons}`;

        courseCol.innerHTML = `
            <div class="card h-100 glass-effect-inner">
                <div class="card-body">
                    <div class="course-header">
                        <h5 class="course-title">${course.title}</h5>
                        <span class="course-status badge ${statusBadgeClass}">${statusText}</span>
                    </div>
                    <p class="course-description">${course.description}</p>
                    
                    <div class="course-progress mt-3">
                        <div class="progress-info">
                            <span>Progreso: ${course.progress}%</span>
                            <span>${completeDateText}</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar ${course.status === 'completed' ? 'bg-success' : ''}" 
                                 role="progressbar" 
                                 style="width: ${course.progress}%" 
                                 aria-valuenow="${course.progress}" 
                                 aria-valuemin="0" 
                                 aria-valuemax="100"></div>
                        </div>
                    </div>
                    
                    <div class="course-actions mt-3">
                        ${course.status === 'completed' ?
                `<button class="btn btn-certificate" data-course-id="${course.id}">Ver certificado</button>
                             <button class="btn btn-outline-light btn-review" data-course-id="${course.id}">Revisar</button>` :
                `<button class="btn btn-continue" data-course-id="${course.id}">Continuar</button>
                             <button class="btn btn-outline-light btn-details" data-course-id="${course.id}">Detalles</button>`}
                    </div>
                </div>
            </div>
        `;

        coursesContainer.appendChild(courseCol);
    });
}

// Función para cargar los certificados
function loadCertificates() {
    const certificatesContainer = document.querySelector('.row.certificate-card').parentNode;
    certificatesContainer.innerHTML = '';

    studentData.certificates.forEach(cert => {
        const certCol = document.createElement('div');
        certCol.className = 'col-md-6 col-lg-4 mb-4';

        certCol.innerHTML = `
            <div class="certificate-card glass-effect-inner h-100">
                <div class="certificate-header">
                    <i class="bi bi-award-fill certificate-icon"></i>
                    <h5 class="certificate-title">${cert.courseTitle}</h5>
                </div>
                <div class="certificate-body">
                    <p class="certificate-date">Emitido: ${cert.issueDate}</p>
                    <p class="certificate-id">ID: ${cert.id}</p>
                    <div class="certificate-actions">
                        <button class="btn btn-view" data-certificate-id="${cert.id}">Ver certificado</button>
                        <button class="btn btn-download" data-certificate-id="${cert.id}">Descargar</button>
                    </div>
                </div>
            </div>
        `;

        certificatesContainer.appendChild(certCol);
    });
}

// Función para cargar los logros
function loadAchievements() {
    const achievementsContainer = document.querySelector('.achievements-container');
    achievementsContainer.innerHTML = '';

    studentData.achievements.forEach(ach => {
        const achItem = document.createElement('div');
        achItem.className = 'achievement-item';

        achItem.innerHTML = `
            <div class="achievement-icon">
                <i class="bi ${ach.icon}"></i>
            </div>
            <div class="achievement-info">
                <h5 class="achievement-title">${ach.title}</h5>
                <p class="achievement-date">Obtenido: ${ach.date}</p>
            </div>
        `;

        achievementsContainer.appendChild(achItem);
    });
}

// Función para filtrar cursos
function setupCourseFilters() {
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function () {
            // Remover clase active de todos los botones
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Agregar clase active al botón clickeado
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            const courseCards = document.querySelectorAll('.course-card');

            courseCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-status') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Función para manejar los botones de acción
function setupActionButtons() {
    // Botones de curso
    document.addEventListener('click', function (e) {
        // Continuar curso
        if (e.target.classList.contains('btn-continue')) {
            const courseId = e.target.getAttribute('data-course-id');
            const course = studentData.courses.find(c => c.id === courseId);
            alert(`Continuando con el curso: ${course.title}\nLección actual: ${course.currentLesson}/${course.totalLessons}`);
        }

        // Ver detalles del curso
        if (e.target.classList.contains('btn-details')) {
            const courseId = e.target.getAttribute('data-course-id');
            const course = studentData.courses.find(c => c.id === courseId);
            alert(`Detalles del curso: ${course.title}\nProgreso: ${course.progress}%\nÚltimo acceso: ${course.lastAccess}`);
        }

        // Ver certificado
        if (e.target.classList.contains('btn-certificate') || e.target.classList.contains('btn-view')) {
            const id = e.target.getAttribute('data-course-id') || e.target.getAttribute('data-certificate-id');
            const cert = studentData.certificates.find(c => c.courseId === id || c.id === id);
            if (cert) {
                alert(`Mostrando certificado: ${cert.courseTitle}\nID: ${cert.id}\nEmitido: ${cert.issueDate}`);
            } else {
                alert('Certificado no encontrado');
            }
        }

        // Descargar certificado
        if (e.target.classList.contains('btn-download')) {
            const certId = e.target.getAttribute('data-certificate-id');
            const cert = studentData.certificates.find(c => c.id === certId);
            if (cert) {
                alert(`Iniciando descarga del certificado: ${cert.courseTitle}`);
                // En una implementación real, aquí iría la lógica para descargar el archivo
            }
        }

        // Revisar curso completado
        if (e.target.classList.contains('btn-review')) {
            const courseId = e.target.getAttribute('data-course-id');
            const course = studentData.courses.find(c => c.id === courseId);
            alert(`Revisando curso completado: ${course.title}\nFecha de finalización: ${course.completeDate}`);
        }
    });
}

// Función para inicializar el carrito (similar a cursos.html)
function initializeCart() {
    let carrito = [];
    let total = 0;

    function actualizarCarrito() {
        const carritoItems = document.getElementById('carrito-items');
        const contador = document.getElementById('contador');
        const btnPago = document.getElementById('btn-pago');
        carritoItems.innerHTML = '';
        total = 0;

        carrito.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - $${item.precio}.00 MXN`;
            carritoItems.appendChild(li);
            total += item.precio;
        });

        if (carrito.length > 0) {
            const totalLi = document.createElement('li');
            totalLi.className = 'fw-bold mt-2';
            totalLi.textContent = `Total: $${total}.00 MXN`;
            carritoItems.appendChild(totalLi);
            btnPago.style.display = 'block';
        } else {
            btnPago.style.display = 'none';
        }

        contador.textContent = carrito.length;
    }

    document.getElementById('btn-carrito').addEventListener('click', function () {
        document.getElementById('carrito-lista').classList.toggle('show');
    });

    document.addEventListener('click', function (event) {
        const carritoLista = document.getElementById('carrito-lista');
        const btnCarrito = document.getElementById('btn-carrito');
        if (!carritoLista.contains(event.target) && !btnCarrito.contains(event.target)) {
            carritoLista.classList.remove('show');
        }
    });

    document.getElementById('btn-pago').addEventListener('click', function () {
        localStorage.setItem('totalPagar', total);
        window.location.href = 'metodopago.html';
    });
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    loadProfileData();
    setupCourseFilters();
    setupActionButtons();
    initializeCart();

    // Simular datos de cursos para el carrito (deberían venir de cursos.html)
    const cursos = {
        'Desarrollo UI/UX': 439,
        'Ciberseguridad': 439,
        'Inteligencia artificial para todos': 439,
        'Minijuegos con Python': 439,
        'Fundamentos de Bases de Datos con SQL': 439,
        'Piensa como programador': 439
    };
});
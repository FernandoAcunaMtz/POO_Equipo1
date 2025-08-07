document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/alumnos')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('contenido-tabla');
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.grupo}</td>
                    <td>${row.nombre}</td>
                    <td>${row.email}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error al cargar los alumnos:', error);
        });
});

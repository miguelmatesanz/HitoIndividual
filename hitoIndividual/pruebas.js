// Obtiene una referencia al elemento de la tabla en el HTML
const tabla = document.getElementById('resp');

function traerDatos() {
  // Realiza una solicitud HTTP GET para obtener el archivo JSON
  fetch('pruebas.json')
    .then(response => response.json()) // Parsea la respuesta como JSON
    .then(data => {
      // Borra el contenido actual de la tabla
      tabla.innerHTML = '';

      // Recorre los elementos del JSON y crea las filas de la tabla
      data.provincias.forEach(provincia => {
        const row = tabla.insertRow();
        row.innerHTML = `
          <td>${provincia.P1}</td>
          <td>${provincia.P2}</td>
          <td>${provincia.P3}</td>
          <td>${provincia.P4}</td>
          <td>${provincia.P5}</td>
        `;
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

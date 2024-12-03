document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
  
    const pacienteData = {
      nombre,
      apellido,
      dni,
      direccion,
      telefono,
      email
    };
  
    fetch('http://localhost:3001/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pacienteData)
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById('responseMessage').textContent = data;
      document.getElementById('registroForm').reset();
    })
    .catch(error => {
      document.getElementById('responseMessage').textContent = 'Error al registrar el paciente';
    });
  });
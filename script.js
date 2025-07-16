// Función para revisar y actualizar estados de los ramos
function actualizarEstadoRamos() {
  document.querySelectorAll('.ramo').forEach(ramo => {
    const requisitos = ramo.dataset.prereq ? ramo.dataset.prereq.split(',') : [];
    const aprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

    // Si ya está aprobado, mantenerlo como tal
    if (aprobados.includes(ramo.id)) {
      ramo.classList.add('aprobado');
      ramo.classList.remove('bloqueado');
      return;
    }

    // Si no tiene requisitos, está desbloqueado
    if (requisitos.length === 0) {
      ramo.classList.remove('bloqueado');
    } else {
      // Verificar si todos los requisitos están aprobados
      const cumplidos = requisitos.every(req => aprobados.includes(req.trim()));
      if (cumplidos) {
        ramo.classList.remove('bloqueado');
      } else {
        ramo.classList.add('bloqueado');
      }
    }
  });
}

// Manejar clics para aprobar ramos
document.addEventListener('click', function (e) {
  if (!e.target.classList.contains('ramo')) return;
  if (e.target.classList.contains('bloqueado')) return;

  const id = e.target.id;
  let aprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

  // Si ya estaba aprobado, quitarlo
  if (aprobados.includes(id)) {
    aprobados = aprobados.filter(r => r !== id);
    e.target.classList.remove('aprobado');
  } else {
    aprobados.push(id);
    e.target.classList.add('aprobado');
  }

  localStorage.setItem('ramosAprobados', JSON.stringify(aprobados));
  actualizarEstadoRamos(); // Recalcular qué ramos se desbloquean
});

// Al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  actualizarEstadoRamos();
});

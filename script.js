document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Cargar estado desde localStorage
  ramos.forEach(ramo => {
    const id = ramo.id;
    if (localStorage.getItem(id) === "aprobado") {
      aprobarRamo(ramo);
    }
  });

  actualizarEstados();

  ramos.forEach(ramo => {
    ramo.addEventListener("click", function () {
      if (!ramo.classList.contains("bloqueado")) {
        if (ramo.classList.contains("aprobado")) {
          ramo.classList.remove("aprobado");
          ramo.style.textDecoration = "none";
          localStorage.removeItem(ramo.id);
        } else {
          aprobarRamo(ramo);
          localStorage.setItem(ramo.id, "aprobado");
        }
        actualizarEstados();
      }
    });
  });

  function aprobarRamo(ramo) {
    ramo.classList.add("aprobado");
    ramo.classList.remove("bloqueado");
  }

  function actualizarEstados() {
    ramos.forEach(ramo => {
      const requisitos = ramo.dataset.prereq;
      if (requisitos) {
        const ids = requisitos.split(" ");
        const aprobados = ids.every(id => {
          const prereq = document.getElementById(id);
          return prereq && prereq.classList.contains("aprobado");
        });

        if (aprobados) {
          ramo.classList.remove("bloqueado");
        } else {
          if (!ramo.classList.contains("aprobado")) {
            ramo.classList.add("bloqueado");
          }
        }
      }
    });
  }
});

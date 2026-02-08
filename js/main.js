document.getElementById("citaForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const mensaje = document.getElementById("mensaje").value;

  const telefono = "628302701"; // SIN + ni espacios
  const texto = `
    Hola quiero pedir cita para uñas.

    Nombre: ${nombre}
    Fecha: ${fecha}
    Hora: ${hora}

    Comentario: ${mensaje}
  `;
});


// Configuramos el observador
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Aplicamos el efecto a todas las secciones y tarjetas
document.querySelectorAll('section, .servicio-card, .galeria-fotos img').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});

const fechaInput = document.getElementById('fecha');
if(fechaInput) {
    const hoy = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', hoy); // Bloquea días anteriores a hoy
}

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("citaForm");
    const inputFecha = document.getElementById("fecha");
    const inputHora = document.getElementById("hora");

    // Bloquear días pasados
    const hoy = new Date().toISOString().split("T")[0];
    inputFecha.setAttribute("min", hoy);

    // Convierte "HH:MM" a minutos
    function aMinutos(hora) {
        if (!hora) return NaN;
        const partes = hora.split(":");
        if (partes.length < 2) return NaN;
        const h = parseInt(partes[0], 10);
        const m = parseInt(partes[1], 10);
        if (isNaN(h) || isNaN(m)) return NaN;
        return h * 60 + m;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const fechaInput = inputFecha.value;
        const horaInput = inputHora.value;
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !fechaInput || !horaInput) {
            alert("Por favor, rellena todos los campos obligatorios.");
            return;
        }

        const fechaSeleccionada = new Date(fechaInput + "T00:00");
        const diaSemana = fechaSeleccionada.getDay(); // 0 = domingo, 6 = sábado

        // 🚫 Bloquear fines de semana
        if (diaSemana === 0 || diaSemana === 6) {
            alert("Los fines de semana no abrimos. Selecciona un día de Lunes a Viernes.");
            return;
        }

        // ⏰ Definir horarios
        const apertura = aMinutos("09:00");
        let cierre;
        if (diaSemana === 5) { // viernes
            cierre = aMinutos("18:30");
        } else { // lunes a jueves
            cierre = aMinutos("19:30");
        }

        const minutosSeleccionados = aMinutos(horaInput);

        // 🚫 Validar horario
        if (isNaN(minutosSeleccionados) || minutosSeleccionados < apertura || minutosSeleccionados > cierre) {
            const horaCierreTexto = (diaSemana === 5) ? "18:30" : "19:30";
            alert(`Lo sentimos, el horario para este día es de 09:00 a ${horaCierreTexto}. Selecciona otra hora.`);
            return;
        }

        // ✅ Abrir WhatsApp si todo es correcto
        const telefono = "34628302701";
        const textoMensaje = `¡Hola! Soy ${nombre}. Me gustaría pedir una cita el día ${fechaInput} a las ${horaInput}. ${mensaje ? 'Nota: ' + mensaje : ''}`;

        window.open(
            `https://wa.me/${telefono}?text=${encodeURIComponent(textoMensaje)}`,
            "_blank"
        );
    });

});


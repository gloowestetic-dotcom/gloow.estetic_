document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("citaForm");
    const inputFecha = document.getElementById("fecha");

    // 1. Bloquear días pasados en el calendario
    const hoy = new Date().toISOString().split("T")[0];
    if(inputFecha) inputFecha.setAttribute("min", hoy);

    // 2. Animaciones de aparición suave (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .servicio-card, .galeria-fotos img').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });

    // 3. Manejo del Formulario y WhatsApp
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const fecha = inputFecha.value;
        const hora = document.getElementById("hora").value;
        const mensaje = document.getElementById("mensaje").value.trim();

        const fechaSeleccionada = new Date(fecha + "T00:00");
        const diaSemana = fechaSeleccionada.getDay(); // 0: Dom, 6: Sáb

        // Validación de Fines de Semana
        if (diaSemana === 0 || diaSemana === 6) {
            alert("Los fines de semana no abrimos. Por favor, selecciona de Lunes a Viernes.");
            return;
        }

        // Construcción del mensaje para WhatsApp
        const telefono = "34628302701"; 
        const textoWhatsApp = `¡Hola! ✨ Vengo de la web y quiero pedir una cita:
- *Nombre:* ${nombre}
- *Fecha:* ${fecha}
- *Hora:* ${hora}
- *Nota:* ${mensaje || "Sin comentarios adicionales"}`;

        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(textoWhatsApp)}`;
        window.open(url, "_blank");
    });
});
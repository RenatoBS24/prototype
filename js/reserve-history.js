document.addEventListener("DOMContentLoaded", function () {
    const lista = document.getElementById("lista-historial-completo");
    const citas = JSON.parse(localStorage.getItem("citas")) || [];

    if (citas.length === 0) {
        lista.innerHTML = "<li>No tienes citas registradas.</li>";
        return;
    }

    citas.slice().reverse().forEach(cita => {
        const li = document.createElement("li");
        li.innerHTML = `
            <i class="bi bi-calendar-event"></i>
            <span><strong>${cita.servicio}</strong></span>
            <span>${cita.fecha} ${cita.hora}</span>
            <span class="cita-estado">${cita.estado}</span>
            ${cita.doctor ? `<span class="cita-doctor"><i class="bi bi-person-badge"></i> ${cita.doctor}</span>` : ""}
        `;
        lista.appendChild(li);
    });
});
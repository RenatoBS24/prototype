document.addEventListener("DOMContentLoaded", function () {
    const lista = document.getElementById("lista-citas-eliminar");
    let citas = JSON.parse(localStorage.getItem("citas")) || [];

    function renderCitas() {
        lista.innerHTML = "";
        if (citas.length === 0) {
            lista.innerHTML = "<li>No tienes citas registradas.</li>";
            return;
        }
        citas.slice().reverse().forEach((cita, idx) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <i class="bi bi-calendar-event"></i>
                <span><strong>${cita.servicio}</strong></span>
                <span>${cita.fecha} ${cita.hora}</span>
                <span class="cita-estado">${cita.estado}</span>
                ${cita.doctor ? `<span class="cita-doctor"><i class="bi bi-person-badge"></i> ${cita.doctor}</span>` : ""}
                <button class="btn-eliminar-cita" data-idx="${citas.length - 1 - idx}">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            `;
            lista.appendChild(li);
        });
        document.querySelectorAll('.btn-eliminar-cita').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-idx'));
                citas.splice(index, 1);
                localStorage.setItem("citas", JSON.stringify(citas));
                renderCitas();
            });
        });
    }

    renderCitas();
});
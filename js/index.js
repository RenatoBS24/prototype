document.addEventListener("DOMContentLoaded", function () {
    let citas = JSON.parse(localStorage.getItem("citas")) || [];
    const historial = document.getElementById("historial-citas");
    historial.innerHTML = "";
    citas.slice(-5).reverse().forEach(cita => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="cita-info">
                <i class="bi bi-calendar-event"></i>
                <span class="cita-servicio">${cita.servicio}</span>
                <span>${cita.fecha} ${cita.hora}</span>
                <span class="cita-estado">${cita.estado}</span>
            </div>
            <button class="btn-editar"><i class="bi bi-pencil"></i> Editar</button>
        `;
        historial.appendChild(li);
    });
    const proximaCitaSpan = document.getElementById("proxima-cita");
    const hoy = new Date().toISOString().slice(0, 10);
    const futuras = citas
        .filter(cita => cita.fecha >= hoy && cita.estado === "Confirmada")
        .sort((a, b) => a.fecha.localeCompare(b.fecha));
    if (futuras.length > 0) {
        const cita = futuras[0];
        // Formatear fecha y hora
        const meses = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
        const [year, month, day] = cita.fecha.split("-");
        let [hora, minuto] = cita.hora.split(":");
        let horaNum = parseInt(hora, 10);
        let periodo = horaNum >= 12 ? "pm" : "am";
        if (horaNum > 12) horaNum -= 12;
        if (horaNum === 0) horaNum = 12;
        const horaFormateada = `${horaNum}:${minuto} ${periodo}`;
        proximaCitaSpan.textContent = `${parseInt(day)} de ${meses[parseInt(month)-1]} del ${year} a las ${horaFormateada} - ${cita.servicio}`;
    } else {
        proximaCitaSpan.textContent = "No tienes próximas citas";
    }
    const btnVerCompleto = document.createElement("button");
    btnVerCompleto.className = "btn-ver-completo";
    btnVerCompleto.innerHTML = `<i class="bi bi-list-ul"></i> Ver historial completo`;
    historial.parentElement.appendChild(btnVerCompleto);
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-open');
        overlay.classList.toggle('active');
    });
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('sidebar-open');
        overlay.classList.remove('active');
    });
});

function redirect(){
    window.location.href = "html/reserve-cita.html";
}

document.getElementById("btn-reservar-cita").addEventListener("click", redirect);
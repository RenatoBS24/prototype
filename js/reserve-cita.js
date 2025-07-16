document.addEventListener("DOMContentLoaded", function () {
    const servicios = {
        "Medicina General": {
            doctor: "Dr. Juan Pérez",
            cupos: 3,
            horarios: ["09:00", "10:00", "11:00"]
        },
        "Odontología": {
            doctor: "Dra. Ana Torres",
            cupos: 2,
            horarios: ["11:30", "12:30"]
        },
        "Pediatría": {
            doctor: "Dr. Luis Gómez",
            cupos: 4,
            horarios: ["15:00", "16:00", "17:00"]
        },
        "Laboratorio": {
            doctor: "Lic. Marta Ruiz",
            cupos: 5,
            horarios: ["08:30", "09:30", "10:30"]
        },
        "Oftalmología": {
            doctor: "Dr. Carlos Díaz",
            cupos: 1,
            horarios: ["10:00"]
        }
    };

    const form = document.getElementById("form-reserva-cita");
    const listaHistorial = document.getElementById("lista-historial-cita");
    const servicioSelect = document.getElementById("servicio");
    const doctorInput = document.getElementById("doctor");
    const cuposInput = document.getElementById("cupos");
    const horarioSelect = document.getElementById("horario");

    servicioSelect.addEventListener("change", function () {
        const servicio = servicioSelect.value;
        if (servicio && servicios[servicio]) {
            doctorInput.value = servicios[servicio].doctor;
            cuposInput.value = servicios[servicio].cupos + " cupos";
            horarioSelect.innerHTML = servicios[servicio].horarios.map(h => `<option value="${h}">${h}</option>`).join("");
        } else {
            doctorInput.value = "";
            cuposInput.value = "";
            horarioSelect.innerHTML = `<option value="">Seleccione un servicio primero</option>`;
        }
    });

    function cargarHistorial() {
        const citas = JSON.parse(localStorage.getItem("citas")) || [];
        listaHistorial.innerHTML = "";
        citas.slice(-5).reverse().forEach(cita => {
            const li = document.createElement("li");
            li.innerHTML = `
                <i class="bi bi-calendar-event"></i>
                <span><strong>${cita.servicio}</strong></span>
                <span>${cita.fecha} ${cita.hora}</span>
                <span class="cita-estado">${cita.estado}</span>
                <span class="cita-doctor"><i class="bi bi-person-badge"></i> ${cita.doctor}</span>
            `;
            listaHistorial.appendChild(li);
        });
    }

    cargarHistorial();

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const servicio = servicioSelect.value;
        const doctor = doctorInput.value;
        const cupos = cuposInput.value;
        const horario = horarioSelect.value;
        const fecha = new Date().toISOString().slice(0,10);

        if (!servicio || !doctor || !cupos || !horario) return;

        const nuevaCita = {
            servicio,
            doctor,
            fecha,
            hora: horario,
            estado: "Confirmada"
        };
        const citas = JSON.parse(localStorage.getItem("citas")) || [];
        citas.push(nuevaCita);
        localStorage.setItem("citas", JSON.stringify(citas));
        form.reset();
        doctorInput.value = "";
        cuposInput.value = "";
        horarioSelect.innerHTML = `<option value="">Seleccione un servicio primero</option>`;
        cargarHistorial();
        alert("¡Cita reservada exitosamente!");
    });
});
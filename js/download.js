document.addEventListener("DOMContentLoaded", function () {
    const lista = document.getElementById("lista-citas-descarga");
    const filtroServicio = document.getElementById("filtro-servicio");
    const filtroEstado = document.getElementById("filtro-estado");
    const btnFiltrar = document.getElementById("btn-filtrar");
    const btnExportarPDF = document.getElementById("btn-exportar-pdf");
    const btnExportarExcel = document.getElementById("btn-exportar-excel");

    let citas = JSON.parse(localStorage.getItem("citas")) || [];
    let citasFiltradas = citas.slice();

    function renderCitas(citasArr) {
        lista.innerHTML = "";
        if (citasArr.length === 0) {
            lista.innerHTML = "<li>No hay citas para mostrar.</li>";
            return;
        }
        citasArr.slice().reverse().forEach(cita => {
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
    }

    function filtrarCitas() {
        const servicio = filtroServicio.value;
        const estado = filtroEstado.value;
        citasFiltradas = citas.filter(cita => {
            const matchServicio = servicio ? cita.servicio === servicio : true;
            const matchEstado = estado ? cita.estado === estado : true;
            return matchServicio && matchEstado;
        });
        renderCitas(citasFiltradas);
    }

    btnFiltrar.addEventListener("click", filtrarCitas);

    // Exportar a PDF
    btnExportarPDF.addEventListener("click", function () {
        if (citasFiltradas.length === 0) return alert("No hay citas para exportar.");
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.text("Historial de Citas", 10, 10);
        let y = 20;
        citasFiltradas.forEach((cita, idx) => {
            doc.text(
                `${idx + 1}. ${cita.servicio} - ${cita.fecha} ${cita.hora} - ${cita.estado}${cita.doctor ? " - " + cita.doctor : ""}`,
                10, y
            );
            y += 10;
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });
        doc.save("historial_citas.pdf");
    });

    btnExportarExcel.addEventListener("click", function () {
        if (citasFiltradas.length === 0) return alert("No hay citas para exportar.");
        const wsData = [
            ["Servicio", "Fecha", "Hora", "Estado", "Doctor"]
        ];
        citasFiltradas.forEach(cita => {
            wsData.push([
                cita.servicio,
                cita.fecha,
                cita.hora,
                cita.estado,
                cita.doctor || ""
            ]);
        });
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, "Citas");
        XLSX.writeFile(wb, "historial_citas.xlsx");
    });
    renderCitas(citasFiltradas);
});
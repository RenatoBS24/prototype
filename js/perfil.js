document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-perfil");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const dni = document.getElementById("dni");
    const perfilImg = document.getElementById("perfil-img");
    const inputImg = document.getElementById("input-img");
    const btnCambiarImg = document.getElementById("btn-cambiar-img");
    const perfil = JSON.parse(localStorage.getItem("perfil")) || {};
    nombre.value = perfil.nombre || "";
    email.value = perfil.email || "";
    telefono.value = perfil.telefono || "";
    dni.value = perfil.dni || "";
    if (perfil.img) perfilImg.src = perfil.img;
    btnCambiarImg.addEventListener("click", () => inputImg.click());
    inputImg.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                perfilImg.src = e.target.result;
                perfil.img = e.target.result;
                localStorage.setItem("perfil", JSON.stringify(perfil));
            };
            reader.readAsDataURL(file);
        }
    });
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        perfil.nombre = nombre.value;
        perfil.email = email.value;
        perfil.telefono = telefono.value;
        perfil.dni = dni.value;
        localStorage.setItem("perfil", JSON.stringify(perfil));
        alert("Perfil actualizado correctamente.");
    });
});
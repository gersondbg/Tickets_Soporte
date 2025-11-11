document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const mensaje = document.createElement("p");
    form.after(mensaje);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = form.querySelector('input[placeholder="Nombre del cliente"]').value.trim();
        const asunto = form.querySelector('input[placeholder="Asunto"]').value.trim();
        const descripcion = form.querySelector('textarea').value.trim();

        if (!nombre || !asunto || !descripcion) {
            mensaje.textContent = "⚠️ Por favor, completa todos los campos.";
            mensaje.style.color = "red";
            return;
        }

        mensaje.textContent = "✅ Ticket creado correctamente.";
        mensaje.style.color = "green";
        form.reset();
    });
});

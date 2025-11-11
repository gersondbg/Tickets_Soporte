document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ticketform");
    const nombre = document.getElementById("nombre");
    const asunto = document.getElementById("asunto");
    const descripcion = document.getElementById("descripcion");
    const mensaje = document.getElementById("mensaje");
    const tabla = document.getElementById("tablaTickets");

    function renderTabla() {
        const tickets = TicketAPI.obtenerTickets();
        tabla.innerHTML = "";
        tickets.forEach(ticket => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${ticket.id}</td>
                <td>${ticket.nombre}</td>
                <td>${ticket.asunto}</td>
                <td>${ticket.descripcion}</td>
                <td class="estado ${ticket.estado.toLowerCase()}">${ticket.estado}</td>
                <td>${ticket.fecha}</td>
                <td>
                    <button class="cerrar" data-id="${ticket.id}" ${ticket.estado === "Cerrado" ? "disabled" : ""}>
                        Cerrar
                    </button>
                </td>
            `;
            tabla.appendChild(fila);
        });
    }

    function crearTicket() {
        if (!nombre.value.trim() || !asunto.value.trim() || !descripcion.value.trim()) {
            mensaje.textContent = "⚠️ Completa todos los campos.";
            mensaje.style.color = "red";
            return;
        }

        TicketAPI.crearTicket(nombre.value, asunto.value, descripcion.value);
        mensaje.textContent = "✅ Ticket creado correctamente. (📧 Correo enviado al cliente)";
        mensaje.style.color = "green";
        form.reset();
        renderTabla();
    }

    function cerrarTicket(id) {
        TicketAPI.actualizarEstado(id, "Cerrado");
        mensaje.textContent = "📩 Ticket cerrado. Se notificó al cliente.";
        mensaje.style.color = "gray";
        renderTabla();
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        crearTicket();
    });

    document.addEventListener("click", e => {
        if (e.target.classList.contains("cerrar")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            cerrarTicket(id);
        }
    });

    renderTabla();
});

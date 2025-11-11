// Simulación de una API local para manejo de tickets
const TicketAPI = (() => {
    let tickets = [];
    let contador = 1;

    function crearTicket(nombre, asunto, descripcion) {
        const nuevoTicket = {
            id: contador++,
            nombre,
            asunto,
            descripcion,
            estado: "Abierto",
            fecha: new Date().toLocaleString()
        };
        tickets.push(nuevoTicket);
        return nuevoTicket;
    }

    function obtenerTickets() {
        return tickets;
    }

    function actualizarEstado(id, nuevoEstado) {
        const ticket = tickets.find(t => t.id === id);
        if (ticket) {
            ticket.estado = nuevoEstado;
            return ticket;
        }
        return null;
    }

    return {
        crearTicket,
        obtenerTickets,
        actualizarEstado
    };
})();

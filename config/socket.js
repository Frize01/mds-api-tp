import { Server } from "socket.io";

// Configurer Socket.IO
export default (server) => {
  const io = new Server(server);

  // Gérer les connexions des utilisateurs
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Gérer l'événement d'envoi de message
    socket.on("sendMessage", (message) => {
      const user = socket.id;
      console.log(`Message from ${user}: ${message}`);

      // Vérifier si le message commence par "/dab"
      if (message.startsWith("/dab")) {
        const somme = parseFloat(message.split("/dab")[1]);

        if (isNaN(somme)) {
          socket.emit(
            "message",
            "System",
            "Erreur: Veuillez entrer un nombre valide après /dab",
          );
          return;
        }

        const result = dab({ somme: somme, devise: "€" });

        let dabMessage = "";
        result.forEach((item) => {
          dabMessage += `${item.nombre} ${item.type} de ${item.valeur}€<br>`;
        });

        socket.emit("message", "DAB", dabMessage);
        return;
      }

      // Diffuser le message aux autres utilisateurs
      socket.broadcast.emit("message", user, message);
    });

    // Gérer la déconnexion des utilisateurs
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

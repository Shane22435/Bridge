const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const Game = require("./components/Game");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const games = {}; // Store games by gameId

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Create a new game
  socket.on("createGame", (callback) => {
    const gameId = uuidv4();
    games[gameId] = new Game(gameId, []);
    callback(gameId);
    console.log(`Game created with ID: ${gameId}`);
  });

  // Join a game
  socket.on("joinGame", ({ gameId, playerName }) => {
    const game = games[gameId];
    if (game) {
      game.players.push({ id: socket.id, name: playerName });
      socket.join(gameId);

      io.to(gameId).emit("playerJoined", {
        playerName,
        players: game.players.map((p) => p.name),
      });

      socket.emit("joinSuccess");
      console.log(`${playerName} joined game ${gameId}`);
    } else {
      socket.emit("error", "Game not found.");
    }
  });

  // Handle player disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (const gameId in games) {
      const game = games[gameId];
      const playerIndex = game.players.findIndex(
        (player) => player.id === socket.id
      );
      if (playerIndex !== -1) {
        const playerName = game.players[playerIndex].name;
        game.players.splice(playerIndex, 1);
        io.to(gameId).emit("playerLeft", playerName);
        console.log(`${playerName} has left game ${gameId}`);
      }
      // Remove the game if no players are left
      if (game.players.length === 0) {
        delete games[gameId];
        console.log(`Game ${gameId} has been removed due to no players.`);
      }
    }
  });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import io, { Socket } from "socket.io-client";

export default function Home() {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const socketConnection = io("http://localhost:3001");
    setSocket(socketConnection);

    socketConnection.on("connect", () => {
      console.log("Socket connected:", socketConnection.id);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const handleCreateGame = () => {
    if (socket) {
      setLoading(true);
      socket.emit("createGame", (newGameId: string) => {
        setGameId(newGameId);
        setIsCreating(true);
        setLoading(false);
      });
    } else {
      console.error("Socket is not initialized");
    }
  };

  const handleJoinGame = () => {
    if (socket) {
      if (gameId && playerName) {
        console.log(`Attempting to join game ${gameId} as ${playerName}`);
        socket.emit("joinGame", { gameId, playerName });

        socket.on("joinSuccess", () => {
          console.log("Redirecting to game page");
          router.push(`/game/${gameId}?player=${playerName}`);
        });

        console.log(`${playerName} is joining game ${gameId}`);
      }
    } else {
      console.error("Socket is not initialized");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-8">
      <h1 className="text-4xl font-extrabold text-white mb-8">
        Multiplayer Game
      </h1>

      <div className="mb-8">
        <button
          onClick={handleCreateGame}
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 
          ${
            loading
              ? "bg-gray-400"
              : "bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          }`}
        >
          {loading ? "Creating Game..." : "Create New Game"}
        </button>
      </div>

      <div className="mb-8 w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Join Existing Game</h2>
        <input
          type="text"
          placeholder="Enter Game ID"
          value={gameId || ""}
          onChange={(e) => setGameId(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleJoinGame}
          className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Join Game
        </button>
      </div>

      {isCreating && gameId && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">Game Created!</h2>
          <p className="text-lg">
            Game ID: <span className="font-bold">{gameId}</span>
          </p>
          <p className="text-gray-600">
            Please share this Game ID with your friends to join!
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import React, { useEffect, useState } from "react";

export default function GamePage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const searchParams = useSearchParams();
  const playerName = searchParams.get("player");

  const { gameId } = React.use(params);

  const { socket, connected } = useSocket("http://localhost:3001");
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    if (connected && gameId && playerName) {
      // Join the game
      socket.emit("joinGame", { gameId, playerName });

      // Listen for playerJoined event
      socket.on("playerJoined", ({ playerName, players }) => {
        console.log(`${playerName} joined the game`);
        setPlayers(players);
      });

      // Listen for playerLeft event
      socket.on("playerLeft", (playerName) => {
        console.log(`${playerName} has left the game`);
        setPlayers((prevPlayers) =>
          prevPlayers.filter((p) => p !== playerName)
        );
      });

      return () => {
        // Clean up event listeners on unmount
        socket.off("playerJoined");
        socket.off("playerLeft");
      };
    }
  }, [connected, gameId, playerName, socket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 text-white p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold mb-4">Bridge Game: {gameId}</h1>
        <h2 className="text-2xl font-semibold mb-2">Players:</h2>
        <ul className="list-disc list-inside space-y-2">
          {players.length > 0 ? (
            players.map((player, index) => (
              <li key={index} className="text-gray-800 font-medium">
                {player}
              </li>
            ))
          ) : (
            <li className="text-gray-800">No players joined yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

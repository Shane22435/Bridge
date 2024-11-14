// app/GamePhase.tsx
'use client';
import React, { useEffect, useState } from "react";

const GamePhase = () => {
  const allCards = [
    "2C.svg", "3C.svg", "4C.svg", "5C.svg", "6C.svg", "7C.svg", "8C.svg", "9C.svg", "TC.svg", "JC.svg", "QC.svg", "KC.svg", "AC.svg",
    "2D.svg", "3D.svg", "4D.svg", "5D.svg", "6D.svg", "7D.svg", "8D.svg", "9D.svg", "TD.svg", "JD.svg", "QD.svg", "KD.svg", "AD.svg",
    "2H.svg", "3H.svg", "4H.svg", "5H.svg", "6H.svg", "7H.svg", "8H.svg", "9H.svg", "TH.svg", "JH.svg", "QH.svg", "KH.svg", "AH.svg",
    "2S.svg", "3S.svg", "4S.svg", "5S.svg", "6S.svg", "7S.svg", "8S.svg", "9S.svg", "TS.svg", "JS.svg", "QS.svg", "KS.svg", "AS.svg"
  ];

  const [players, setPlayers] = useState<string[][]>([[], [], [], []]);

  useEffect(() => {
    const shuffledDeck = [...allCards].sort(() => Math.random() - 0.5);
    const playerCards = [
      shuffledDeck.slice(0, 13),
      shuffledDeck.slice(13, 26),
      shuffledDeck.slice(26, 39),
      shuffledDeck.slice(39, 52)
    ];
    setPlayers(playerCards);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        padding: "2%",
        boxSizing: "border-box",
      }}
    >
      {/* Player at the top */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          transform: "translateX(-50%)",
          left: "50%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.3vw", // Smaller gap between cards
          maxWidth: "80%", // Limit the width of the player hand
        }}
      >
        {players[0].map((card, index) => (
          <img
            key={index}
            src={`/Cards/${card}`}
            alt={`Player 1 card ${index}`}
            style={{ width: "2.5vw", height: "auto" }} // Smaller card size
          />
        ))}
      </div>

      {/* Player on the left */}
      <div
        style={{
          position: "absolute",
          left: "5%",
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.3vw", // Smaller gap between cards
          maxHeight: "80%", // Limit the height of the player hand
        }}
      >
        {players[1].map((card, index) => (
          <img
            key={index}
            src={`/Cards/${card}`}
            alt={`Player 2 card ${index}`}
            style={{ width: "2.5vw", height: "auto" }} // Smaller card size
          />
        ))}
      </div>

      {/* Player on the right */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.3vw", // Smaller gap between cards
          maxHeight: "80%", // Limit the height of the player hand
        }}
      >
        {players[2].map((card, index) => (
          <img
            key={index}
            src={`/Cards/${card}`}
            alt={`Player 3 card ${index}`}
            style={{ width: "2.5vw", height: "auto" }} // Smaller card size
          />
        ))}
      </div>

      {/* Player at the bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          transform: "translateX(-50%)",
          left: "50%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.3vw", // Smaller gap between cards
          maxWidth: "80%", // Limit the width of the player hand
        }}
      >
        {players[3].map((card, index) => (
          <img
            key={index}
            src={`/Cards/${card}`}
            alt={`Player 4 card ${index}`}
            style={{ width: "2.5vw", height: "auto" }} // Smaller card size
          />
        ))}
      </div>
    </div>
  );
};

export default GamePhase;

'use client';

import Image from 'next/image';

const GameFinishedPhase = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Image
        src="/UI-Assets/Score-Board.png" // Using a URL path
        alt="Score Board"
        width={800}
        height={382}
        style={{
          objectFit: 'contain',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

export default GameFinishedPhase;

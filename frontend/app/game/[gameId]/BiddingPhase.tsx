'use client';

import Image from 'next/image';

const BiddingPhase = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Image
        src="/UI-Assets/Bidding-Table.png" // Using a URL path
        alt="Bidding Table"
        width={350}
        height={300}
        style={{
          objectFit: 'contain',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

export default BiddingPhase;

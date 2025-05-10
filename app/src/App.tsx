import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { SplitProgram } from './components/SplitProgram';
import '@solana/wallet-adapter-react-ui/styles.css';

// Initialize Solana connection
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Your program ID from the deployment
const PROGRAM_ID = new PublicKey('ohxsCJitxBbnfkprnk6YrXJrCU8XZSLHLUmxNyNrgyV');

function App() {
  // Initialize wallet adapter
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div style={{ padding: '2rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Solana Split Program</h1>
            <SplitProgram programId={PROGRAM_ID} connection={connection} />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App; 
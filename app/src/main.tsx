import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import App from './App';
import './index.css';
import '@solana/wallet-adapter-react-ui/styles.css';

// Initialize Solana connection
const endpoint = clusterApiUrl('devnet');

// Initialize wallet adapters
const wallets = [new PhantomWalletAdapter()];

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>
); 
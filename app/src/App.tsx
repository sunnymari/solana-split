import React, { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import './App.css';

const App: React.FC = () => {
  const { connected, connecting, publicKey, disconnect, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [recipient1, setRecipient1] = useState('');
  const [recipient2, setRecipient2] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey) {
      fetchBalance();
    }
  }, [publicKey, connection]);

  const fetchBalance = async () => {
    if (!publicKey) return;
    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  };

  const handleSplit = async () => {
    if (!publicKey || !sendTransaction) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Validate inputs
      if (!recipient1 || !recipient2 || !amount) {
        throw new Error('Please fill in all fields');
      }

      const recipient1Pubkey = new PublicKey(recipient1);
      const recipient2Pubkey = new PublicKey(recipient2);
      const splitAmount = parseFloat(amount);

      if (isNaN(splitAmount) || splitAmount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      // Create transaction
      const transaction = new Transaction();
      
      // Calculate split amounts (half to each recipient)
      const halfAmount = (splitAmount * LAMPORTS_PER_SOL) / 2;

      // Add transfer to first recipient
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipient1Pubkey,
          lamports: halfAmount,
        })
      );

      // Add transfer to second recipient
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipient2Pubkey,
          lamports: halfAmount,
        })
      );

      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      // Update balance
      await fetchBalance();

      // Clear form
      setRecipient1('');
      setRecipient2('');
      setAmount('');
    } catch (err) {
      console.error('Error splitting SOL:', err);
      setError(err instanceof Error ? err.message : 'Failed to split SOL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      color: 'white'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        backgroundColor: '#2a2a2a',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>Solana Split Program</h1>
        
        {/* Instructions */}
        <div style={{ 
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: '#333',
          borderRadius: '4px',
          fontSize: '0.9rem',
          lineHeight: '1.5'
        }}>
          <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>How to Create a Split Transaction:</h2>
          <ol style={{ margin: '0', paddingLeft: '1.5rem' }}>
            <li>Connect your wallet using the button below</li>
            <li>Enter two recipient Solana addresses</li>
            <li>Enter the total amount of SOL to split</li>
            <li>Click "Split SOL" to create the transaction</li>
            <li>Approve the transaction in your wallet</li>
          </ol>
        </div>

        {/* Wallet Connection Button */}
        <div style={{ 
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <WalletMultiButton />
          {connected && (
            <button
              onClick={() => disconnect()}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer'
              }}
            >
              Disconnect
            </button>
          )}
        </div>

        {/* Wallet Info */}
        {connected && publicKey && (
          <div style={{ 
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: '#333',
            borderRadius: '4px'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Wallet Information:</h3>
            <p style={{ margin: '0.5rem 0', wordBreak: 'break-all' }}>
              <strong>Address:</strong> {publicKey.toString()}
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Balance:</strong> {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
            </p>
          </div>
        )}

        {/* Split Form */}
        {connected && (
          <div style={{ 
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: '#333',
            borderRadius: '4px'
          }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Create Split Transaction</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Recipient 1 Address
              </label>
              <input
                type="text"
                value={recipient1}
                onChange={(e) => setRecipient1(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #4a4a4a',
                  borderRadius: '4px',
                  color: 'white'
                }}
                placeholder="Enter Solana address"
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Recipient 2 Address
              </label>
              <input
                type="text"
                value={recipient2}
                onChange={(e) => setRecipient2(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #4a4a4a',
                  borderRadius: '4px',
                  color: 'white'
                }}
                placeholder="Enter Solana address"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Amount to Split (SOL)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #4a4a4a',
                  borderRadius: '4px',
                  color: 'white'
                }}
                placeholder="Enter amount in SOL"
              />
            </div>

            <button
              onClick={handleSplit}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#646cff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Creating Transaction...' : 'Split SOL'}
            </button>

            {error && (
              <div style={{ 
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#dc3545',
                color: 'white',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}
          </div>
        )}

        {/* Status Message */}
        <div style={{ 
          textAlign: 'center', 
          padding: '1rem', 
          color: '#888',
          backgroundColor: '#333',
          borderRadius: '4px',
          marginTop: '1rem'
        }}>
          {connecting ? (
            'Connecting to wallet...'
          ) : connected ? (
            'Wallet connected! You can now create split transactions.'
          ) : (
            'Please connect your wallet to continue'
          )}
        </div>
      </div>
    </div>
  );
};

export default App; 
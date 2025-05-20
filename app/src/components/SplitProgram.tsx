import React, { FC, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { IDL } from '../types/solana_split';

interface SplitProgramProps {
  programId: PublicKey;
  connection: Connection;
}

export const SplitProgram: FC<SplitProgramProps> = ({ programId, connection }) => {
  const { publicKey, sendTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [recipient1, setRecipient1] = useState('');
  const [recipient2, setRecipient2] = useState('');
  const [amount, setAmount] = useState('');

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
      setError('Failed to fetch balance');
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

      // Create provider
      const provider = new AnchorProvider(
        connection,
        window.solana,
        { commitment: 'confirmed' }
      );

      // Initialize program
      const program = new Program(IDL, programId, provider);

      // Create transaction
      const transaction = new Transaction();

      // Add split instruction
      const splitIx = await program.methods
        .split(new web3.BN(splitAmount * LAMPORTS_PER_SOL))
        .accounts({
          sender: publicKey,
          recipient1: recipient1Pubkey,
          recipient2: recipient2Pubkey,
          systemProgram: SystemProgram.programId,
        })
        .instruction();

      transaction.add(splitIx);

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
      gap: '1rem',
      width: '100%'
    }}>
      {!publicKey ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          backgroundColor: '#3a3a3a',
          borderRadius: '8px'
        }}>
          Please connect your wallet to use this application
        </div>
      ) : (
        <>
          <div style={{ 
            backgroundColor: '#3a3a3a',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Your Balance</h3>
            <p style={{ margin: 0, fontSize: '1.5rem' }}>
              {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            backgroundColor: '#3a3a3a',
            padding: '1.5rem',
            borderRadius: '8px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Recipient 1 Address
              </label>
              <input
                type="text"
                value={recipient1}
                onChange={(e) => setRecipient1(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #4a4a4a',
                  borderRadius: '4px',
                  color: 'white'
                }}
                placeholder="Enter Solana address"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Recipient 2 Address
              </label>
              <input
                type="text"
                value={recipient2}
                onChange={(e) => setRecipient2(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #4a4a4a',
                  borderRadius: '4px',
                  color: 'white'
                }}
                placeholder="Enter Solana address"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Amount (SOL)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #4a4a4a',
                  borderRadius: '4px',
                  color: 'white'
                }}
                placeholder="Enter amount in SOL"
                step="0.000000001"
                min="0"
              />
            </div>

            {error && (
              <div style={{ 
                color: '#ff4444', 
                backgroundColor: '#3a2a2a',
                padding: '0.75rem',
                borderRadius: '4px',
                marginTop: '0.5rem'
              }}>
                {error}
              </div>
            )}

            <button
              onClick={handleSplit}
              disabled={loading}
              style={{
                backgroundColor: loading ? '#4a4a4a' : '#4CAF50',
                color: 'white',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                marginTop: '1rem'
              }}
            >
              {loading ? 'Processing...' : 'Split SOL'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}; 
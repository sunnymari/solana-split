import React, { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { IDL } from '../types/solana_split';

interface SplitProgramProps {
  programId: PublicKey;
  connection: Connection;
}

export const SplitProgram: FC<SplitProgramProps> = ({ programId, connection }) => {
  const wallet = useWallet();
  const [amount, setAmount] = useState<string>('');
  const [splitAccountAddress, setSplitAccountAddress] = useState<string>('');

  const handleInitialize = async () => {
    if (!wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) return;

    try {
      const provider = new AnchorProvider(
        connection,
        {
          publicKey: wallet.publicKey,
          signTransaction: wallet.signTransaction,
          signAllTransactions: wallet.signAllTransactions as (txs: Transaction[]) => Promise<Transaction[]>,
        },
        {}
      );
      
      const program = new Program(IDL, programId, provider);
      const splitAccount = web3.Keypair.generate();
      
      await program.methods
        .initializeSplit()
        .accounts({
          splitAccount: splitAccount.publicKey,
          user: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([splitAccount])
        .rpc();

      console.log('Split account initialized:', splitAccount.publicKey.toString());
      setSplitAccountAddress(splitAccount.publicKey.toString());
    } catch (error) {
      console.error('Error initializing split:', error);
    }
  };

  const handleWithdraw = async () => {
    if (!wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) return;

    try {
      const provider = new AnchorProvider(
        connection,
        {
          publicKey: wallet.publicKey,
          signTransaction: wallet.signTransaction,
          signAllTransactions: wallet.signAllTransactions as (txs: Transaction[]) => Promise<Transaction[]>,
        },
        {}
      );
      
      const program = new Program(IDL, programId, provider);

      if (!splitAccountAddress) {
        console.error('No split account address available');
        return;
      }

      const splitAccount = new PublicKey(splitAccountAddress);

      await program.methods
        .withdraw()
        .accounts({
          splitAccount,
          recipient: wallet.publicKey,
        })
        .rpc();

      console.log('Withdrawal successful');
    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <WalletMultiButton />
      </div>

      {wallet.publicKey && (
        <div>
          <h2>Solana Split Program</h2>
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={handleInitialize}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '1rem',
              }}
            >
              Initialize Split
            </button>
            <button
              onClick={handleWithdraw}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Withdraw
            </button>
          </div>
          {splitAccountAddress && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#2a2a2a', borderRadius: '4px' }}>
              <p>Split Account: {splitAccountAddress}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 
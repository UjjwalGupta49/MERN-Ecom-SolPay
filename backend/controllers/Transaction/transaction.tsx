import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import React, { FC, useCallback } from 'react';
import { Button } from '@mui/material';

export const SendTransaction: FC = () => {
    const { connection } = useConnection();
    const { wallet, sendTransaction } = useWallet();

    const onClick = useCallback(async () => {
        if (wallet != null) {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet, 
                    toPubkey: new PublicKey('9h2Qd11CoMVtMftrGcvYN2ySaUSEisJGAQrv6hSWgc7T'), // only for testing purposes, have to be retrived from merchant
                    lamports: 1000000000, // dynamic from database
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'processed');
            console.log(`Transaction confirmed: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
        } else {
            console.log('⚠️ Wallet not connected');
        }
    }, [wallet, sendTransaction, connection]);

    return (
        <div>
            <Button onClick={onClick} disabled={wallet == null} variant="text">
                <p style={{color: 'white'}}>Send Transaction</p>
            </Button>
        </div>
    );
};

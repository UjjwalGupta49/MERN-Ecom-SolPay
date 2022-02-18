import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import React, { FC, useCallback, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Button } from "@mui/material";
import {
  encodeURL,
  createQR,
  findTransactionSignature,
  FindTransactionSignatureError,
  validateTransactionSignature,
} from "@solana/pay";

import { simulateCheckout } from "./simulateCheckout";

export const SolPayments: FC = () => {
  const { wallet } = useWallet();
  const { connection } = useConnection();
  const MERCHANT_WALLET = new PublicKey(
    "EnYqiB4AsV9dcihwCdcPrnE6fXZLNxYxfrzVG4CT2vR8"
  );

  const makeUrl = useCallback(async () => {
    const label = "";
    const message = "";
    const memo = "";
    const amount = new BigNumber(1);
    const reference = new Keypair().publicKey;
    try {
        console.log("3. 💰 Create a payment request link \n");
        const url = encodeURL({
          recipient: MERCHANT_WALLET,
          amount,
          reference,
          label,
          message,
          memo,
        });
    
        console.log(url);
        // encode URL in QR code
        // const qrCode = createQR(url); // to make qr code for encoded payment link
    }catch(err) {
     console.log(err)   
    }

  }, []);

  return (
    <div>
      <div>
        <Button onClick={makeUrl} variant="text">
          <p>Solana Pay</p>
        </Button>
      </div>
    </div>
  );
};

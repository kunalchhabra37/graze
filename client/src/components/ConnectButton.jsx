import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const ConnectButton = () => {
  const { connected } = useWallet();

  return (
    <div>
      {connected ? (
        <button onClick={() => console.log("Disconnecting...")}>
          Disconnect
        </button>
      ) : (
        <WalletMultiButton />
      )}
    </div>
  );
};
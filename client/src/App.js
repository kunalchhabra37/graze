import { useState } from "react";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
  WalletModalProvider,
  WalletModal,
} from "@solana/wallet-adapter-react-ui";

const App = () => {
  const [wallet, setWallet] = useState();
  const [connected, setConnected] = useState(false);
  const connectToWallet = async () => {
    const walletAdapter = new PhantomWalletAdapter();
    await walletAdapter.connect();
    const publicKey = walletAdapter.publicKey;
    if(publicKey) setConnected(true);
    setWallet(walletAdapter);
    console.log("Connected to wallet " + publicKey.toBase58());
  };

  return (
    <WalletProvider wallets={[new PhantomWalletAdapter()]}>
      <WalletModalProvider>
        <div>
          <button onClick={connectToWallet}>
            {connected ? "Already Connected" : "Connect"}
          </button>
          {/* <WalletModal /> */}
        </div>
      </WalletModalProvider>
    </WalletProvider>
  );
};

export default App;

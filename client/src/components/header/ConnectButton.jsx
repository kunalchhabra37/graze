import { useState } from "react";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
  WalletModalProvider,
  WalletModal,
} from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";
import "./HeaderCss.css";
const ConnectButton = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState();
  const [connected, setConnected] = useState(false);
  const connectToWallet = async () => {
    const walletAdapter = new PhantomWalletAdapter();
    await walletAdapter.connect();
    const publicKey = walletAdapter.publicKey;
    if (publicKey) setConnected(true);
    setWallet(walletAdapter);
    console.log("Connected to wallet " + publicKey.toBase58());
    if (publicKey) {
      // route to home
      navigate("/home");
    }
    else {
      alert("Please connect to a wallet");
    }
  };

  return (
    <WalletProvider wallets={[new PhantomWalletAdapter()]}>
      <WalletModalProvider>
        <button onClick={connectToWallet} className="connect-button">
          <div className="text-wrapper-2">
            {connected ? "Wallet Connected" : "Connect"}
          </div>
        </button>
        {/* <WalletModal /> */}
      </WalletModalProvider>
    </WalletProvider>
  );
};

export default ConnectButton;

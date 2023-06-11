import { ConnectWallet, useDisconnect, useAddress } from "@thirdweb-dev/react";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function NavBar() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const disconnectWallet = () => {
    disconnect();
    setIsProfileOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Link href="/">Creatures Card</Link>
        <div className={styles.navLinks}>
          <Link href="/shop">
            <p>Shop</p>
          </Link>
          <Link href="/marketplace">
            <p>Marketplace</p>
          </Link>
        </div>
        <div>
          {!address ? (
            <ConnectWallet
              btnTitle="Connect Wallet"
              theme="light"
              className={styles.connectWalletBtn}
            />
          ) : (
            <div onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <img
                src="https://api.dicebear.com/6.x/adventurer/svg?seed=Sadie"
                alt="avatar"
                className={styles.avatar}
              />
            </div>
          )}
          {isProfileOpen && (
            <div className={styles.profileDropdown}>
              <Link href={"/my-Packs"}>
                <p>My packs</p>
              </Link>
              <Link href={"/my-Cards"}>
                <p>My cards</p>
              </Link>
              <button onClick={disconnectWallet}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

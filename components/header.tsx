import styles from './header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { AuthButton } from '@/components/AuthButton/AuthButton';

//import TonConnect from '@tonconnect/sdk';
//import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { TonConnectButton } from '@tonconnect/ui-react';
//import uploadMetadata from '@/util/uploadToIPFS';

export default function Header() {
  //const connector = new TonConnect({ manifestUrl: 'http://localhost:3000/tonconnect-manifest.json' });

  const handleClick = () => {
    const testTrait = [{ trait_type: "Background", value: "Brown" }, { trait_type: "Skin", value: "White" }, { trait_type: "Hat", value: "Hat" }, { trait_type: "Eye", value: "Blue glasses" }, { trait_type: "Diamonds", value: "Green Diamond" }]

    // uploadMetadata(
    //   "Test_Collection",
    //   "Test_NFT",
    //   "NFTDescription",
    //   testTrait,
    //   "cute_cat.png",
    //   "./imageDir/demo.png"
    // );
    console.log('click test button')
  }

  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.button_minting_tool}>
          <Image
            src="/v3.svg"
            alt="Logo"
            className={styles.logo_sun}
            width={19}
            height={19}
            priority
          />
          Minting Tool
        </div>
      </Link>
      <div className={styles.button_connect_wallet}>
        <Image
          src="/connect_icon.svg"
          alt="connect_icon"
          width={12}
          height={12}
          priority
        />
        <span className={styles.connect_wallet}>Connect Wallet</span>
      </div>
      <TonConnectButton />
    </div>
  );
}
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Link from 'next/link'
import { useIsConnectionRestored } from '@tonconnect/ui-react';
import { useTonWallet } from '@tonconnect/ui-react';


const inter = Inter({ subsets: ['latin'] });

const funcArray = [
  {
    title: 'Mint',
    iconPath: "/icon_mint.svg",
    imagePath: "/image_mint.svg",
    linkPath: "/mint",
    description: "Mint NFT"
  },
  {
    title: 'Reclaim',
    iconPath: "/icon_revoke.svg",
    imagePath: "/image_revoke.svg",
    linkPath: "/revoke",
    description: "Reclaim NFT"
  },
  {
    title: 'Upgrade',
    iconPath: "/icon_upgrade.svg",
    imagePath: "/image_upgrade.svg",
    linkPath: "/upgrade",
    description: "Upgrade NFT"
  }
]

export const Wallet = () => {
  const wallet = useTonWallet();

  return (
    wallet && (
      <div>
        <span>Connected wallet: {wallet.name}</span>
        <span>Device: {wallet.device.appName}</span>
      </div>
    )
  );
};

export default function Home() {
  //const connectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  return (
    <>

      <div className={styles.layer2_div}>
        {wallet ? null : (
          <>
            <Image
              src="/connect_wallet_arrow.svg"
              alt="connect_wallet_arrow"
              className={styles.logo_sun}
              width={64}
              height={80}
              priority
            />
            <span className={inter.className}>Connect your wallet!</span>
          </>
        )}
      </div>


      <div className={styles.func_div}>
        {funcArray.map((item) => <FuncCard key={item.title} {...item} />)}
      </div>
    </>
  )
}


function FuncCard(
  { title, iconPath, imagePath, linkPath, description }:
    { title: string, iconPath: string, imagePath: string, linkPath: string, description: string }) {
  return (
    <div className={styles.func_div}>
      <div className={styles.card_div}>
        <div className={styles.layer1_div}>
          <Image
            src={iconPath}
            alt="icon_title"
            width={37}
            height={37}
            priority
          />
          <div>{title}</div>
        </div>
        <Image
          src={imagePath}
          alt="image_func"
          width={300}
          height={300}
          priority
        />
        <Link href={linkPath} className={styles.button_div}>
          {description}
          <Image
            src="/button_arrow_right.svg"
            alt="button_arrow_right"
            width={13}
            height={10}
            priority
          />
        </Link>
      </div>
    </div>
  )
}
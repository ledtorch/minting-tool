import styles from './header.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
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
    </div>
  );
}
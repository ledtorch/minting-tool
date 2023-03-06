import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Layout from '../components/layout'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <div className={styles.layer2_div}>
        <Image
          src="/connect_wallet_arrow.svg"
          alt="connect_wallet_arrow"
          className={styles.logo_sun}
          width={64}
          height={80}
          priority
        />
        <span className={inter.className}>Connect your wallet!</span>
      </div>

      <div className={styles.func_div}>
        <FuncCard title='Mint' iconPath={"/icon_mint.svg"} imagePath={"/image_mint.svg"} linkPath={"/mint"} />
        <FuncCard title='Revoke' iconPath={"/icon_revoke.svg"} imagePath={"/image_revoke.svg"} linkPath={"/mint"} />
        <FuncCard title='Upgrade' iconPath={"/icon_upgrade.svg"} imagePath={"/image_upgrade.svg"} linkPath={"/mint"} />
      </div>
    </Layout>
  )
}


function FuncCard(
  { title, iconPath, imagePath, linkPath }:
    { title: string, iconPath: string, imagePath: string, linkPath: string }) {
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
          Mint NFT
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
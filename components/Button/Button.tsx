import Image from 'next/image'
import styles from './Button.module.css'

interface IButtonImageSrc { [key: string]: { src: string, reverse: boolean } };

const buttonEnum: IButtonImageSrc = {
  "Back": { src: "/back_arrow.svg", reverse: false },
  "Next": { src: "/arrow_right.svg", reverse: false },
  "Mint & Deploy": { src: "/arrow_right.svg", reverse: false },
  "Review": { src: "/arrow_right.svg", reverse: false },
  "Upgrade": { src: "/arrow_right.svg", reverse: false },
  "Confirm": { src: "/icon_check.svg", reverse: false },

  "Revoke Selected NFT": { src: "/button_revoke_nft.svg", reverse: true },
  "Cancel this File": { src: "/cancel_upload_button.svg", reverse: true },
  "Cancel": { src: "/cancel_upload_button.svg", reverse: true },
}

export default function Button(props: {title: string, clickFunc: Function}) {
  const {title, clickFunc} = props
  const buttonInfo = buttonEnum[title];

  return (
    <button
      className={styles.button_type + ' ' + (buttonInfo.reverse ? styles.red : styles.white)}
      onClick={()=>{clickFunc()}}
    >
      {!buttonInfo.reverse && title}
      <Image
        src={buttonInfo.src}
        alt={buttonInfo.src}
        width={24}
        height={24}
        priority
      />
      {buttonInfo.reverse && title}
    </button>
  )
}
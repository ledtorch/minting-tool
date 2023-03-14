import React, { useState } from "react";
import styles from './FeatureCard.module.css'
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import Image from 'next/image'


export default function FeatureCard(
  { title, children, step }: { title: string, children: React.ReactNode, step: number }) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className={styles.div_feature_card}>
      <div className={styles.div_header}>
        <div className={styles.div_title}>
          <Checkbox onChange={(e: CheckboxChangeEvent) => {
            console.log(`checked = ${e.target.checked}`);
          }} disabled={step === 3}>{title}</Checkbox>
        </div>
        <Image
          src={show ? "/header_dash_icon.svg" : "/header_arrow_down_icon.svg"}
          alt="control_icon"
          width={24}
          height={24}
          priority
          className={styles.control_icon}
          onClick={() => { setShow(!show) }}
        />
      </div>
      {
        show && children
      }
    </div>
  )
}
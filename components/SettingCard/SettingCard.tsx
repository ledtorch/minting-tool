import React, { useState } from "react";
import Image from 'next/image'


import styles from './SettingCard.module.css'
import { Switch } from 'antd';


export default function SettingCard(props:
  { checkValue: boolean, setCheck: Function | null, children: React.ReactNode, title: string, icon: string, checkDisabled: boolean }) {
  const { checkValue, setCheck, children, title, icon, checkDisabled } = props;
  return (
    <div className={styles.div_setting_card}>
      <div className={styles.div_header}>
        <div className={styles.div_title}>
          <Image
            src={icon}
            alt={icon}
            width={20}
            height={20}
            priority
          />
          {title}
        </div>
        {setCheck && (<Switch
          size="small"
          defaultChecked={checkValue}
          onChange={(check) => { setCheck(check) }}
          disabled={checkDisabled}
        />)}
      </div>
      {children}
    </div>
  )
}
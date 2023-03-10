import React, { useState } from "react";
import Image from 'next/image'
import styles from '@/styles/Revoke.module.css'
import Layout from '../components/layout'

const stepArray = [
  {
    index: 1,
    title: 'Select',
    description: 'Choose the NFT that you want to revoke.',

  },
  {
    index: 2,
    title: 'Revoke',
    description: 'Revoke your NFT.',

  },
]

export default function Revoke() {
  return (
    <Layout>
      <div>
        <div className={"page_title_div"}>
          <div>
            <Image
              src="/icon_mint.svg"
              alt="icon_mint"
              width={36.7}
              height={36.7}
              priority
            />
            Revoke NFT
          </div>
        </div>
      </div>
    </Layout>
  )
}
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

import Layout from '../components/layout'

import styles from '@/styles/Mint.module.css'

import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "SVG", "GIF"];

const stepArray = [
  {
    index: 1,
    title: 'Upload',
    description: 'Upload your NFT picture. We support jpg, png, svg, gif.',
    active: true
  },
  {
    index: 2,
    title: 'Edit',
    description: 'Edit your NFT features.',
    active: false
  },
  {
    index: 3,
    title: 'Deploy',
    description: 'Edit your NFT features',
    active: false
  },
]


export default function Mint() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const handleChange = (filePass: File) => {
    if (!file) {
      setFile(filePass);
      console.log(filePass);
      setName(filePass.name)
    }
  };

  const handleClickCancelFile = () => {
    setFile(null)
  }

  return (
    <Layout>
      <div>
        <div className={styles.page_title_div}>
          <div>
            <Image
              src="/icon_mint.svg"
              alt="icon_mint"
              width={36.7}
              height={36.7}
              priority
            />
            Minting NFT
          </div>
          {file && (<div className={styles.cancel_next_div}>
            <button className={styles.button_cancel} onClick={handleClickCancelFile}>
              <Image
                src="/cancel_upload_button.svg"
                alt="cancel_upload_button"
                width={24}
                height={24}
                priority
              />
              Cancel this File
            </button>
            <button className={styles.button_next}>
              Next
              <Image
                src="/arrow_right.svg"
                alt="arrow_right"
                width={24}
                height={24}
                priority
              />
            </button>
          </div>)}

        </div>

        <div className={styles.layer1_div}>
          <div className={styles.div_left}>
            {stepArray.map(item => <StepCard key={item.index} {...item} />)}
          </div>



          <div className={styles.div_right}>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              multiple={false}
              disabled={file}
            >
              <DropFileChildren file={file} name={name} description={description} setName={setName} setDescription={setDescription} />
            </FileUploader>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function StepCard(
  { index, title, description, active }:
    { index: number, title: string, description: string, active: boolean }
) {
  const sty = active ? styles.card_div + ' ' + styles.card_div_active : styles.card_div;
  return (
    <div className={sty}>
      <div className={styles.title}><div>{index}</div>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}

function DropFileChildren(
  { file, name, description, setName, setDescription }:
    { file: File | null, name: string, description: string, setName: Function, setDescription: Function }
) {
  return (
    file ? (
      <div className={styles.div_drop_file_done}>
        <div className={styles.div_preview_file}>
          <Image
            src={URL.createObjectURL(file)}
            alt="preview_file"
            fill
            priority
            className={styles.preview_file}
          />
        </div>

        <div className={styles.div_info}>
          <div>
            NFT Name
            <Image
              src="/edit_pen.svg"
              alt="edit_pen"
              width={14.5}
              height={14.5}
              priority
            />
          </div>
          <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <div className={styles.div_info}>
          <div>
            NFT Description
            <Image
              src="/edit_pen.svg"
              alt="edit_pen"
              width={14.5}
              height={14.5}
              priority
            />
          </div>
          <div>
            <input
              type="text"
              value={description}
              placeholder="The description of the NFT."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

      </div>
    ) : (
      <div className={styles.div_drop_file_here}>
        Drop your file here or
        <Image
          src="/upload_button.svg"
          alt="upload_button"
          width={49}
          height={49}
          priority
        />
      </div>
    )
  )
}
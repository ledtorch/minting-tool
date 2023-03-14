import React, { useState } from "react";
import Image from 'next/image'
import styles from '@/styles/Upgrade.module.css'
import Layout from '../components/layout'

import { StepCard } from '@/components/StepCard/StepCard'

import { Switch, Checkbox, Modal } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { FileUploader } from "react-drag-drop-files";

import Button from "@/components/Button/Button";

const stepArray = [
  {
    index: 1,
    title: 'Select',
    description: 'Choose the NFT that you want to upgrade.',

  },
  {
    index: 2,
    title: 'Edit',
    description: 'Edit the NFT.',

  },
  {
    index: 3,
    title: 'Upgrade',
    description: 'Upgrade the NFT.',

  },
];
const fileTypes = ["JPG", "PNG", "SVG", "GIF"];

const Upgrade = () => {
  const [step, setStep] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [oriImage, setOriImage] = useState<string>("/Niseko-trail-map.jpg");

  const handleChange = (filePass: File) => {
    if (!file) {
      setFile(filePass);
      console.log(filePass);
      setName(filePass.name)
    }
  };

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
            Upgrade NFT
          </div>
          <div className={'div_button_wrapper'}>
            {step > 1 && <Button title="Back" clickFunc={() => setStep(step - 1)} />}
            {(step < 3 && check) && <Button title="Next" clickFunc={() => setStep(step + 1)} />}
            {step === 3 && <Button title="Upgrade" clickFunc={() => { }} />}
          </div>
        </div>

        <div className={'layer1_div'}>
          <div className={'div_left'}>
            {stepArray.map(item => <StepCard key={item.index} {...item} step={step} />)}
          </div>

          <div className={'div_right'}>
            {
              step === 1 && (
                <div className={styles.div_step1}>
                  <div className={'div_search'}>
                    <Image
                      src="/search_icon.svg"
                      alt="search_icon"
                      width={24}
                      height={24}
                      priority
                    />
                    <input
                      style={{ width: '100%' }}
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>

                  <div className={'div_result'}>
                    <div
                      className={'div_item' + ' ' + (check ? 'checked' : '')}
                      onClick={() => { step === 1 && setCheck(!check) }}
                    >
                      <Image
                        src={oriImage}
                        alt="result_item"
                        fill
                        priority
                        className={'img_item'}
                      />
                      <div className={'div_footer'}>
                        <div className={'div_title'}>Title.jpg</div>
                        <Checkbox
                          checked={check}
                          onChange={(e: CheckboxChangeEvent) => {
                            //setCheck(e.target.checked);
                          }}
                          disabled={step > 1}
                        ></Checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            {
              step === 2 && (
                <div className={styles.div_step2}>
                  <div className={'div_result upgrade'}>
                    <div className={'div_edit_left'}>
                      <div className="div_title">NFT Image</div>
                      <div className="div_description">
                        Upload your NFT picture. We support jpg, png, svg, gif.
                      </div>
                      <div className="div_wrapper_1">
                        <div className="div_image">
                          <Image
                            src={oriImage}
                            className='preview_file'
                            alt="result_item"
                            fill
                            priority
                          />
                        </div>
                        <div className="div_info">
                          <div className="div_title">Image Format</div>
                          <div className="div_description">JPEG</div>
                          <div className="div_title" style={{ marginTop: '12px' }}>Upload Time</div>
                          <div className="div_description">19:31, Mar 2, 2023</div>
                        </div>
                      </div>

                    </div>
                    <div className="div_edit_right">

                      {!file && (
                        <FileUploader
                          handleChange={handleChange}
                          name="file"
                          types={fileTypes}
                          multiple={false}
                          disabled={file}
                          hoverTitle=" "
                        >
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
                        </FileUploader>
                      )}
                      {file && (
                        <div className={styles.div_preview_file}>
                          <div className={styles.div_image}>
                            <Image
                              src={URL.createObjectURL(file)}
                              alt="preview_file"
                              fill
                              priority
                            />
                          </div>
                          <div className='div_button_wrapper'>
                            <Button title="Cancel" clickFunc={() => setFile(null)} />
                            <Button title="Confirm" clickFunc={() => {
                              setOriImage(URL.createObjectURL(file));
                              setFile(null)
                            }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={'div_info_wrapper'}>
                    <div className={'div_info'}>
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
                    <div className={'div_info'}>
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
                          placeholder={'The description of the NFT.'}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }


          </div>
        </div>
      </div>

      <Modal
        title="Successfully Revoke"
        footer={null}
        centered
        maskClosable={false}
        className={'popup_modal popup_modal_success'}
        open={isModalOpen}
        onOk={() => { setIsModalOpen(false); }}
        onCancel={() => { setIsModalOpen(false); }}
      >
        <div className={'div_button_wrapper mt-24'}>
          <Button title="Confirm" clickFunc={() => setIsModalOpen(false)} />
        </div>
      </Modal>
    </Layout>
  )
}

export default Upgrade;
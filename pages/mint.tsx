import React, { useState } from "react";
import Image from 'next/image'

import Layout from '../components/layout'
import styles from '@/styles/Mint.module.css'
import { PlusMinusInput } from '@/components/PlusMinusInput/PlusMinusInput'
import { StepCard } from '@/components/StepCard/StepCard'

import { FileUploader } from "react-drag-drop-files";
import { Switch, Checkbox, Radio, Modal } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { RadioChangeEvent } from 'antd';


import Button from "@/components/Button/Button";

const fileTypes = ["JPG", "PNG", "SVG", "GIF"];

const stepArray = [
  {
    index: 1,
    title: 'Upload',
    description: 'Upload your NFT picture. We support jpg, png, svg, gif.',

  },
  {
    index: 2,
    title: 'Edit',
    description: 'Edit your NFT features.',

  },
  {
    index: 3,
    title: 'Deploy',
    description: 'Edit your NFT features',

  },
]

interface IAttributeData {
  trait: string,
  value: string
}

export default function Mint() {
  const [step, setStep] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [soulBound, setSoulBound] = useState<boolean>(false);
  const [batchMint, setBatchMint] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<string>("");
  const [batchMintValue, setBatchMintValue] = useState<string>("1");
  const [voucherIcon, setVoucherIcon] = useState<number>(1);
  const [voucherName, setVoucherName] = useState<string>("");
  const [redemptionLimit, setRedemptionLimit] = useState<string>("1");
  const [loyalty, setLoyalty] = useState<string>("1");
  const [attribute, setAttribute] = useState<IAttributeData[]>([{ trait: '', value: '' }]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAttributeChange = (index: number, data: IAttributeData) => {
    let oriData = [...attribute];
    oriData[index] = data;
    setAttribute(oriData);
  }
  const removeAttribute = (index: number) => {
    let data = [...attribute];
    data.splice(index, 1);
    console.log(data, index)
    setAttribute(data);
  }

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
            Minting NFT
          </div>
          {
            file && (
              <div className={'div_button_wrapper'}>
                {step === 1 && <Button title="Cancel this File" clickFunc={handleClickCancelFile} />}
                {step > 1 && <Button title="Back" clickFunc={() => setStep(step - 1)} />}
                {step < 3 && <Button title="Next" clickFunc={() => setStep(step + 1)} />}
                {step === 3 && <Button title="Mint & Deploy" clickFunc={() => setIsModalOpen(true)} />}
              </div>
            )
          }
        </div>

        <div className={'layer1_div'}>
          <div className={'div_left'}>
            {stepArray.map(item => <StepCard key={item.index} {...item} step={step} />)}
          </div>

          <div className={'div_right'}>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              multiple={false}
              disabled={file}
              hoverTitle=" "
            >
              <DropFileChildren
                file={file}
                name={name}
                description={description}
                setName={setName}
                setDescription={setDescription}
                step={step}
              />
            </FileUploader>
            {step >= 2 && (
              <div className={styles.div_step2}>
                <div className={styles.div_setting_card}>
                  <div className={styles.div_header}>
                    <div className={styles.div_title}>
                      <Image
                        src="/Soulbound.svg"
                        alt="Soulbound"
                        width={20}
                        height={20}
                        priority
                      />
                      Soulbound

                    </div>
                    <Switch size="small" defaultChecked={soulBound} onChange={(check) => { setSoulBound(check) }} disabled={step === 3} />
                  </div>
                  <div className={styles.div_description}>
                    In TOP, the soulbound token can only be revoked by its original owner. For more information, please refer to the section on <span>SBT in TOP</span>.
                  </div>
                  {soulBound && (
                    <div className={styles.div_receiver}>
                      Receiver
                      <input
                        type="text"
                        placeholder={step === 3 ? '' : 'Enter the address of the receiver'}
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        disabled={step === 3}
                      />
                      <p>*The receiver will be granted to the wallet you used for minting.</p>
                    </div>
                  )}
                </div>

                {!soulBound && (
                  <div className={styles.div_setting_card}>
                    <div className={styles.div_header}>
                      <div className={styles.div_title}>
                        <Image
                          src="/batch_mint.svg"
                          alt="batch_mint"
                          width={20}
                          height={20}
                          priority
                        />
                        Batch Mint
                      </div>
                      <Switch size="small" defaultChecked={batchMint} onChange={(check) => setBatchMint(check)} disabled={step === 3} />
                    </div>
                    {batchMint && (<div className={styles.div_content} style={{ marginTop: '15px' }}>
                      <PlusMinusInput
                        unitNum={50}
                        value={batchMintValue}
                        setValue={setBatchMintValue}
                        maxValue={1000}
                        minValue={1}
                        disabled={step === 3}
                      />
                      <p style={{ marginTop: '8px' }}>
                        *Mint limit: 10,000
                      </p>
                      <p>*If you need to mint more than 10,000 NFTs, please contact our customer service.</p>
                    </div>)}
                  </div>
                )}

                <div className={styles.div_setting_card}>
                  <div className={styles.div_header}>
                    <div className={styles.div_title}>
                      <Image
                        src="/batch_mint.svg"
                        alt="batch_mint"
                        width={20}
                        height={20}
                        priority
                      />
                      NFT Contract Features
                    </div>
                  </div>
                  <FeatureCard title="Voucher" step={step}>
                    <div className={styles.div_voucher}>
                      <div>
                        <div className={styles.div_title}>Voucher Icon</div>

                        <Radio.Group onChange={(e: RadioChangeEvent) => {
                          console.log('radio checked', e.target.value);
                          setVoucherIcon(e.target.value);
                        }} value={voucherIcon} disabled={step === 3}>
                          <Radio value={1}>
                            <Image
                              src="/voucher/voucher_icon_1.svg"
                              alt="voucher_icon_1"
                              width={24}
                              height={24}
                              priority
                              className={styles.svg001}
                            />
                          </Radio>
                          <Radio value={2}>
                            <Image
                              src="/voucher/voucher_icon_2.svg"
                              alt="voucher_icon_2"
                              width={24}
                              height={24}
                              priority
                            />
                          </Radio>
                          <Radio value={3}>
                            <Image
                              src="/voucher/voucher_icon_3.svg"
                              alt="voucher_icon_3"
                              width={24}
                              height={24}
                              priority
                            />
                          </Radio>
                          <Radio value={4}>
                            <Image
                              src="/voucher/voucher_icon_4.svg"
                              alt="voucher_icon_4"
                              width={24}
                              height={24}
                              priority
                            />
                          </Radio>
                        </Radio.Group>
                      </div>
                      <div>
                        <div className={styles.div_title}>Voucher Name</div>
                        <div>
                          <input
                            style={{ width: '100%' }}
                            type="text"
                            value={voucherName}
                            onChange={(e) => setVoucherName(e.target.value)}
                            placeholder={step === 3 ? '' : 'Enter voucher name'}
                            disabled={step === 3}
                          />
                        </div>
                        <div className={styles.red_hint}>
                          *Please name this voucher.
                        </div>
                      </div>
                      <div>
                        <div className={styles.div_title}>Redemption Limit</div>
                        <PlusMinusInput
                          unitNum={10}
                          value={redemptionLimit}
                          setValue={setRedemptionLimit}
                          maxValue={100}
                          minValue={1}
                          disabled={step === 3}
                        />
                        <div className={styles.red_hint}>
                          *The max number is 100.
                        </div>
                      </div>
                    </div>
                  </FeatureCard>

                  <FeatureCard title="Loyalty" step={step}>
                    <div style={{ marginTop: '16px' }}>
                      <PlusMinusInput
                        unitNum={5}
                        value={loyalty}
                        setValue={setLoyalty}
                        maxValue={100}
                        minValue={1}
                        disabled={step === 3}
                      />
                      <div className={styles.white_hint}>
                        *Loyalty range: 0~100%
                      </div>
                    </div>
                  </FeatureCard>

                  <FeatureCard title="Attribute" step={step}>
                    <div className={styles.div_attribute}>
                      {attribute.map((item, index) => {
                        return (
                          <div key={index}>
                            <div className={styles.div_title}>
                              {attribute.length > 1 && step !== 3 && (
                                <Image
                                  src="/icon_minus.svg"
                                  alt="icon_minus"
                                  width={24}
                                  height={24}
                                  priority
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => { removeAttribute(index) }}
                                />
                              )}
                              Attribute {index + 1}
                            </div>
                            <div className={styles.div_input}>
                              <input
                                style={{ width: '100%' }}
                                type="text"
                                value={item.trait}
                                onChange={(e) => {
                                  let data = { ...attribute[index] };
                                  data.trait = e.target.value;
                                  handleAttributeChange(index, data);
                                }}
                                placeholder={step === 3 ? '' : 'Trait'}
                                disabled={step === 3}
                              />
                              <input
                                style={{ width: '100px' }}
                                type="text"
                                value={item.value}
                                onChange={(e) => {
                                  let data = { ...attribute[index] };
                                  data.value = e.target.value;
                                  handleAttributeChange(index, data);
                                }}
                                placeholder={step === 3 ? '' : 'Value'}
                                disabled={step === 3}
                              />
                            </div>
                          </div>
                        )
                      })}

                      <div className={styles.red_hint}>
                        *The empty trait & value will be ignore when you mint the NFT.
                      </div>
                      <div className={styles.button_add_attribute} onClick={() => {
                        if (step === 3) {
                          return;
                        }
                        let data = [...attribute];
                        data.push({ trait: '', value: '' })
                        setAttribute(data);
                      }}>
                        Add Attribute
                      </div>
                      <div className={styles.white_hint}>
                        *If you need to add more than 10 attributes, please contact our customer service.
                      </div>
                    </div>
                  </FeatureCard>

                  <FeatureCard title="Upgradable" step={step}>
                    <div className={styles.div_upgradable}>
                      <div className={styles.div_nav}>Default</div>
                      <div className={styles.div_content}>
                        The editorship will be granted to the wallet you used for minting.
                      </div>
                    </div>
                  </FeatureCard>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title="Please Connect"
        footer={null}
        centered
        maskClosable={false}
        className={'popup_modal'}
        open={false}
        onOk={() => { setIsModalOpen(false); }}
        onCancel={() => { setIsModalOpen(false); }}
      >
        <p>To continue, please connect your wallet.</p>
        <p style={{ marginTop: '20px', color: '#D49C50' }}>
          <Image
            src="/connect_icon.svg"
            alt="connect_icon"
            width={12}
            height={12}
            priority
            style={{ marginRight: '6px' }}
          />
          Connect Wallet
        </p>
      </Modal>

      <Modal
        title="Review the Transaction on Your Wallet"
        footer={null}
        centered
        maskClosable={false}
        className={'popup_modal'}
        open={false}
        onOk={() => { setIsModalOpen(false); }}
        onCancel={() => { setIsModalOpen(false); }}
      >
        <div className={'div_button_wrapper mt-24'}>
          <Button title="Back" clickFunc={() => setIsModalOpen(false)} />
          <Button title="Review" clickFunc={() => setIsModalOpen(false)} />
        </div>
      </Modal>

      <Modal
        title="Successfully Minted"
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



function FeatureCard({ title, children, step }: { title: string, children: React.ReactNode, step: number }) {
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


function DropFileChildren(
  { file, name, description, setName, setDescription, step }:
    { file: File | null, name: string, description: string, setName: Function, setDescription: Function, step: number }
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
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={step === 3} />
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
              placeholder={step === 3 ? '' : 'The description of the NFT.'}
              onChange={(e) => setDescription(e.target.value)}
              disabled={step === 3}
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
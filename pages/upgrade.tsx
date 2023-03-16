import React, { useState } from "react";
import Image from 'next/image'
import styles from '@/styles/Upgrade.module.css'

import { StepCard } from '@/components/StepCard/StepCard'

import { Switch, Checkbox, Modal, Radio, RadioChangeEvent } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { FileUploader } from "react-drag-drop-files";

import Button from "@/components/Button/Button";
import { PlusMinusInput } from '@/components/PlusMinusInput/PlusMinusInput'
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import SettingCard from "@/components/SettingCard/SettingCard";

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

interface IAttributeData {
  trait: string,
  value: string
}

const Upgrade = () => {
  const [step, setStep] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [oriImage, setOriImage] = useState<string>("/Niseko-trail-map.jpg");


  const [soulBound, setSoulBound] = useState<boolean>(false);
  const [batchMint, setBatchMint] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<string>("");
  const [batchMintValue, setBatchMintValue] = useState<string>("1");
  const [voucherIcon, setVoucherIcon] = useState<number>(1);
  const [voucherName, setVoucherName] = useState<string>("");
  const [redemptionLimit, setRedemptionLimit] = useState<string>("1");
  const [loyalty, setLoyalty] = useState<string>("1");
  const [attribute, setAttribute] = useState<IAttributeData[]>([{ trait: '', value: '' }]);



  const handleChange = (filePass: File) => {
    if (!file) {
      setFile(filePass);
      console.log(filePass);
      setName(filePass.name)
    }
  };

  return (
    <>
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
            {step === 3 && <Button title="Upgrade" clickFunc={() => {setIsModalOpen(true)}} />}
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



            {
              step === 3 && (
                <>
                  <div>
                    <div className={styles.div_image_wrapper}>
                      <Image
                        src={oriImage}
                        className={styles.preview_file}
                        alt="result_item"
                        fill
                        priority
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
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled
                        />
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
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.div_step3}>
                    <SettingCard
                      title="Soulbound"
                      checkValue={soulBound}
                      setCheck={setSoulBound}
                      checkDisabled={step === 3}
                      icon={"/Soulbound.svg"}
                    >
                      <div className={styles.setting_card_description}>
                        In TOP, the soulbound token can only be revoked by its original owner. For more information, please refer to the section on <span>SBT in TOP</span>.
                      </div>
                      {soulBound && (
                        <div className={styles.soulbound_receiver}>
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
                    </SettingCard>


                    {!soulBound && (
                      <SettingCard
                        title="Batch Mint"
                        checkValue={batchMint}
                        setCheck={setBatchMint}
                        checkDisabled={step === 3}
                        icon={"/batch_mint.svg"}
                      >
                        {batchMint && (<div className={styles.div_batch_mint} style={{ marginTop: '15px' }}>
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
                      </SettingCard>
                    )}

                    <SettingCard
                      title="NFT Contract Features"
                      checkValue={false}
                      setCheck={null}
                      checkDisabled={false}
                      icon={"/NftContractFeatures.svg"}
                    >
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
                                      onClick={() => {}}
                                    />
                                  )}
                                  Attribute {index + 1}
                                </div>
                                <div className={styles.div_input}>
                                  <input
                                    style={{ width: '100%' }}
                                    type="text"
                                    value={item.trait}
                                    onChange={(e) => {}}
                                    placeholder={step === 3 ? '' : 'Trait'}
                                    disabled={step === 3}
                                  />
                                  <input
                                    style={{ width: '100px' }}
                                    type="text"
                                    value={item.value}
                                    onChange={(e) => {}}
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
                    </SettingCard>
                  </div>
                </>
              )
            }


          </div>
        </div>
      </div>

      <Modal
        title="Successfully Upgraded"
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
    </>
  )
}

export default Upgrade;
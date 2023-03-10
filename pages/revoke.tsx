import React, { useState } from "react";
import Image from 'next/image'
import styles from '@/styles/Revoke.module.css'
import Layout from '../components/layout'

import { StepCard } from '@/components/StepCard/StepCard'

import { Switch, Checkbox, Modal } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

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
  const [step, setStep] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className={'div_button_wrapper'}>
            {step > 1 && (
              <button className={'button_next'} onClick={() => setStep(step - 1)}>
                Back
                <Image
                  src="/back_arrow.svg"
                  alt="back_arrow"
                  width={24}
                  height={24}
                  priority
                />
              </button>
            )}
            {
              (step === 1 && check) && (
                <button className={'button_next'} onClick={() => setStep(step + 1)}>
                  Next
                  <Image
                    src="/arrow_right.svg"
                    alt="arrow_right"
                    width={24}
                    height={24}
                    priority
                  />
                </button>
              )
            }
            {step === 2 && (
              <button className={'button_revoke_nft'} onClick={() => { setIsModalOpen(true); }}>
                <Image
                  src="/button_revoke_nft.svg"
                  alt="button_revoke_nft"
                  width={24}
                  height={24}
                  priority
                />
                Revoke Selected NFT
              </button>
            )}
          </div>
        </div>

        <div className={'layer1_div'}>
          <div className={'div_left'}>
            {stepArray.map(item => <StepCard key={item.index} {...item} step={step} />)}
          </div>

          <div className={'div_right'}>
            <div className={styles.div_step1}>
              {
                step === 1 && (
                  <div className={styles.div_search}>
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
                )
              }

              <div className={styles.div_result}>
                <div
                  className={styles.div_item + ' ' + (check ? styles.checked : '')}
                  onClick={() => { step === 1 && setCheck(!check) }}
                >
                  <Image
                    src={'/Niseko-trail-map.jpg'}
                    alt="result_item"
                    fill
                    priority
                    className={styles.img_item}
                  />
                  <div className={styles.div_footer}>
                    <div className={styles.div_title}>Title.jpg</div>
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
        <div className={'div_button_wrapper' + ' ' + styles.flex_ac_gap}>
          <button className={'button_next'} onClick={() => setIsModalOpen(false)}>
            Confirm
            <Image
              src="/back_arrow.svg"
              alt="back_arrow"
              width={24}
              height={24}
              priority
            />
          </button>
        </div>
      </Modal>
    </Layout>
  )
}
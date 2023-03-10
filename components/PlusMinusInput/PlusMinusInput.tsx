import Image from 'next/image'
import styles from './PlusMinusInput.module.css'

interface IPlusMinusInputParam {
  unitNum: number,
  value: string,
  setValue: Function,
  maxValue: number,
  minValue: number,
  disabled: boolean
}

export const PlusMinusInput = (props: IPlusMinusInputParam) => {
  const {
    unitNum, value, setValue, maxValue, minValue, disabled
  } = props;
  return (
    <div className={styles.div_plus_minus}>
      {!disabled && (
        <>
          <div className={styles.min} onClick={() => setValue(minValue)}>Min</div>
          <div className={styles.minus_multi} onClick={() => {
            if (~~value - unitNum >= minValue) {
              setValue(~~value - unitNum)
            }
          }}>
            <Image
              src={"/icon_minus.svg"}
              alt="icon_minus"
              width={24}
              height={24}
              priority
              className={styles.control_icon}
            />
            {unitNum}
          </div>
        </>
      )}
      <div className={styles.div_input}>
        {!disabled && (<Image
          src={"/icon_minus.svg"}
          alt="icon_minus"
          width={24}
          height={24}
          priority
          className={styles.control_icon}
          onClick={() => {
            if (~~value - 1 >= minValue) {
              setValue(~~value - 1)
            }
          }}
        />)}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            console.log(val)
            if (!isNaN(~~val)) {
              if (~~val >= minValue && ~~val <= maxValue) {
                setValue(~~val);
              }
            }
            if (val === '') {
              setValue(minValue)
            }
          }}
          disabled={disabled}
        />
        {!disabled && (<Image
          src={"/icon_plus.svg"}
          alt="icon_plus"
          width={24}
          height={24}
          priority
          className={styles.control_icon}
          onClick={() => {
            if (~~value < maxValue) {
              setValue(~~value + 1);
            }
          }}
        />)}
      </div>
      {!disabled && (
        <>
          <div className={styles.plus_multi} onClick={() => {
            if ((~~value + unitNum) <= maxValue) {
              setValue(~~value + unitNum);
            }
          }}>
            <Image
              src={"/icon_plus.svg"}
              alt="icon_plus"
              width={24}
              height={24}
              priority
              className={styles.control_icon}
            />
            {unitNum}
          </div>
          <div className={styles.max} onClick={() => setValue(maxValue)}>Max</div>
        </>
      )}
    </div>
  )
}
// export const PlusMinusInput = (data: IPlusMinusInputParam) => {
//   const { unitNum, value, setValue, maxValue, minValue } = data;
//   return ...
// }
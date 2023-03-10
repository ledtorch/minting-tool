
import styles from './StepCard.module.css'

export const StepCard = (
  props: {index: number, title: string, description: string, step: number}
) => {
  const {index, title, description, step} = props;
  
  let sty = styles.card_div;
  if (step === index) {
    sty = styles.card_div + ' ' + styles.card_div_active;
  } else if (step > index) {
    sty = styles.card_div + ' ' + styles.card_div_active_done;
  }
  return (
    <div className={sty}>
      <div className={styles.title}><div>{index}</div>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}
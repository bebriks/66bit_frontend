import styles from './Separator.module.scss'
import separatorIcon from '../../../images/akar-icons_chevron-right.svg'
export const Separator = () => {
    return (
        <img src={separatorIcon} alt=">" className={`${styles.separator_icon}`} />
    )
}

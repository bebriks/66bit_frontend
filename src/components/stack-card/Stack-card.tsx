import styles from './Stack-card.module.scss'
import './../../App.scss'

export const StackCard = ({textData}: {textData: string}) => {
    return (
        <div className={`${styles.stack_card} stack_card_theme`}>
            {textData}
        </div>
    )
}
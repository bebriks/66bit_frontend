import styles from './Picked-filter-card.module.scss'
import '../../../App.scss'

export const PickedFilterCard = ({ text, onRemove }: { text: string, onRemove: () => void }) => {
    return (
        <div className={`${styles.filter_card__container} filter_card__container`} onClick={() => onRemove()}>
            <div className={`${styles.cross} cross`}/>
            {text}
        </div>
    )
}
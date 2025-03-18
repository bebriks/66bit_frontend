import './Picked-filter-card.scss'
import '../../../App.scss'

export const PickedFilterCard = ({ text, onRemove }: { text: string, onRemove: () => void }) => {
    return (
        <div className='filter_card__container' onClick={() => onRemove()}>
            <div className="cross"/>
            {text}
        </div>
    )
}
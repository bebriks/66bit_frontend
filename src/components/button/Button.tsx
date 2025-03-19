import styles from './Button.module.scss'
//import '../../App.scss'

export const Button = ({ textData, onClick }: {textData: string, onClick: () => void}) => {
    return (
        <button className={styles.button} onClick={() => onClick()}>
            <span className={styles.button__text}>{textData}</span>
        </button>
    )
}
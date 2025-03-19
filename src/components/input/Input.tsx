import styles from './Input.module.scss'

interface InputProps {
    onChange: (filterName: string, value: string) => void;
    value: string
}

export const Input = ({ onChange, value }: InputProps ) => {
    return (
        <input type="text" className={styles.input} placeholder='Поиск' defaultValue={value} onChange={(el) => onChange('name', el.target.value)}/>
    )
}
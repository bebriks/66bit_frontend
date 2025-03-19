import { useContext } from 'react'
import styles from './Toggle-switch.module.scss'
import '../../App.scss'
import { configStore } from '../../store'

export const ToggleSwitch = ({ onSwitch }: {onSwitch: React.MouseEventHandler}) => {
    const config = useContext(configStore)
    return ( 
        <label className={styles.checkbox_wrap} onMouseDown={onSwitch}>
            <input type="checkbox" name="checkbox" className={styles.checkbox_inp} checked={config.theme === 'light' ? false : true}/>
            <span className={styles.checkbox_mark}></span>
        </label>
    ) 
}
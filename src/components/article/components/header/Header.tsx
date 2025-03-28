import styles from './Header.module.scss'
import '../../../../App.scss'

import logo from '../../../../images/Логотип 66бит 1.svg'
import { Contacts } from '../../../../constants/articleProps'
import { ToggleSwitch } from '../../../toggle-switch/Toggle-switch'

export const Header = ({ onSwitchTheme }: {onSwitchTheme: React.MouseEventHandler<HTMLDivElement>}) => {
    return (
        <div className={`${styles.header} header`}>
            <div className={styles.header__container}>
                <img src={logo} alt="66 бит" className={styles.logo} />
                <div className={styles.info}>
                    <div className={styles.contacts}>
                        <p className={styles.contact}>{Contacts.number}</p>
                        <p className={styles.contact}>{Contacts.email}</p>
                    </div>
                    <ToggleSwitch onSwitch={onSwitchTheme} />
                </div>
            </div>
        </div>
    )
}
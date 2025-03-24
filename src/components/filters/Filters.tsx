import { Accordion } from '../accordion/Accordion'
import { Technology, Gender, Position } from '../../constants/articleProps'
import styles from './Filters.module.scss'
import '../../App.scss'
import { Input } from '../input/Input'
import { EmployeeStore } from '../../store/store_staff/store'
import { observer } from 'mobx-react-lite'

export const Filters = observer((employeeConfig : EmployeeStore) => {
    return (
        <div className={styles.filters}>
            <h1 className={styles.label}>Список сотрудников</h1>
            <div className={styles.accordions}>
                {Accordion(Technology)}
                {Accordion(Gender)}
                {Accordion(Position)}
            </div>
            <Input onChange={employeeConfig.setFilter} value={employeeConfig.nameFilter}/>
        </div>
    )
})
import { Accordion } from '../accordion/Accordion'
import { Technology, Gender, Position } from '../../constants/articleProps'
import './Filters.scss'
import '../../App.scss'
import { Input } from '../input/Input'
import { EmployeeStore } from '../../store/store_staff/store'

export const Filters = (employeeConfig : EmployeeStore) => {
    return (
        <div className='filters'>
            <h1 className='label'>Список сотрудников</h1>
            <div className='accordions'>
                {Accordion(Technology)}
                {Accordion(Gender)}
                {Accordion(Position)}
            </div>
            <Input onChange={employeeConfig.setFilter} value={employeeConfig.nameFilter}/>
        </div>

    )
}
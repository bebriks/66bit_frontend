import styles from './Employee-item-table.module.scss'
import '../../App.scss'
import { IEmployee } from '../../api/types/types'
import { dateFormaterToDDMMYYYY, phoneFormater } from '../../utils/utils'
import { NavLink } from 'react-router-dom'

interface EmployeeItemTableProps {
    data: IEmployee;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const EmployeeItemTable = ({ data, onClick }: EmployeeItemTableProps) => {
    return (
        <div className={`${styles.employee_item_container} employee_item_container`}>
            <NavLink to={`/employee/${data?.id}`}>
                <div className={`${styles.employee_item_content} employee_item_content`} onClick={onClick}>
                    <p className={styles.employee_item_container__name}>{data?.name}</p>
                    <p className={styles.employee_item_container__position}>{data?.position}</p>
                    <p className={styles.employee_item_container__phone}>{phoneFormater(data!.phone)}</p>
                    <p className={styles.employee_item_container__birthdate}>{dateFormaterToDDMMYYYY(data!.birthdate)}</p>
                </div>
            </NavLink>
        </div>
    )
}
export default EmployeeItemTable
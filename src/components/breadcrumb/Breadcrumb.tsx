import styles from './Breadcrumb.module.scss'

import { Link, NavigateFunction, useLocation } from 'react-router-dom'
import { Separator } from './separator/Separator'
import { useContext } from 'react'
import { employeeStore } from '../../store'

export const Breadcrumb = ({ onNavigate }: { onNavigate: NavigateFunction }) => {
    const location = useLocation()
    const employee = useContext(employeeStore)

    const isEmployeePage = location.pathname.startsWith('/employee/')

    return (
        <div className={styles.breadcrumbs}>
            <div className={`${styles.breadcrumb_link} ${ isEmployeePage ? styles.breadcrumb_hide : '' } ${styles.breadcrumb_container}`}>
                <Link to="/" className={styles.breadcrumb_link} onClick={() => onNavigate(-1)}>Главная</Link>
                <Separator />
            </div>
            <Link to="/" className={styles.breadcrumb_link} onClick={() => onNavigate(-1)}>Список сотрудников</Link>

            {isEmployeePage && employee.currentEmployee?.name && (
                <>
                    <Separator />
                    <Link to={`/employee/${employee.currentEmployee.id}`} className={`${styles.breadcrumb_link} ${styles.breadcrumb_dynamic_link}`}>
                        {employee.currentEmployee.name}
                    </Link>
                </>
            )}
        </div>
    )
}
import '../../App.scss'
import styles from './Employee-list.module.scss'
import { Filters } from '../../components/filters/Filters'
import { Main } from '../../components/article/components/main/Main'
import React, { Suspense, useContext, useEffect } from 'react'
import { employeeStore } from '../../store'
import { debounce } from 'lodash'
import { Loading } from '../../components/loading/Loading'
import { observer } from 'mobx-react-lite'
import { PickedFilters } from '../../components/filters/picked-filters-field/Picked-filters'

const EmployeeItemTable = React.lazy(() => import('../../components/employee-item-table/Employee-item-table'))

export const EmployeeList = observer(({ onNavigate }: { onNavigate: (to: string) => void }) => {
    const employeeConfig = useContext(employeeStore)

    const handleVerticalScroll = debounce(() => {
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10
        if (isAtBottom && !employeeConfig.isLoading && !employeeConfig.isEndList) {
            employeeConfig.loadEmployeesList()
        }
    }, 100)

    useEffect(() => {
        employeeConfig.setRouterContext(onNavigate)
    },[onNavigate])

    useEffect(() => {
        window.addEventListener('scroll', handleVerticalScroll)
        employeeConfig.loadEmployeesList()
        return () => {
            window.removeEventListener('scroll', handleVerticalScroll)
            handleVerticalScroll.cancel()
        }
    }, [window.location.search, employeeConfig.employeesList, employeeConfig.genderFilters, employeeConfig.positionFilters, employeeConfig.stackFilters])

    return (
        <Main>
            <Filters {...employeeConfig} />
            <PickedFilters />
            <div className={styles.custom_scroll} onScroll={() => handleVerticalScroll()}>
                <div className={styles.table}>
                    <div className={styles.grid__header}>
                        <p>ФИО</p>
                        <p>Должность</p>
                        <p>Телефон</p>
                        <p>Дата рождения</p>
                    </div>
                    <Suspense fallback={<Loading />}>
                        {employeeConfig.employeesList.map((el) => (
                            <EmployeeItemTable key={el?.id} data={el} onClick={() => employeeConfig.pickEmployee(el)} />
                        ))}
                        {employeeConfig.isLoading && <Loading />}
                        {employeeConfig.employeesList.length === 0 && !employeeConfig.isLoading && (
                            <div className={styles.not_found}>Сотрудники не найдены.</div>
                        )}
                    </Suspense>
                </div>
            </div>
        </Main>
    )
})
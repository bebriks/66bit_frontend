import styles from './Picked-filters.module.scss'
import '../../../App.scss'

import { Technology, Position, Gender } from '../../../constants/articleProps'
import { PickedFilterCard } from '../picked-filter-card/Picked-filter-card'
import { useContext, useEffect } from 'react'
import { employeeStore } from '../../../store'
import { observer } from 'mobx-react-lite'
import { Button } from '../../button/Button'

export const PickedFilters = observer(() => {
    const employeeStoreConfig = useContext(employeeStore)
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            employeeStoreConfig.dropPage()
            employeeStoreConfig.loadEmployeesList()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])
    
    return (
        <>
            {employeeStoreConfig.getFilters().find((el) => el.length > 0) && (
                <div className={`${styles.picked_filters__container} picked_filters__container`}>
                    <div className={styles.picked_filters__content}>
                        <div className={styles.picked_filters}>
                            <div className={styles.picked_filters__label__container}>
                                <p className={styles.picked_filters__label}>Выбранные фильтры:</p>
                            </div>
                            <div className={styles.all_picked_filters}>
                                {employeeStoreConfig.getFilters().map((arr: string[], index: number) => {
                                    const filterType = index === 0 ? 'Stack' : index === 1 ? 'Gender' : index === 2 ? 'Position' : 'Name'
                                    return arr.map((el) => {
                                        let text = ''
                                        switch(filterType) {
                                        case 'Stack':
                                            text = Technology.data[0][Technology.data[1].findIndex((val) => val === el)]
                                            break
                                        case 'Gender':
                                            text = Gender.data[0][Gender.data[1].findIndex((val) => val === el)]
                                            break
                                        case 'Position':
                                            text = Position.data[0][Position.data[1].findIndex((val) => val === el)]
                                            break
                                        default:
                                            console.log('dsadsads')
                                            return
                                        }
                                        return <PickedFilterCard
                                            key={`${filterType}-${el}`}
                                            text={text}
                                            onRemove={() => employeeStoreConfig.resetFilters(filterType, el)}
                                        />
                                    })
                                })}
                            </div>
                        </div>
                        <Button textData={'Найти'} onClick={() => {
                            employeeStoreConfig.dropPage()
                            employeeStoreConfig.loadEmployeesList()
                        }}/>
                    </div>
                </div>
            )}
        </>
    )
})
import './Picked-filters.scss'
import '../../../App.scss'

import { Position, Gender } from '../../../constants/articleProps'
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
        <div className='picked_filters__container'>
            <div className='picked_filters__content'>
                <div className='picked_filters'>
                    <div className="picked_filters__label__container">
                        <p className='picked_filters__label'>Выбранные фильтры:</p>
                    </div>
                    <div className='all_picked_filters'>
                        {employeeStoreConfig.getFilters().map((arr: string[], index: number) => {
                            const filterType = index === 0 ? 'Stack' : index === 1 ? 'Gender' : index === 2 ? 'Position' : 'Name';
                            /* let text = ''
                            switch(filterType) {
                                case 'Stack':
                                    text =

                            } */
                            return arr.map((el) => {
                                let text = ''
                                switch(filterType) {
                                    case 'Stack':
                                        text = el
                                        break
                                    case 'Gender':
                                        text = Gender.data[0][Gender.data[1].findIndex((val) => val === el)]
                                        break
                                    case 'Position':
                                        text = Position.data[0][Position.data[1].findIndex((val) => val === el)]
                                        break
                                    default:
                                        text = ''

                                }
                                return <PickedFilterCard
                                    key={`${filterType}-${el}`}
                                    text={text}
                                    //filterName={filterType}
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
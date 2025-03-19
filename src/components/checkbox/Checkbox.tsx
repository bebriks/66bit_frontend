import { useContext, useEffect, useState } from 'react'
import './Checkbox.scss'
import { employeeStore } from '../../store'
import { observer } from 'mobx-react-lite'

export const Checkbox = observer(({ filterName, value }: {filterName: string, value: string | string[]}) => {
    const employeeStoreConfig = useContext(employeeStore)
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        if (filterName === 'Stack') {
            setIsChecked(employeeStoreConfig.stackFilters.includes(value as string))
        } else if (filterName === 'Position') {
            setIsChecked(employeeStoreConfig.positionFilters.includes(value as string))
        } else if (filterName === 'Gender') {
            setIsChecked(employeeStoreConfig.genderFilters.includes(value as string))
        }
    }, [employeeStoreConfig.stackFilters, employeeStoreConfig.positionFilters, employeeStoreConfig.genderFilters])

    const handleCheckboxChange = () => {
        if (isChecked) {
            employeeStoreConfig.resetFilters(filterName, value as string)
        } else {
            employeeStoreConfig.setFilter(filterName, value as string)
        }
        setIsChecked(!isChecked)
    }

    return (
        <label className='checkbox__label' htmlFor="" onClick={handleCheckboxChange}>
            <input
                type="checkbox"
                className='checkbox'
                checked={isChecked}
                onChange={() => {}}
            />
            <span className='checkmark'></span>
        </label>
    )
})
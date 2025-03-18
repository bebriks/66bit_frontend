import { useContext } from 'react'
import './Toggle-switch.scss'
import '../../App.scss'
import { configStore } from '../../store'

export const ToggleSwitch = ({ onSwitch }: {onSwitch: React.MouseEventHandler}) => {
    const config = useContext(configStore)
    return ( 
        <label className='checkbox_wrap' onMouseDown={onSwitch}>
			<input type="checkbox" name="checkbox" className='checkbox_inp' checked={config.theme === 'light' ? false : true}/>
			<span className='checkbox_mark'></span>
		</label>
    ) 
}
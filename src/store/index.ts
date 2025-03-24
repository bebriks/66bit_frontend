import { createContext } from 'react'

import { ConfigStore } from './store_config/store'
import { EmployeeStore } from './store_staff/store'

export const configStore = createContext(new ConfigStore())
export const employeeStore = createContext(new EmployeeStore())
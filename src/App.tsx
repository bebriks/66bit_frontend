import { useContext } from 'react'
import './App.scss'
import { Header } from './components/article/components/header/Header'
import { Route, Routes, useNavigate } from 'react-router'
import { configStore, employeeStore } from './store'
import { observer } from 'mobx-react-lite'
import { EmployeePage } from './pages/employee-page/Employee-page'
import { Breadcrumb } from './components/breadcrumb/Breadcrumb'
import { EmployeeList } from './pages/employee-list/Employee-list'
import { NotFound } from './pages/not-found/Not-found'

const App = observer(() => {
    const navigate = useNavigate()

    const employeeConfig = useContext(employeeStore)
    const appConfig = useContext(configStore)

    return (
        <div className={`${appConfig.theme}`}>
            <Header onSwitchTheme={() => appConfig.changeTheme()} />
            <Breadcrumb onNavigate={navigate} />
            <Routes>
                <Route path={'/'} element={<EmployeeList onNavigate={navigate} />}  />
                <Route path={'/employee/:id'} element={<EmployeePage data={employeeConfig.currentEmployee} />} />
                <Route path={'*'} element={<NotFound />} />
            </Routes>
        </div>
    )
})

export default App
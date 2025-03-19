import { autorun, configure, makeAutoObservable } from 'mobx'
import { IEmployee } from '../../api/types/types'
import { GETEmployees } from '../../api/api'

configure({ enforceActions: 'always' })

export class EmployeeStore {
    currentEmployee: IEmployee | null = null
    employeesList: IEmployee[] = []
    isEndList: boolean = false
    page: number = 1
    isLoading: boolean = false

    stackFilters: string[] = []
    genderFilters: string[] = []
    positionFilters: string[] = []
    nameFilter: string = ''

    constructor() {
        this.load()
        this.loadFilters()

        autorun(() => this.save())
        autorun(() => this.saveFilters())

        makeAutoObservable(this)
    }

    saveFilters = () => {
        localStorage.setItem(
            'FilterStore',
            JSON.stringify({
                stackFilters: this.stackFilters,
                genderFilters: this.genderFilters,
                positionFilters: this.positionFilters,
                nameFilter: this.nameFilter,
            })
        )
    }

    loadFilters = () => {
        const data = localStorage.getItem('FilterStore')
        if (data) {
            const parsedData = JSON.parse(data)
            this.stackFilters = parsedData.stackFilters || []
            this.genderFilters = parsedData.genderFilters || []
            this.positionFilters = parsedData.positionFilters || []
            this.nameFilter = parsedData.nameFilter || ''
        }
    }

    setFilter = (filterName: string, value: string) => {
        if(filterName === 'Stack') {
            this.stackFilters.push(value)
        } else if (filterName === 'Position') {
            this.positionFilters.push(value)
        } else if(filterName === 'Gender') {
            this.genderFilters.push(value)
        } else {
            this.nameFilter = value
        }
        this.saveFilters()
    }

    resetFilters = (filterName: string, value: string) => {
        if(filterName === 'Stack') {
            this.stackFilters = this.stackFilters.filter((el) => el !== value)
        } else if (filterName === 'Position') {
            this.positionFilters = this.positionFilters.filter((el) => el !== value)
        } else if(filterName === 'Gender') {
            this.genderFilters = this.genderFilters.filter((el) => el !== value)
        } else {
            this.nameFilter = value
        }
        this.saveFilters()
        if(this.getFilters().find((el) => el.length > 0) === undefined) {
            this.dropPage()
            this.loadEmployeesList()
        }
    }

    getFilters = () => {
        return [this.stackFilters, this.genderFilters, this.positionFilters]
    }

    save = () => {
        window.localStorage.setItem(
            EmployeeStore.name,
            JSON.stringify({
                currentEmployee: this.currentEmployee,
            })
        )
    }

    load = () => {
        const data = window.localStorage.getItem(EmployeeStore.name)
        if (data) {
            Object.assign(this, JSON.parse(data))
        }
    }

    dropPage = () => {
        this.page = 1
        this.employeesList = []
        this.isEndList = false
    }

    loadEmployeesList = async () => {
        if (this.isEndList === true) return
        if (this.isLoading) return

        this.isLoading = true
        try {
            const data: IEmployee[] = await GETEmployees(this.page, 10, this.nameFilter, this.genderFilters, this.positionFilters, this.stackFilters)
            if (Array.isArray(data) && data.length > 0) {
                const newEmployees = data.filter(
                    (newEmployee) => !this.employeesList.some((existingEmployee) => existingEmployee?.id === newEmployee?.id)
                )
                this.employeesList.push(...newEmployees)
                this.page++
            } else {
                console.error('Полученные данные не являются массивом или пусты:', data)
                this.isEndList = true
            }
        } catch (error) {
            console.error('Ошибка при загрузке списка сотрудников:', error)
        } finally {
            this.isLoading = false
        }
        return
    }

    pickEmployee = (currentEmployee: IEmployee) => {
        this.currentEmployee = currentEmployee
        this.save()
    }

    unpickEmployee = () => {
        window.localStorage.removeItem(EmployeeStore.name)
    }
}
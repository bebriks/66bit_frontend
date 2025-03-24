import { autorun, configure, makeAutoObservable, reaction } from 'mobx'
import { IEmployee } from '../../api/types/types'
import { GETEmployees, GETEmployeeById } from '../../api/api'

configure({ enforceActions: 'never' })

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

    navigate!: (to: string, options?: { replace?: boolean }) => void

    constructor() {
        this.load()
        this.loadFiltersFromURL()
        this.loadEmployeeFromURL()

        autorun(() => this.save())
        autorun(() => this.saveFilters())

        reaction(
            () => this.getQueryParamsFromURL(),
            (queryParams) => {
                this.updateFiltersFromQueryParams(queryParams)
                this.updateURLFromQueryParams(queryParams)
            }
        )

        makeAutoObservable(this)
    }

    setRouterContext = (navigate: (to: string, options?: { replace?: boolean }) => void) => {
        this.navigate = navigate
        this.loadFiltersFromURL()
    }

    loadFiltersFromURL = () => {
        const queryParamsFromURL = this.getQueryParamsFromURL()
        this.updateURLFromQueryParams(queryParamsFromURL)
        this.updateFiltersFromQueryParams(queryParamsFromURL)
    }

    getQueryParamsFromURL = () => {
        const searchParams = new URLSearchParams(window.location.search)
        const queryParams: { [key: string]: string[] } = {}

        searchParams.forEach((value, key) => {
            if (queryParams[key]) {
                queryParams[key].push(value)
            } else {
                queryParams[key] = [value]
            }
        })

        return queryParams
    }

    updateURLFromQueryParams = (queryParams: { [key: string]: string[] }) => {
        if (!this.navigate) {
            console.warn('Функция navigate не была инициализирована. URL адресс не обновлен.')
            return
        }
        const searchParams = new URLSearchParams()

        Object.entries(queryParams).forEach(([key, values]) => {
            const nonEmptyValues = values.filter(value => value.trim() !== '')
            if (nonEmptyValues.length > 0) {
                searchParams.delete(key)
                nonEmptyValues.forEach((value) => searchParams.append(key, value))
            }
        })

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`
        this.navigate(newUrl, { replace: true })
    }

    updateFiltersFromQueryParams = (queryParams: { [key: string]: string[] }) => {
        this.stackFilters = queryParams.stack || []
        this.genderFilters = queryParams.gender || []
        this.positionFilters = queryParams.position || []
        this.nameFilter = queryParams.name ? queryParams.name[0] : ''
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
            this.nameFilter = parsedData.nameFilter || null
        }
    }

    setFilter = (filterName: string, value: string) => {
        const queryParams = this.getQueryParamsFromURL()

        if (filterName === 'Stack') {
            if (!queryParams.stack || !queryParams.stack.includes(value)) {
                queryParams.stack = [...(queryParams.stack || []), value]
            }
        } else if (filterName === 'Position') {
            if (!queryParams.position || !queryParams.position.includes(value)) {
                queryParams.position = [...(queryParams.position || []), value]
            }
        } else if (filterName === 'Gender') {
            if (!queryParams.gender || !queryParams.gender.includes(value)) {
                queryParams.gender = [...(queryParams.gender || []), value]
            }
        } else {
            queryParams.name = [value]
            this.dropPage()
            this.loadEmployeesList()
        }
        this.updateURLFromQueryParams(queryParams)
        this.loadFiltersFromURL()
    }

    resetFilters = (filterName: string, value: string) => {
        const queryParams = this.getQueryParamsFromURL()

        if (filterName === 'Stack') {
            queryParams.stack = (queryParams.stack || []).filter((el) => el !== value)
        } else if (filterName === 'Position') {
            queryParams.position = (queryParams.position || []).filter((el) => el !== value)
        } else if (filterName === 'Gender') {
            queryParams.gender = (queryParams.gender || []).filter((el) => el !== value)
        } else {
            queryParams.name = [value]
        }

        this.updateURLFromQueryParams(queryParams)
        this.loadFiltersFromURL()

        if (this.getFilters().find((el) => el.length > 0) === undefined) {
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
            const data: IEmployee[] = await GETEmployees(
                this.page,
                10,
                this.nameFilter,
                this.genderFilters,
                this.positionFilters,
                this.stackFilters
            )
            if (Array.isArray(data) && data.length > 0) {
                const newEmployees = data.filter(
                    (newEmployee) =>
                        !this.employeesList.some((existingEmployee) => existingEmployee?.id === newEmployee?.id)
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

    loadEmployeeFromURL = () => {
        const pathParts = window.location.pathname.split('/')
        const employeeId = pathParts[pathParts.length - 1]
        
        if (employeeId && !isNaN(Number(employeeId))) {
            this.loadEmployeeById(Number(employeeId))
        }
    }

    loadEmployeeById = async (id: number) => {
        try {
            const data: IEmployee = await GETEmployeeById(id)
            this.currentEmployee = data
            this.save()
        } catch (error) {
            console.error('Ошибка при загрузке сотрудника:', error)
        }
    }

    pickEmployee = async (currentEmployee: IEmployee) => {
        try {
            const data: IEmployee = await GETEmployeeById(currentEmployee!.id)
            this.currentEmployee = data
            this.save()
        } catch (error) {
            console.log(error)
        }
    }

    unpickEmployee = () => {
        this.currentEmployee = null
        window.localStorage.removeItem(EmployeeStore.name)
        
        if (this.navigate) {
            this.navigate('/employees', {
                replace: true
            })
        }
    }
}
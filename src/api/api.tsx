import axios from 'axios'
import qs from 'qs'
interface EmployeeParams {
    page: number
    count: number
    name?: string
    gender?: string[]
    position?: string[]
    stack?: string[]
}

export const GETEmployees = async (
    page: number,
    count: number,
    name?: string,
    gender?: string[],
    position?: string[],
    stack?: string[]
) => {
    try {
        const params: EmployeeParams = {
            page,
            count,
            name,
            gender,
            position,
            stack
        }

        const queryString = qs.stringify(params, { arrayFormat: 'repeat' })

        const response = await axios.get(`${import.meta.env.VITE_SERVER_API}?${queryString}`)

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const GETEmployeeById = async (id: number) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/${id}`)

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}
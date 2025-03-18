import axios from 'axios';
import qs from 'qs'

export const GETEmployees = async (
    page: number,
    count: number,
    name?: string,
    gender?: string[],
    position?: string[],
    stack?: string[]
) => {
    try {
        const params: Record<string, any> = {
            page,
            count,
            name,
            gender,
            position,
            stack
        };

        const queryString = qs.stringify(params, { arrayFormat: 'repeat' });

        const response = await axios.get(`https://frontend-test-api.stk8s.66bit.ru/api/Employee?${queryString}`);

        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        alert(error);
    }
};
const monthMapping: { [key: string]: number } = {
    'января': 1, 'февраля': 2, 'марта': 3, 'апреля': 4,
    'мая': 5, 'июня': 6, 'июля': 7, 'августа': 8,
    'сентября': 9, 'октября': 10, 'ноября': 11, 'декабря': 12
}

export const dateFormaterToDDMMYYYY = (date: string) => {
    const [day, monthRu, year] = date.split(' ')

    const month = monthMapping[monthRu]

    const dateObj = new Date(Number(year), month - 1, Number(day))

    const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${dateObj.getFullYear()}`

    return formattedDate
}

export const phoneFormater = (phone: string) => {
    return phone.replace('(', '').replace(')', '')
}
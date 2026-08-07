export const useSortData = () => {
    const sortByPrice = (a, b) => Number(a.price) - Number(b.price)

    const filterByCompany = (aircraft, company) => aircraft.company === company

    return { sortByPrice, filterByCompany }
}

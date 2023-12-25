export const useSortData = () => {
    const sortPriceLength = (a, b) => {
        return a.price.length - b.price.length
    }

    const sortPrice = (a, b) => {
        return a.price - b.price
    }

    const filterCompany = (aircraft, company) => {
        return aircraft.company === company
    }
    
    return { sortPriceLength, sortPrice, filterCompany }
}
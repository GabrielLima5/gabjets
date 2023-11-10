export const useCapitalizeString = () => {
    const capitalizeString = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1) 
    }

    return { capitalizeString }
}
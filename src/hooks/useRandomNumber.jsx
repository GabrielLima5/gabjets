export const useRandomNumber = () => {
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const finalNumber = Math.floor(Math.random() * (max - min) + min)
        return finalNumber
    }

    return { getRandomInt }
}
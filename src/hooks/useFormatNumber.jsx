export const useFormatNumber = () => {
    const formatToMoney = (n) => {
        return `${n.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`.replace('R$', '')
    }

    return { formatToMoney }
}
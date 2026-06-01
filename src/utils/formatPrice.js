

export const formatPrice = (value) => {
    const parts = new Intl.NumberFormat('pt-BR', {
            style: 'currency', 
            currency: 'BRL',
        }).formatToParts(value);

        return {
            symbol: parts.find(part => part.type === 'currency')?.value || 'R$',
            inteiro: parts
                .filter(part => part.type === 'integer' || part.type === 'group')
                .map(part => part.value)
                .join(''), 
            separator: parts.find(part => part.type === 'decimal')?.value || ',',
            decimal: parts.find(part => part.type === 'fraction')?.value || '00',
        };
};
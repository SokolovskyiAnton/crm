export default function currencyFilter(value, currency='UAH') { // фильтр валют
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency
    }).format(value)
}
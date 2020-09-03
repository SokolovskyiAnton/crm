import store from '../store'
export default function dateFilter(value) { // фильтр времени в навбаре
    const options = {
        day: '2-digit',
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }
    const locale = store.getters.info.locale
    return Intl.DateTimeFormat(locale, options).format(new Date(value))
}
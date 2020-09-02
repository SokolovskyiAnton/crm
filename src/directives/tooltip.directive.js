export default { // создание всплыающего сообщения при наведении с помощью дерективы
    bind(el, {value}) {
        M.Tooltip.init(el, {html: value})
    },

    unbind(el) {  // утечка памяти
        const tooltip = M.Tooltip.getInstance(el); 

        if (tooltip && tooltip.destroy) {
            tooltip.destroy()
        }
    }
}
import _ from 'lodash' // библиотека с удобными функциями 
// мексин для пагинцаии страниц
export default {
    data() {
        return {
            page: +this.$route.query.page || 1,
            pageSize: 5,
            pageCount: 0,
            allItems: [],
            items: []
        }
    },
    methods: {
        pageChangeHandler(page) {
            this.$router.push(`${this.$route.path}?page=${page}`) // добавление query параметра для страницы
            this.items = this.allItems[page - 1] || this.allItems[0]
        },
        setupPagination(allItems) {
            this.allItems = _.chunk(allItems, this.pageSize) // разбивка массива на несколько массивов с помощщью второго параметра
            this.pageCount = _.size(this.allItems) 
            this.items = this.allItems[this.page - 1] || this.allItems[0]
        }
    }
}
export default {
  state: {
    pages: [
      {
        img: '',
        mobileImg: '',
        name: '',
        desc: ''
      }
    ],
    current: 0
  },
  getters: {
    pageCount: ({pages}) => pages,
    currentCount: ({current, pages}) => pages.lenght ? pages[current] + 1 : 0,
    current: ({current, pages}) => pages.length ? pages[current] : null
  },
  actions: {
    setPage() {
    }
  },
  mutations: {}
}

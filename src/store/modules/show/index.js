const types = {
  SET_CURRENT: 'SET_CURRENT'
};

export default {
  namespaced: true,
  state: {
    pages: [
      {
        img: '/imgs/m-1.jpg',
        mobileImg: '/imgs/m-1-sm.jpg',
        name: 'Luxury apartments<br/> in the mountains',
        desc: 'Sample description'
      },
      {
        img: '/imgs/m-2.jpg',
        mobileImg: '/imgs/m-2-sm.jpg',
        name: 'Simple and elegant<br/> penthouse',
        desc: 'Sample description'
      },
      {
        img: '/imgs/m-3.jpg',
        mobileImg: '/imgs/m-3-sm.jpg',
        name: 'Warm & open mansion<br/> by the sea',
        desc: 'Sample description'
      },
      {
        img: '/imgs/m-4.jpg',
        mobileImg: '/imgs/m-4-sm.jpg',
        name: 'Among wildlife<br/> in the savanna',
        desc: 'Sample description'
      },
      {
        img: '/imgs/m-5.jpg',
        mobileImg: '/imgs/m-5-sm.jpg',
        name: 'On the cliff<br/> by the edge',
        desc: 'Sample description'
      }
    ],
    current: 0
  },
  getters: {
    pages: ({pages}) => pages,
    currentIx: ({current}) => current,
    pageCount: ({pages}) => pages.length,
    currentNum: ({current}) => current + 1,
    current: ({current, pages}) => pages.length ? pages[current] : null
  },
  actions: {
    setPage({commit}, index) {
      commit(types.SET_CURRENT, index);
    }
  },
  mutations: {
    [types.SET_CURRENT](state, index) {
      state.current = index;
    }
  }
};

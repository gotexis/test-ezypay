const demo = {
  namespaced: true,
  state: {
    carList: [],
  },
  mutations: {
    SEARCH(state, value) {
      state.carList = value;
    },
  },
  actions: {
    search({ commit }, value) {
      commit('SEARCH', value);
    },
  },
  getters: {
    getCarList: state => state.carList.filter(x => !!x.stock_item_id),
  },
};

export default demo;

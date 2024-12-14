import { createStore } from 'vuex';

interface State {
  count: number;
}

const store = createStore<State>({
  state: {
    count: 0,
  },
  mutations: {
    increment(state: State) {
      state.count++;
    },
  },
  actions: {
    incrementAsync({ commit }: { commit: Function }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
  },
});

export default store;

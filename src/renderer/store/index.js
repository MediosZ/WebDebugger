import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
      count: 0,
      conns: [],
      detail_idx: 0,
    },
    getters:{
      getCount: (state) => {
        return state.count * 2
      },
      getConns: (state) => {
        return state.conns
      },
      getFirstConn: (state) => {
        return state.conns[0]
      },
      getIndex: (state) => {
        return state.detail_idx
      }
    }, 
    mutations: {
      increment (state, payload) {
        state.count += payload
      },
      pushConns(state, payload) {
          state.conns.push(payload)
          state.conns = state.conns.reverse()
      },
      popConns(state, idx){
          state.conns.splice(idx, 1)
      },
      changeDetailIndex(state, payload){
        state.detail_idx = payload
      },
      restore(state, conns){
        state.conns = conns
      }
    }
  })
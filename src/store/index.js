import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: JSON.parse(localStorage.getItem('notes') || '[]')
  },
  mutations: {
    createNote(state, note) {
      state.notes.push(note)

      localStorage.setItem('notes', JSON.stringify(state.notes))
    }
  },
  actions: {
    createNote(state, note) {
      this.commit('createNote',note)
    },
  },
  getters: {
    notes: s => s.notes
  }
})

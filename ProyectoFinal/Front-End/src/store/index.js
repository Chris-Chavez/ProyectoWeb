import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Categorias:[],
    Personal:[],
    Tickets:[],
    loading: false,
  },
  mutations: {
    SET_CATEGORIAS(state, Categorias) {
      state.Categorias = Categorias
    },
    SET_PERSONAL(state, Personal) {
      state.Personal = Personal
    },
    SET_TICKETS(state, Tickets) {
      state.Tickets = Tickets
    },
    SET_LOADING(state, load) {
      state.loading = load
    }
  },
  actions: {
    setCategorias({commit}){
      commit('SET_LOADING', true)
      axios.get('http://localhost:3000/Categorias')
      .then( response => {
        commit('SET_CATEGORIAS', response.data)
      })
      .finally(() => commit('SET_LOADING', false))
    },
    insertCategoria({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/Agregar-Categorias', params)
      .then(onComplete)
      .catch(onError)
    },
    updateCategoria({commit}, {id ,params, onComplete, onError}) {
      axios.put(`http://localhost:3000/Editar-Categoria/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    deleteCategoria({commit}, {id, onComplete, onError}) {
      axios.delete(`http://localhost:3000/Eliminar-Categoria/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    setPersonal({commit}){
      commit('SET_LOADING', true)
      axios.get('http://localhost:3000/Personal')
      .then( response => {
        commit('SET_PERSONAL', response.data)
      })
      .finally(() => commit('SET_LOADING', false))
    },
    insertPersonal({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/Agregar-Personal', params)
      .then(onComplete)
      .catch(onError)
    },
    updatePersonal({commit}, {id ,params, onComplete, onError}) {
      axios.put(`http://localhost:3000/Editar-Personal/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    deletePersonal({commit}, {id, onComplete, onError}) {
      axios.delete(`http://localhost:3000/Eliminar-Personal/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    setTickets({commit}){
      commit('SET_LOADING', true)
      axios.get('http://localhost:3000/Tickets')
      .then( response => {
        commit('SET_TICKETS', response.data)
      })
      .finally(() => commit('SET_LOADING', false))
    },
    insertTicket({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/Agregar-Ticket', params)
      .then(onComplete)
      .catch(onError)
    },
    updateTicket({commit}, {id ,params, onComplete, onError}) {
      axios.put(`http://localhost:3000/Editar-Ticket/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    updateEstatus({commit}, {id ,params, onComplete, onError}) {
      axios.put(`http://localhost:3000/Editar-Ticket-Estatus/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    deleteTicket({commit}, {id, onComplete, onError}) {
      axios.delete(`http://localhost:3000/Eliminar-Tickets/${id}`)
      .then(onComplete)
      .catch(onError)
    },
  },
  getters: {
    allCategorias: state => {
      return state.Categorias
    },
    allPersonal: state => {
      return state.Personal
    },
    allTickets: state => {
      return state.Tickets
    },
    getLoading: state => {
      return state.loading
    }
  },
  modules:{

  }
})
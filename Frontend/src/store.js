import { createStore } from 'vuex'
import exampleData from './exampleData'
import { set } from '@vueuse/core'

const store = createStore({
  state () {
    return {
      count: 0,
      isLoggedIn: false,
      exampleData: exampleData,
      eventFormPopup: false,
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    loggedInStatus (state) {
      state.isLoggedIn = !this.isLoggedIn
    },
    toggleEventsForm (state) {
      state.eventFormPopup = !state.eventFormPopup
    }, 
  },
  actions: {
      increment (context) {
        context.commit('increment')
      },
      loggedInStatus (context) {
        context.commit('loggedInStatus')
      },
      toggleEventsForm (context) {       // add dispatch to eventForm component
        context.commit('toggleEventsForm')
      }
    }
})

export default store
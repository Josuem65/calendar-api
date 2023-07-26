<template>
  <div className="nav">
    <RouterLink to="/year">Year</RouterLink> 
    <RouterLink to="/month">Month</RouterLink>
    <RouterLink to="/week">Week</RouterLink>
    <RouterLink :to="'/day/'+ `${currentDate}`">Day</RouterLink>
    <h3 @click="handleEventsForm" class="addEventsClick">Add Event</h3>
  </div>
</template>

<script>
import store from '../store.js'
import { RouterLink } from 'vue-router'

export default {
   name: 'Nav',
   data() {
      return {
        store,
        currentDate: new Date(),
      }
    },
    methods: {
      handleEventsForm: function() {
        this.store.dispatch('toggleEventsForm')
        console.log(this.store.state.eventFormPopup)
      }
    },
    created() {
    },
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  color: rgb(70, 70, 70);
}
.nav {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: 1px solid gray;
  flex-grow: 1;
}

.addEventsClick:hover {
  display: block;
  cursor: pointer;
}
</style>
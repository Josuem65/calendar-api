
<template>
  <div className="mainDiv">
    <Nav />
    <EventsForm />
    <RouterView />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { RouterView } from 'vue-router'
import Login from './components/Login.vue'
import EventsForm from './components/EventsForm.vue'
import Day from './components/Day.vue'
import Week from './components/Week.vue'
import Month from './components/Month.vue'
import Year from './components/Year.vue'
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Login,
    EventsForm,
    Year,
    Month,
    Week,
    Day,
    RouterView
  },
  data() {
    return {
      onLoad: true,
    }
  },
  created() {
  }
}
</script>

<style>  
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.mainDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
}
</style>
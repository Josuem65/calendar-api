<template>
  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
</template>
  /*prev and next button div class:fc-button-group,
   individual class="fc-button" */

<script>
import router from '../router'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import store from '../store.js'


export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        //property path: currentData.calendarOptions
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        buttonText: {today: "Today's Month"},
        events: [],
        editable: true,
        selectable: true,
      },
      store,
      selectedDate: '',
      router: router,
    }
  },
  methods: {
    handleDateClick: function(arg) {
      this.selectedDate = arg.date
      this.router.push({path: '/day/' + this.selectedDate})
      // let calendarApi = this.$refs.fullCalendar.getApi()
      // console.log(calendarApi, calendarApi.currentDataManager.currentCalendarOptionsInput.buttonText) //this is the calendar API
    },
  },
  created() {
  }

}
</script>

<style>
.fc {
  flex-grow: 6;
}
</style>
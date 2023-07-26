<template>
  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
</template>
  //prev and next button div class:fc-button-group,
   individual class="fc-button" */

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        //property path: currentData.calendarOptions
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridWeek',
        dateClick: this.handleDateClick,
        buttonText: {today: "Today's Month"},
        events: [
        ],
        // currentCalendarOptionsInput: {
        //   //property path: currentDataManager.currentCalendarOptionsInput.buttonText
        
        // }
      }
    }
  },
  methods: {
    handleDateClick: function(arg) {
      let calendarApi = this.$refs.fullCalendar.getApi()
      console.log(calendarApi, calendarApi.currentDataManager.currentCalendarOptionsInput.buttonText) //this is the calendar API
    }
  },
}
</script>
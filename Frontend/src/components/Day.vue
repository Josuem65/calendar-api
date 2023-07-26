<template>
    <div class="dayComponent">
        <div class="dayHeader">
          <h1>{{ dateString }}</h1>
        </div>
        <div class="grid-container">
          <div v-for="(hour, index) in timeLine" :key="index" class="grid-item hour" :style="'grid-row: ' + `${index + 1} ` + '/' + `${index + 2}`">
            <p class="hourText">{{ hour }}</p> 
          </div>
          <div v-for="(event, index) in getAvailableCol" :key="index" class="grid-item event-item" :style="'grid-area : ' + `${event.eventStart[0] + 1}` + ` / ${event.column} /` + `${event.eventEnd[0] + 1};`">
            <div class="eventInfo">
              <p>{{event.eventName}}</p>
              <p>{{`${event.eventStart[0]} - ${event.eventEnd[0]}`}}</p>
              <p>{{event.description}}</p>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios' 
import store from '../store.js'


export default {
  data() {
    return {
        events: [],
        exampleEvents: store.state.exampleData.events,
        timeLine: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm','3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm','11pm','12am'],
        cellOccupancyTracker : [{ rows: [], name: 'events1'}, { rows: [], name: 'events2'}, { rows: [], name: 'events3'}, { rows: [], name: 'events4'}],
   }

  }, 


  setup() {
    const route = useRoute()
    const { date } = route.params
    const dateString = date.toString().slice(0, 15)
    return {
      route,
      date,
      dateString,
    eventsInSelectedDate(date) {
      let userSelectedDate = new Date(date).toISOString().toString().slice(0, 10)//with dates already coming in with user's time zone (submitted this way), we won't need toISOString().
      let eventsInDateArr = [] 
      for( let i = 0; i < this.exampleEvents.length; i++) {
        let currEvent = this.exampleEvents[i]
        let dateFormated = ''
        if(currEvent.startDate === currEvent.endDate) { //if event is only one day
          dateFormated = new Date(currEvent.startDate).toISOString().toString().slice(0, 10)//with dates already coming in with user's time zone (submitted this way), we won't need toISOString(). event.startDate will need to change to event.eventStart
          if(dateFormated === userSelectedDate) {
             eventsInDateArr.push(currEvent)
          }
        } else if(currEvent.startDate !== currEvent.endDate) {//if event has more than 1 day
          let inBetweenDates = this.getDatesInBetween(currEvent)
          let foundDate = inBetweenDates.find((midEvent) => {
            console.log(typeof new Date(midEvent.eventStart).toISOString().toString().slice(0, 10))
            console.log(typeof userSelectedDate)
            return new Date(midEvent.eventStart).toISOString().toString().slice(0, 10) === userSelectedDate
          })
          console.log(foundDate)
          foundDate ? eventsInDateArr.push(foundDate) : null
        }

      }
        console.log('eventsInDateArr: ', eventsInDateArr)
      eventsInDateArr = eventsInDateArr.map((event) => {
          console.log(event.eventStart.getHours())
          let startTime = [event.eventStart.getHours()]
          let endTime = [event.eventEnd.getHours()]
          return {
            ...event, eventStart: startTime, eventEnd: endTime,
          }
        })
        return eventsInDateArr
    },
        //if date is a middle date, make start and end hours 12am !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
    getDatesInBetween(event) {    //function to generate dates between startDate and endDate
      let dates = []
      let startDate = new Date(event.startDate).getDate()
      let endDate = new Date(event.endDate).getDate()
      let currentDate = startDate
      for(let currDate = currentDate; currDate <= endDate; currDate++) {
        //for each currDate, set a new date with the same year and month as the event, and the currDate as the date
        let newDate = new Date(new Date(event.startDate).setDate(currDate))
        //we will also pass event_id in the object below.
        dates.push({ eventName: event.eventName, eventStart: newDate, eventEnd: newDate, description: event.description})
      }
      return dates
      },
    }
  },


  methods: {
    getEvents: function() {
        axios.get('/api/events').then((response) => {
            this.events = response.data
            console.log(this.events)
        })
    }, 
  },


  computed: {
    getAvailableCol() {
      const eventsArr = this.eventsInSelectedDate(this.dateString)
      console.log(eventsArr)
      const sortedArr = eventsArr.sort((a, b) => {
        let aLength = a.endTime[0] - a.startTime[0]
        let bLength = b.endTime[0] - b.startTime[0]
        return bLength - aLength
      })
      const columns = this.cellOccupancyTracker
      const eventsList = []

     for(let index = 0; index < sortedArr.length; index++) { //iterate through events
        let startTime = sortedArr[index].eventStart[0]
        let endTime = sortedArr[index].eventEnd[0]  

        for(let i = 0; i < columns.length; i++) { // iterate through columns
          let thisColumn = columns[i].rows

          if(thisColumn.length === 0) { //if column is empty, push event into column
            for( let j = startTime; j < endTime; j++) {
              thisColumn.push(j)
            }
             eventsList.push({...sortedArr[index], column: columns[i].name})
             break;
          } else if(thisColumn.length > 0) { //if column is not empty, check if event can fit in column
            let iterationComplete = false
            let temp = []
            for(let j = startTime; j < endTime; j++) { //iterate through event hours, if event hours overlap with column hours, break and move to next column
              if(thisColumn.includes(j)) { 
                iterationComplete = false
                temp = []
                break;
              } else if(!thisColumn.includes(j)) { //if column hours don't overlap with event hours, push hours into temp array
                iterationComplete = true
                temp.push(j)
                }
            } 
            if(iterationComplete) {
              thisColumn.push(...temp)
               eventsList.push({...sortedArr[index], column: columns[i].name})
              break;
            }
          }
        }
      }
      return eventsList
    }, 
  },


  created() {
    console.log('selected date: ', this.date.toString().slice(0, 15))
  }
}
</script>


<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.dayComponent {
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  border: 1px solid gray;
  flex-grow: 6;
}

.dayHeader {
  display: flex;
  flex-flow: row nowrap;
  align-items: end;
  width: 100%;
  box-shadow: 1px 15px 13px 1px rgba(47, 47, 47, 0.292);
  z-index: 1;
}

.grid-container {
  align-self: center;
  display: grid;
  grid-template-columns: [hour] 5em [events1] 1fr [events2] 1fr [events3] 1fr [events4] 1fr;
  grid-template-rows: repeat(24, 3.5em);
  grid-gap: 0px;
  column-gap: .5em;
  overflow: scroll;
  width: 98%;
  padding-right: 2%;
  padding-top: 2%;
}

.grid-item {
  margin-bottom: 0px;
}

.hour {
  grid-column: hour/event;
  margin-left: 3.1em;
  border-top: 1px dotted rgb(211, 211, 211);
}

.hourText {
  position: relative;
  top: -18%;
  left: -4%; 
  color: rgb(128, 127, 127);
  font-style: italic;
}

.event-item {
  background-color: rgb(255, 225, 92);
  border-radius: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 10px 15px 13px 1px rgba(0, 0, 0, 0.292);
  contain: strict;
}

.eventInfo {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.eventInfo p {
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(85, 85, 85);
}

/* width */
::-webkit-scrollbar {
  width: 8px;
  border-radius: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #c5c5c5; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b0b0b0; 
}

.grid-container::-webkit-scrollbar:horizontal{
  display: none;
}

</style>
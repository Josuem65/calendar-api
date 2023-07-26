<template>
  <div :class="eventFormToggle ? 'showEventForm': 'hideEventForm'">
    <form @submit.prevent="handleSubmit" class="eventForm">
      <div @click="handleEventsForm" class="closeFormBtn">X</div>
      <div class="eventName">
        <label for="event-name">Event</label>
        <input type="text" id="event-name" name="event-name" v-model.lazy="formValues.eventName"/>
      </div>
      <div class="setDates">
        <label for="event-date">Date</label>
        <input type="date" id="event-date" name="event-date" v-model.lazy="formValues.startDate"/>
        <label for="end-date">End-Date</label>
        <input type="date" id="end-date" name="end-date" v-model.lazy="formValues.endDate"/>
      </div>
      <div class="setTime">
        <label for="event-time">Time</label>
        <input type="time" id="event-time" name="event-time" v-model.lazy="formValues.startTime"/>
        <label for="end-time">End-Time</label>
        <input type="time" id="end-time" name="end-time" v-model.lazy="formValues.endTime"/>
      </div>
      <div class="eventDescriptions">
        <label for="event-description">Event Description</label>
        <textarea id="event-description" name="event-description" v-model.lazy="formValues.description"></textarea>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store.js'

export default {
  data() {
    return {
      formValues: {
        eventName: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        description: '',
        },
        formatDate(formValues) {
          return {
            eventName: formValues.eventName,
            eventStart: new Date(formValues.startDate + ' ' + formValues.startTime),
            eventEnd: new Date(formValues.endDate + ' ' + formValues.endTime),
            description: formValues.description,
            event_id: Math.floor(Math.random() * 1000000), //change this to something better.
          }
        }
    }
  },
  setup() {
    return {
      store,     
    }
  },
  methods: {
    handleSubmit: function() {
      let eventForm = this.formatDate(this.formValues)
      console.log(eventForm)
      axios.post("http://localhost:8080/api/events", eventForm).then((resp) => {
        console.log('posted')
        if(resp === 201) {
          console.log('success')
        }
      })
    },
   handleEventsForm: function() {
      this.store.dispatch('toggleEventsForm')
      console.log(this.store.state.eventFormPopup)
    },
  },
  computed: {
    eventFormToggle: function() {
      return this.store.state.eventFormPopup
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

.showEventForm {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.251);
  z-index: 10;
}

.hideEventForm {
  display: none;
}

.eventForm {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 3em auto auto auto;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: white;
}

.closeFormBtn {
  position: relative;
  top: .50em;
  left: 93%;
  width: 1.25em;
  height: 1.25em;
  border-radius: 5px;
  border: 1px solid gray;
  cursor: pointer;
  text-align: center;
}

label {
  margin-top: .50em;
  margin-left: 1em;
}

input {
  margin: .25em .50em 0 .50em;
  padding: .50em;
  border-radius: 5px;
  border: 1px solid gray;
}

textarea {
  margin: .50em .50em 0 .50em;
  padding: .50em;
  border-radius: 5px;
  border: 1px solid gray;
  resize: none;
  overflow: hidden;
}

button {
  margin: .50em .50em .50em .50em;
}

input:focus, textarea:focus, select:focus{
  outline: none;
}

.eventName {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

.setDates {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.setTime {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.eventDescriptions {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.eventDescriptions textarea {
  width: 97%;
}

</style>

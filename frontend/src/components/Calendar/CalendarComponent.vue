<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, initializeEvents } from "./event-utils";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data: function () {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
                eventAdd:
                eventChange:
                eventRemove:
                */
      },
      currentEvents: [],
    };
  },
  async created() {
    await initializeEvents();
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    handleDateSelect(selectInfo) {
      if (confirm("Do you want to add a new customer?")) {
        this.$router.push('/new_customer');
      }
    },

    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)
      ) {
        clickInfo.event.remove();
      }
    },

    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>

<template>
  <div class="calendar-div">
    <FullCalendar class="calendar-component custom-calendar" :options="calendarOptions">
      <template v-slot:eventContent="arg">
        <b>{{ arg.timeText }}</b>
        <i>{{ arg.event.title }}</i>
      </template>
    </FullCalendar>
  </div>
</template>

<style lang="css">
.calendar-div {
  flex-grow: 1;
}

.calendar-component {
  color: black;
}

.custom-calendar .fc-header-toolbar .fc-button {
  background-color: black;
  color: white;
  /* margins in between buttons */
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 6px;
}

.custom-calendar .fc-header-toolbar .fc-button:hover {
  background-color: darkgray;
  color: white;
}
</style>

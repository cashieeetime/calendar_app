<template>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar
            flat
          >
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prev"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="next"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu
              bottom
              right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            :event-ripple="false"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
            @mousedown:event="startDrag"
            @mousedown:time="startTime"
            @mousemove:time="mouseMove"
            @mouseup:time="endDrag"
            @mouseleave.native="cancelDrag"
            >
            <template v-slot:event="{ event, timed, eventSummary }">
              <div class="v-event-draggable">
                <component :is="{ render: eventSummary }"></component>
              </div>
              <div
                v-if="timed"
                class="v-event-drag-bottom"
                @mousedown.stop="extendBottom(event)"
              ></div>
            </template>
          </v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
            >
              <v-toolbar
                :color="selectedEvent.color"
                dark
              >
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
  
                <!-- TITILE GOES HERE -->
                <v-toolbar-title> 
                  <v-text-field
                    label="Title"
                    standard
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="title"
                    @click="label = title"
                    ></v-text-field>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
                <div> <!-- ADD TEXT FIELD HERE -->
                  <v-col
                  cols="10"
                  sm="5"
                  md="12"
                  >
                    <v-row>
                    <v-menu
                    ref="menu"
                    v-model="StartDateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        label="Start Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="StartDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                        >
                        Cancel
                        </v-btn>
                        <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                        >
                        OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-menu
                      ref="menu"
                      v-model="StartTimeMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="Start Time"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        ampm-in-title
                        format="ampm"
                        v-model="StartTime"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                        >
                        Cancel
                        </v-btn>
                        <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                        >
                        OK
                        </v-btn>
                      </v-time-picker>
                    </v-menu>
                    </v-row>
                    <v-row>
                    <v-menu
                    ref="menu"
                    v-model="EndDateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        label="End Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="selectEndDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                        >
                        Cancel
                        </v-btn>
                        <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                        >
                        OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-menu
                      ref="menu"
                      v-model="EndTimeMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="End Time"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        ampm-in-title
                        format="ampm"
                        v-model="EndTime"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                        >
                        Cancel
                        </v-btn>
                        <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                        >
                        OK
                        </v-btn>
                      </v-time-picker>
                    </v-menu>
                    </v-row>
                    <v-textarea
                    name="input-7-4"
                    label="Description"
                    clearable
                    clear-icon="mdi-close-circle"
                    auto-grow
                    v-model="description"
                    ></v-textarea>
                </v-col>
              </div>
                
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="secondary"
                  @click="selectedOpen = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </template>
  
  <script>
    export default {
      data: () => ({
        focus: '',
        type: 'month',
        typeToLabel: {
          month: 'Month',
          week: 'Week',
          day: 'Day',
          '4day': '4 Days',
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        value: '',
        events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        // names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
        dragEvent: null,
        dragStart: null,
        createEvent: null,
        createStart: null,
        extendOriginal: null,
        StartDateMenu: false,
        StartTimeMenu: false,
        EndDateMenu: false,
        EndTimeMenu: false,
        title: "",
        StartDate: null,
        StartTime: null,
        EndDate: null,
        EndTime: null,
        description: "",
      }),
      mounted () {
        this.$refs.calendar.checkChange()
      },
      methods: {
        startDrag ({ event, timed }) {
          if (event && timed) {
            this.dragEvent = event
            this.dragTime = null
            this.extendOriginal = null
          }
        },
        startTime (tms) {
          const mouse = this.toTime(tms)
  
          if (this.dragEvent && this.dragTime === null) {
            const start = this.dragEvent.start
  
            this.dragTime = mouse - start
          } else {
            this.createStart = this.roundTime(mouse)
            this.createEvent = {
              // name: `Event #${this.events.length}`,
              color: this.rndElement(this.colors),
              start: this.createStart,
              end: this.createStart,
              timed: true,

              title: "",
              StartDate: null,
              StartTime: null,
              EndDate: null,
              EndTime: null,
              description: ""
            }
  
            this.events.push(this.createEvent)
          }
        },
        extendBottom (event) {
          this.createEvent = event
          this.createStart = event.start
          this.extendOriginal = event.end
        },
        mouseMove (tms) {
          const mouse = this.toTime(tms)
  
          if (this.dragEvent && this.dragTime !== null) {
            const start = this.dragEvent.start
            const end = this.dragEvent.end
            const duration = end - start
            const newStartTime = mouse - this.dragTime
            const newStart = this.roundTime(newStartTime)
            const newEnd = newStart + duration
  
            this.dragEvent.start = newStart
            this.dragEvent.end = newEnd
          } else if (this.createEvent && this.createStart !== null) {
            const mouseRounded = this.roundTime(mouse, false)
            const min = Math.min(mouseRounded, this.createStart)
            const max = Math.max(mouseRounded, this.createStart)
  
            this.createEvent.start = min
            this.createEvent.end = max
          }
        },
        endDrag () {
          this.dragTime = null
          this.dragEvent = null
          this.createEvent = null
          this.createStart = null
          this.extendOriginal = null
        },
        cancelDrag () {
          if (this.createEvent) {
            if (this.extendOriginal) {
              this.createEvent.end = this.extendOriginal
            } else {
              const i = this.events.indexOf(this.createEvent)
              if (i !== -1) {
                this.events.splice(i, 1)
              }
            }
          }
  
          this.createEvent = null
          this.createStart = null
          this.dragTime = null
          this.dragEvent = null
        },
        roundTime (time, down = true) {
          const roundTo = 15 // minutes
          const roundDownTime = roundTo * 60 * 1000
  
          return down
            ? time - time % roundDownTime
            : time + (roundDownTime - (time % roundDownTime))
        },
        toTime (tms) {
          return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
        },
        viewDay ({ date }) {
          this.focus = date
          this.type = 'day'
        },
        getEventColor (event) {
          return event.color
        },
        setToday () {
          this.focus = ''
        },
        prev () {
          this.$refs.calendar.prev()
        },
        next () {
          this.$refs.calendar.next()
        },
        getEvents ({ start, end }) {
          const events = []
  
          const min = new Date(`${start.date}T00:00:00`).getTime()
          const max = new Date(`${end.date}T23:59:59`).getTime()
          const days = (max - min) / 86400000
          const eventCount = this.rnd(days, days + 20)
  
          for (let i = 0; i < eventCount; i++) {
            const timed = this.rnd(0, 3) !== 0
            const firstTimestamp = this.rnd(min, max)
            const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000
            const start = firstTimestamp - (firstTimestamp % 900000)
            const end = start + secondTimestamp
  
            events.push({
              // name: this.rndElement(this.names),
              color: this.rndElement(this.colors),
              start,
              end,
              timed,
            })
          }
  
          this.events = events
        },
        showEvent ({ nativeEvent, event }) {
          const open = () => {
            this.selectedEvent = event
            this.selectedElement = nativeEvent.target
            requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
          }
  
          if (this.selectedOpen) {
            this.selectedOpen = false
            requestAnimationFrame(() => requestAnimationFrame(() => open()))
          } else {
            open()
          }
  
          nativeEvent.stopPropagation()
        },
        updateRange ({ start, end }) {
          const events = []
  
          const min = new Date(`${start.date}T00:00:00`)
          const max = new Date(`${end.date}T23:59:59`)
          const days = (max.getTime() - min.getTime()) / 86400000
          const eventCount = this.rnd(days, days + 20)
  
          for (let i = 0; i < eventCount; i++) {
            const allDay = this.rnd(0, 3) === 0
            const firstTimestamp = this.rnd(min.getTime(), max.getTime())
            const first = new Date(firstTimestamp - (firstTimestamp % 900000))
            const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
            const second = new Date(first.getTime() + secondTimestamp)
  
            events.push({
              // name: this.names[this.rnd(0, this.names.length - 1)],
              start: first,
              end: second,
              color: this.colors[this.rnd(0, this.colors.length - 1)],
              timed: !allDay,
            })
          }
  
          this.events = events
        },
        rnd (a, b) {
          return Math.floor((b - a + 1) * Math.random()) + a
        },
        rndElement (arr) {
          return arr[this.rnd(0, arr.length - 1)]
        },
      },
    }
  </script>
  
  <style scoped lang="scss">
  .v-event-draggable {
    padding-left: 6px;
  }
  
  .v-event-timed {
    user-select: none;
    -webkit-user-select: none;
  }
  
  .v-event-drag-bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 4px;
    height: 4px;
    cursor: ns-resize;
  
    &::after {
      display: none;
      position: absolute;
      left: 50%;
      height: 4px;
      border-top: 1px solid white;
      border-bottom: 1px solid white;
      width: 16px;
      margin-left: -8px;
      opacity: 0.8;
      content: '';
    }
  
    &:hover::after {
      display: block;
    }
  }
  </style>
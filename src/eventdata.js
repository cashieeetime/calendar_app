focus = '',
type = 'month',
typeToLabel = { month: 'Month', week: 'Week', day: 'Day', '4day': '4 Days',},
selectedEvent = {},
selectedElement = null,
selectedOpen = false,
value = '',
events = [],
colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
people = ['Tori Smith', 'James Chester', 'Alison Baker', 'Nolan Edward', 'Erza Fox', 'Leo Maximillian', 'Gideon DeVillers', 'Gwyneth Shepherd'],
dragEvent = null,
dragStart = null,
createEvent = null,
createStart = null,
extendOriginal = null,
StartDateMenu = false,
StartTimeMenu = false,
EndDateMenu = false,
EndTimeMenu = false,
StartDate = null,
StartTime = null,
EndDate = null,
EndTime = null,
description = "",

function mounted () {
  this.$refs.calendar.checkChange()
}
function startDrag ({ event, timed }) {
  if (event && timed) {
    this.dragEvent = event
    this.dragTime = null
    this.extendOriginal = null
  }
}
function startTime (tms) {
  const mouse = this.toTime(tms)
  if (this.dragEvent && this.dragTime === null) {
    const start = this.dragEvent.start
    this.dragTime = mouse - start
  } else {
    this.createStart = this.roundTime(mouse)
    this.createEvent = {
      name: `Event #${this.events.length}`,
      people: this.rndElement(this.people),
      color: this.rndElement(this.colors),
      start: this.createStart,
      end: this.createStart,
      timed: true,
    }
    this.events.push(this.createEvent)
  }
}
function extendBottom (event) {
  this.createEvent = event
  this.createStart = event.start
  this.extendOriginal = event.end
}
function mouseMove (tms) {
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
}
function endDrag () {
  this.dragTime = null
  this.dragEvent = null
  this.createEvent = null
  this.createStart = null
  this.extendOriginal = null
}
function cancelDrag () {
  if (this.createEvent) {
    if (this.extendOriginal) {
      this.createEvent.end = this.extendOriginal
    } else {
      const i = this.events.indexOf(this.createEvent)
      if (i !== -1) {
        this.events.splice(i, 1)
      }}}
  this.createEvent = null
  this.createStart = null
  this.dragTime = null
  this.dragEvent = null
}
function roundTime (time, down = true) {
  const roundTo = 15 // minutes
  const roundDownTime = roundTo * 60 * 1000
  return down
    ? time - time % roundDownTime
    : time + (roundDownTime - (time % roundDownTime))
}
function toTime (tms) {
  return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
}
function viewDay ({ date }) {
  this.focus = date
  this.type = 'day'
}
function getEventColor (event) {
  return event.color
}
function setToday () {
  this.focus = ''
}
function prev () {
  this.$refs.calendar.prev()
}
function next () {
  this.$refs.calendar.next()
}
function showEvent ({ nativeEvent, event }) {
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
}
function updateRange ({ start, end }) {
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
      name: this.names[this.rnd(0, this.names.length - 1)],
      people: this.rndElement(this.people),
      start: first,
      end: second,
      color: this.colors[this.rnd(0, this.colors.length - 1)],
      timed: !allDay,
    })}
  this.events = events
}
function rnd (a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a
}
function rndElement (arr) {
  return arr[this.rnd(0, arr.length - 1)]
}
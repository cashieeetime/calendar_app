class eventData {
  constructor (selectedEvent, selectedElement, events, colors, names, people, dragEvent, dragStart, createEvent, createStart, extendOriginal, StartDate, StartTime, EndDate, EndTime) {
    selectedEvent = {}
    selectedElement = null
    events = []
    colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
    names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
    people = ['Tori Smith', 'James Chester', 'Alison Baker', 'Nolan Edward', 'Erza Fox', 'Leo Maximillian', 'Gideon DeVillers', 'Gwyneth Shepherd']
    dragEvent = null
    dragStart = null
    createEvent = null
    createStart = null
    extendOriginal = null
    StartDate = null
    StartTime = null
    EndDate = null
    EndTime = null
    description = ""
  }

  startDrag ({ event, timed }) {
    if (event && timed) {
      this.dragEvent = event
      this.dragTime = null
      this.extendOriginal = null
    }
  }
  startTime (tms) {
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
  extendBottom (event) {
    this.createEvent = event
    this.createStart = event.start
    this.extendOriginal = event.end
  }
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
    }}
  endDrag () {
    this.dragTime = null
    this.dragEvent = null
    this.createEvent = null
    this.createStart = null
    this.extendOriginal = null
  }
  cancelDrag () {
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
  getEventColor (event) {
    return event.color
  }
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
        name: this.rndElement(this.names),
        people: this.rndElement(this.people),
        color: this.rndElement(this.colors),
        start,
        end,
        timed,
      })}
    this.events = events
  }
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
        name: this.names[this.rnd(0, this.names.length - 1)],
        people: this.rndElement(this.people),
        start: first,
        end: second,
        color: this.colors[this.rnd(0, this.colors.length - 1)],
        timed: !allDay,
      })}
    this.events = events
  }
}

export {eventData}
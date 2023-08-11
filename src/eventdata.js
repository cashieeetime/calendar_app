// Mixin
export const eventData = {
  methods: {
    getEvents ({ start, end }) {
      const events = []
      const allEvents = []
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
        })
      } 
      allEvents = events
      return allEvents
    },
  },
}
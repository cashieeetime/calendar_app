<template>
  <div>
    <full-calendar/>
  </div>
</template>

<script>
// @ is an alias to /src
import FullCalendar from '@/components/FullCalendar.vue'

export default {
  name: 'CalendarView',
  components: {
    FullCalendar
  }
}
</script>
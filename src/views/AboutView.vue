<template>
  <div>
    <calendar-demo/>
  </div>
</template>

<script>
// @ is an alias to /src
import CalendarDemo from '@/components/CalendarDemo.vue'

export default {
  name: 'AboutView',
  components: {
    CalendarDemo
  }
}
</script>
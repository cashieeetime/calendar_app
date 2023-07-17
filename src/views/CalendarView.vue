<template>
  <div class="d-flex justify-center">
    <v-card width="1200">
      <v-container>
        <full-calendar/>
      </v-container>
    </v-card>
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
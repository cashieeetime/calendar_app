<template>
  <div class="d-flex justify-center">
    <v-card width="550" height="700">
      <v-container>
        <to-do-list/>
      </v-container>
    </v-card>
  
    <div class="d-flex flex-column justify-space-between">
      <v-card width="700" height="350">
        <v-container>
          <meeting-chart/>
        </v-container>
      </v-card>
      
      <v-card width="700">
        <v-container>
          <day-view/>
        </v-container>
      </v-card>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import ToDoList from '@/components/ToDoList.vue'
import MeetingChart from '@/components/MeetingChart.vue'
import DayView from '@/components/DayView.vue'

export default {
  name: 'DashboardView',
  components: {
    ToDoList,
    MeetingChart,
    DayView,
} }
</script>

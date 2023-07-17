<template>
  <div class="d-flex flex-row justify-space-around">
    <v-container max-width="500">
      <to-do-list/>
    </v-container>

    <v-container>
      <day-view/>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import CompareSchedule from '@/components/CompareSchedule.vue'
import ToDoList from '@/components/ToDoList.vue'
import DayView from '@/components/DayView.vue'

export default {
  name: 'DashboardView',
  components: {
    // CompareSchedule,
    ToDoList,
    DayView
  }
}
</script>

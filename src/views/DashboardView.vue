<template>
  <div>
    <div class="d-flex justify-space-around">
      <v-card width="500" height="700">
        <v-container>
          <to-do-list/>
        </v-container>
      </v-card>

      <v-card width="950" height="700">
        <v-container>
          <day-view/>
        </v-container>
      </v-card>
    </div>

    <!--
    <div class="d-flex justify-space-around">
      <v-card width="1300" height="700">
        <v-container>
          <compare-schedule/>
        </v-container>
      </v-card>
    </div>
    -->
  </div>
</template>

<script>
// @ is an alias to /src
import ToDoList from '@/components/ToDoList.vue'
import DayView from '@/components/DayView.vue'
// import CompareSchedule from '@/components/CompareSchedule.vue'

export default {
  name: 'DashboardView',
  components: {
    ToDoList,
    DayView,
    // CompareSchedule
  }
}
</script>

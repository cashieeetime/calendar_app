<template>
  <div>
    <div class="d-flex justify-space-around">
      <v-card width="500" height="700">
        <v-container>
          <to-do-list/>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ToDoList from '@/components/ToDoList.vue'

export default {
  name: 'DashboardView',
  components: {
    ToDoList,
  } }
</script>

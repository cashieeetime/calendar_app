<template>
  <v-card class="d-flex justify-center" width="1250">
    <v-container>
      <meeting-chart/>
    </v-container>
  </v-card>
</template>

<script>
import MeetingChart from '@/components/MeetingChart.vue'

export default {
  name: 'TestingView',
  components: { MeetingChart }
}
</script>
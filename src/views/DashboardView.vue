<template>
  <div class="home">
    
    <compare-schedule/>
  </div>
</template>

<script>
// @ is an alias to /src
import CompareSchedule from '@/components/CompareSchedule.vue'

export default {
  name: 'DashboardView',
  components: {
    CompareSchedule
  }
}
</script>

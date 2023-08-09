<template>
    <Bar
      id="meeting-counts"
      :options="chartOptions"
      :data="chartData"
    />
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
// import FullCalendar from '@/components/FullCalendar.vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { 
    Bar, 
    // FullCalendar,
  },
  data() {
    return {
      people: ['Tori Smith', 'James Chester', 'Alison Baker', 'Nolan Edward', 'Erza Fox', 'Leo Maximillian', 'Gideon DeVillers', 'Gwyneth Shepherd'],
      chartData: {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            label: 'Meeting Counts',
            backgroundColor: '#f87979',
            data: [40, 20, 12],
          }
        ]
      },
    }
  }
}
</script>
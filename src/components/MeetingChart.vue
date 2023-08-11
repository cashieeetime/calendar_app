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
import {eventData} from '@/eventdata.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { 
    Bar, 
  },
  mixins: [eventData],
  methods: {
    prepData (allEvents) {
      for (let key = 0; key < 1; p++); {
        for (let value = 0; value < allEvents[key], p++;) {
          if (value in chartData) {
            allEvents[value] = allEvents[value] + 1 
          } else {
            allEvents[value] = 1
          }
        }
      }
      return allEvents
    },
    prepLabels (allEvents) {
      events = prepData (allEvents)
      peopleList = []
      dataList = []
      for (i = 0; i < allEvents; i++) {
        peopleList.push(i)
        dataList.push(allEvents[i])
      }
      return peopleList, dataList
    }
  },
  
  data() {
    return {
      chartData: {
        labels: people,
        datasets: [
          {
            label: peopleList,
            backgroundColor: '#f87979',
            data: dataList,
          }
        ]
      },
    }
  }
}
</script>
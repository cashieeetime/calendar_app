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
  methods: { /*
    prepRaw (allEvents) {
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
      for (i = 0; i < allEvents; i++) {
        peopleList.push(i)
      }
      return peopleList
    },
    prepData (allEvents) {
      events = prepData (allEvents)
      dataList = []
      for (i = 0; i < allEvents; i++) {
        dataList.push(allEvents[i])
      }
      return dataList
    } */
  },
  created() {
    console.log(this.getEvents())
    // this.prepRData
  },
  data() {
    return {
      chartData: {
        labels: ['Tori Smith', 'James Chester', 'Alison Baker', 'Nolan Edward', 'Leo Maximillian'],
        datasets: [
          {
            label: 'Number of Meetings This Week',
            backgroundColor: '#f87979',
            data: [1, 3, 2, 1, 2],
          }
        ],
        options: {
          indexAxis: 'y',
        }


        
      },
    }
  }
}
</script>
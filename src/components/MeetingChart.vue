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
// import {eventData} from '@/eventdata.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { 
    Bar, 
  },
  /* mixins: [eventData],
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
      for (i = 0; i < allEvents; i++) {
        peopleList.push(i)
      }
      return peopleList
    },
    prepValues (allEvents) {
      events = prepData (allEvents)
      dataList = []
      for (i = 0; i < allEvents; i++) {
        dataList.push(allEvents[i])
      }
      return dataList
    } 
  },  
  created() {
    console.log(this.getEvents())
    this.prepRData
  }, */
  data() {
    return {
      chartData: {
        labels: ['Tori S.', 'James C.', 'Alison B.', 'Nolan E.', 'Leo M.', 'Erza F.'],
        datasets: [
          {
            axis: 'y',
            label: 'Number of Meetings This Week',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)'
            ],
            borderWidth: 1,
            data: [1, 3, 2, 4, 2, 1],
          }
        ],
      },
      
    }
  }
}
</script>
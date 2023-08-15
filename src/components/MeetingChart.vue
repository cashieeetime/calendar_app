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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['Tori S.', 'James C.', 'Alison B.', 'Nolan E.', 'Leo M.', 'Erza F.'],
        datasets: [ 
          {
            label: 'Number of Meetings This Week',
            data: [1, 3, 2, 4, 2, 1],
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
          } 
        ] 
      },

      chartOptions: {
        //indexAxis: 'x',
        responsive: true,
        autoPadding: true,
        scales: {
          y: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1
            }
          },
        }   
      }
    }
  }
}
</script>
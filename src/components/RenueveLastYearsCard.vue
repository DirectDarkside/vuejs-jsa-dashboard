<template>
  <section class="card">
    {{ message }}
    <Line :data="data" :options="options" />
  </section>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement,Title, Tooltip, Legend)

export default {
  name: "RenueveLastYearsCard",
  components: {
    Line,
  },
  data() {
    return {
      data: {
        labels: ['January', 'February', 'March'],
        datasets: [{ data: [40, 20, 12] }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'white'  // Schriftfarbe der Legende auf weiß setzen
            }
          }
        },
        scales: { // Schriftfarbe der Achsenbeschriftungen auf weiß setzen
          x: {
            ticks: {
              color: 'white'
            }
          },
          y: {
            ticks: {
              color: 'white'
            }
          }
        }
      }
    }
  }
};
</script>

<style>
.card {
  background-color: #011f35;
  border-radius: 16px;
  padding: 24px 32px;
}
</style>

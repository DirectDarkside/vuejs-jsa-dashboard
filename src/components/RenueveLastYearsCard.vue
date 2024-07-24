<template>
  <section class="card">
    {{ message }}
    <Bar :data="data" :options="options" />
  </section>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: "RenueveLastYearsCard",
  components: {
    Bar,
  },
  data() {
    return {
      data: {
        labels: ['January', 'February', 'March'],
        datasets: [{ data: [40, 20, 12] }]
      },
      options: {
        responsive: true
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

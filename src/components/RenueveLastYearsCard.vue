<template>
  <section v-if="revenueData.length > 0" class="card">
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
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { onMounted, ref, toRaw } from "vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "RenueveLastYearsCard",
  components: {
    Line,
  },
  props: {
    revenueData: Array,
  },
  setup(props) {
    const data = ref({});
    const options = ref({});
    data.value = {
      labels: ["January", "February", "March"],
      datasets: [{ data: [40, 20, 12] }],
    };
    options.value = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "white", // Schriftfarbe der Legende auf weiß setzen
          },
        },
      },
      scales: {
        // Schriftfarbe der Achsenbeschriftungen auf weiß setzen
        x: {
          ticks: {
            color: "white",
          },
        },
        y: {
          ticks: {
            color: "white",
          },
        },
      },
    };

    onMounted(() => {
      const rawData = toRaw(props.revenueData);
      const mappedRevues = {
        label: "Test",
        data: [],
      };
      const mappedQuarterly = rawData.map(
        (data) => `Q${data.quarter} ${data.year}`
      );
      mappedRevues.data = rawData.map((data) => data.revenue);

      data.value = {
        labels: mappedQuarterly,
        datasets: [mappedRevues],
      };
    });

    return { data, options };
  },
};
</script>

<style>
.card {
  background-color: #011f35;
  border-radius: 16px;
  padding: 24px 32px;
}
</style>

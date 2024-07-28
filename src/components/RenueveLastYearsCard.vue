<template>
  <section v-if="revenueData.length > 0" class="card">
    {{ message }}
    <Line :data="data" :options="options" />
  </section>
</template>

<script>
import { useStore } from "vuex";
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
import { onMounted, ref, toRaw, watch } from "vue";

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
  setup() {
    const store = useStore();
    const data = ref({
      dataList: [],
    });
    const options = ref({});

    const filterLabels = (labelList) => {
      const currentYear = new Date().getFullYear(); // Aktuelles Jahr
      const startYear = currentYear - 2; // Drei Jahre zurück

      const uniqueQuartersLastThreeYears = [
        ...new Set(
          labelList.filter((quarter) => {
            const year = parseInt(quarter.split(" ")[1]);
            return year >= startYear && year <= currentYear;
          })
        ),
      ];
      return uniqueQuartersLastThreeYears;
    };

    const sortData = (list) => {
      const sortedList = [];
      list.forEach((company) => {
        const sortedCompany = {
          title: company.title,
          quarterly: [],
          revenues: [],
        };
        sortedCompany.quarterly = company.filteredRevenueData.map(
          (data) => `Q${data.quarter} ${data.year}`
        );
        sortedCompany.revenues = company.filteredRevenueData.map(
          (data) => data.revenue
        );
        sortedList.push(sortedCompany);
      });
      return sortedList;
    };

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

    watch(
      () => store.state.companyData,
      (newValue) => {
        const gettedData = toRaw(newValue);
        const newChartData = {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [],
        };
        const labels = [];
        const sortedList = sortData(gettedData);
        console.log("sortedList: ", sortedList);

        sortedList.forEach((list) => {
          const dataset = {
            label: list.title,
            backgroundColor: "#f87979",
            data: list.revenues,
          };
          list.quarterly.forEach((quarterly) => labels.push(quarterly));
          newChartData.datasets.push(dataset);
        });
        const filteredLabels = filterLabels(labels);

        data.value = {
          labels: filteredLabels,
          datasets: newChartData.datasets,
        };
      }
    );

    onMounted(() => {
      const rawData = store.state.companyData;
      // console.log(store.state.companyData);
      // const rawData = toRaw(props.revenueData);
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

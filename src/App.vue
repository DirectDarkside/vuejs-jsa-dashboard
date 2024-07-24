<template>
  <h1>The Magnificent Seven Companies</h1>
  <header>
    <ul>
      <li v-for="companyData in companyDatas" :key="companyData.title">
        <InfoCard
          :title="companyData.title"
          :titleImgSrc="require(`@/assets/img/${companyData.titleImgSrc}`)"
          v-if="companyData.revenueData && companyData.revenueData.length > 0"
          :revenueDate="
            companyData.revenueData[companyData.revenueData.length - 1].date
          "
          :revenueData="
            companyData.revenueData[companyData.revenueData.length - 1].data
          "
          :netIncomeData="
            companyData.netIncomeData[companyData.netIncomeData.length - 1].data
          "
          :grossMarginData="
            companyData.grossMarginData[companyData.grossMarginData.length - 1].data
          "
        >
        </InfoCard>
      </li>
    </ul>
  </header>
</template>

<script>
import { ref, onMounted } from "vue";
import InfoCard from "./components/InfoCard.vue";
import { stockService } from "./services/api.js";

export default {
  name: "App",
  components: {
    InfoCard,
  },
  setup() {
    const companyDatas = ref([]);
    const error = ref(null);
    const loading = ref(true);

    onMounted(async () => {
      try {
        const data = stockService.companyDatas;
        data.forEach(async (company, index) => {
          const fetchedData = await stockService.getData(company.url, index);
          company.revenueData = fetchedData.revenue;
          company.revenueData = convertToNumber(company.revenueData);
          company.netIncomeData = fetchedData.netIncome;
          company.netIncomeData = convertToNumber(company.netIncomeData);
          company.grossMarginData = fetchedData.grossMargin;
        });
        console.log(data);
        companyDatas.value = data;
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    });
    return { companyDatas, error, loading };
  },
};

function convertToNumber(list) {
  list.forEach((data) => {
    const replacedData = data.data.replace(",", ".");
    data.data = Number(replacedData).toFixed(2);
  });
  return list;
}
</script>

<style>
body {
  margin: 0;
}

header {
  background: #023a6233;
  padding: 24px;
  border-radius: 20px;
  overflow-x: auto;
}

header ul {
  gap: 24px;
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: fit-content;
  margin-right: 8px;
}

#app {
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(
    71.11% 100% at 50% 0%,
    #020204 14.6%,
    #011f35 100%
  );
  padding: 64px 100px;
  box-sizing: border-box;
  color: white;
}
</style>

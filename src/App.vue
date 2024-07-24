<template>
  <h1>The Magnificent Seven Companies</h1>
  <section class="section_header">
    <header id="header">
      <ul v-if="companyDatas.length > 0">
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
              companyData.netIncomeData[companyData.netIncomeData.length - 1]
                .data
            "
            :grossMarginData="
              companyData.grossMarginData[
                companyData.grossMarginData.length - 1
              ].data
            "
          >
          </InfoCard>
        </li>
      </ul>
      <p v-else-if="error">Fehler beim Laden der Daten: {{ error.message }}</p>
      <p v-else>Daten werden geladen...</p>
    </header>
    <span
      @click="scrollRight()"
      v-if="companyDatas.length > 0"
      class="header_right_arrow"
    >
      <img src="@/assets/img/arrow.png" alt="right arrow" />
    </span>
  </section>
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
    const convertToNumber = (list) => {
      list.forEach((data) => {
        const replacedData = data.data.replace(",", ".");
        data.data = Number(replacedData).toFixed(2);
      });
      return list;
    };
    const scrollRight = () => {
      document.getElementById("header").scrollLeft += 100;
    }

    onMounted(async () => {
      try {
        const data = stockService.companyDatas;
        // Array mit Promises erstellen
        const promises = data.map(async (company, index) => {
          const fetchedData = await stockService.getData(company.url, index);
          company.revenueData = convertToNumber(fetchedData.revenue);
          company.netIncomeData = convertToNumber(fetchedData.netIncome);
          company.grossMarginData = fetchedData.grossMargin;
        });
        // Auf den Abschluss aller API-Aufrufe warten
        await Promise.all(promises);
        companyDatas.value = data; // Daten zuweisen, nachdem alle Promises erfüllt sind
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    });
    return { companyDatas, error, loading, scrollRight };
  },
};
</script>

<style>
body {
  margin: 0;
  scroll-behavior: smooth;
}

header {
  background: #023a6233;
  padding: 24px;
  border-radius: 20px;
  overflow-x: hidden;
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

.section_header {
  position: relative;
}

.header_right_arrow {
  background-color: #36d4ff;
  padding: 8px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  position: absolute;
  right: -16px;
  top: 43%;
  cursor: pointer;
}
</style>

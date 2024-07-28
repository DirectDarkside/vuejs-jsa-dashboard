<template>
  <h1>The Magnificent Seven Companies</h1>
  <section class="section_header">
    <header id="header">
      <ul id="u_list" v-if="companyDatas.length > 0">
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
      :class="{ header_right_arrow: isRightArrow, 'd-none': !isRightArrow }"
    >
      <img src="@/assets/img/arrow.png" alt="right arrow" />
    </span>
    <span
      @click="scrollLeft()"
      v-if="companyDatas.length > 0"
      :class="{ header_left_arrow: isLeftArrow, 'd-none': !isLeftArrow }"
    >
      <img src="@/assets/img/arrow.png" alt="left arrow" />
    </span>
  </section>
  <RenueveLastYearsCard :revenueData="filteredRevenueData"></RenueveLastYearsCard>
</template>

<script>
import { ref, onMounted } from "vue";
import InfoCard from "./components/InfoCard.vue";
import RenueveLastYearsCard from "./components/RenueveLastYearsCard.vue";
import { useStore } from "vuex";
// import { stockService } from "./services/api.js";

export default {
  name: "App",
  components: {
    InfoCard,
    RenueveLastYearsCard,
  },
  setup() {
    const store = useStore();
    const companyDatas = ref([]);
    const filteredRevenueData = ref([]);
    const error = ref(null);
    const loading = ref(true);
    let isRightArrow = ref(true);
    let isLeftArrow = ref(false);
    // const convertToNumber = (list) => {
    //   list.forEach((data) => {
    //     const replacedData = data.data.replace(",", ".");
    //     data.data = Number(replacedData).toFixed(2);
    //   });
    //   return list;
    // };
    const scrollRight = () => {
      const headerElement = document.getElementById("header");
      const uListElement = document.getElementById("u_list");
      if (headerElement && uListElement) {
        const scrollLeft = headerElement.scrollLeft;
        const scrollWidth = uListElement.scrollWidth;
        const clientWidth = headerElement.clientWidth;
        if (scrollLeft + clientWidth >= scrollWidth) {
          isRightArrow.value = false;
        } else {
          headerElement.scrollLeft += 200;
          isLeftArrow.value = true;
        }
      }
    };
    const scrollLeft = () => {
      const headerElement = document.getElementById("header");
      const uListElement = document.getElementById("u_list");
      if (headerElement && uListElement) {
        const scrollLeft = headerElement.scrollLeft;
        if (scrollLeft == 0) {
          isLeftArrow.value = false;
        } else {
          headerElement.scrollLeft -= 200;
          isRightArrow.value = true;
        }
      }
    };
    const aggregateQuarterlyData = (companyDatas) => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentQuarter = Math.floor(today.getMonth() / 3) + 1; // Aktuelles Quartal (1-4)

      // Ermittle das Startjahr aus den Daten
      const firstDate = parseDate(companyDatas[0].date);
      const startYear = firstDate.getFullYear();

      const filteredData = companyDatas.filter((data) => {
        const date = parseDate(data.date);
        const year = date.getFullYear();
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        return (
          year >= startYear &&
          year <= currentYear &&
          (year < currentYear || quarter <= currentQuarter)
        );
      });

      const quarterlyData = [];
      for (let year = startYear; year <= currentYear; year++) {
        const endQuarter = year === currentYear ? currentQuarter : 4; // Nur bis zum aktuellen Quartal im aktuellen Jahr
        for (let quarter = 1; quarter <= endQuarter; quarter++) {
          quarterlyData.push({
            year,
            quarter,
            revenue: 0,
            netIncome: 0,
            grossMargin: 0,
          });
        }
      }

      filteredData.forEach((data) => {
        const date = parseDate(data.date);
        const year = date.getFullYear();
        const quarter = Math.floor(date.getMonth() / 3) + 1;

        // Korrigierter quarterIndex
        const quarterIndex = (year - startYear) * 4 + quarter - 1;

        quarterlyData[quarterIndex].revenue += parseFloat(
          data.data.replace(",", ".")
        );
        // ... andere Werte (netIncome, grossMargin) summieren, falls vorhanden
      });
      return quarterlyData;
    };

    const parseDate = (dateStr) => {
      const parts = dateStr.split(" ");

      // Überprüfen, ob Tag vorhanden ist
      const day = parts.length === 3 ? parseInt(parts[0], 10) : 1; // Wenn kein Tag, nehme den 1. an

      const monthAbbrev = parts[parts.length - 2]; // Monat ist immer das vorletzte Element
      const year = parseInt(parts[parts.length - 1], 10) + 2000; // Jahr ist immer das letzte Element

      const monthIndex = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        Mai: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      }[monthAbbrev];

      return new Date(year, monthIndex, day);
    };

    onMounted(async () => {
      try {
        // const data = stockService.companyDatas;
        // // Array mit Promises erstellen
        // const promises = data.map(async (company, index) => {
        //   const fetchedData = await stockService.getData(company.url, index);
        //   company.revenueData = convertToNumber(fetchedData.revenue);
        //   company.netIncomeData = convertToNumber(fetchedData.netIncome);
        //   company.grossMarginData = fetchedData.grossMargin;
        // });
        // // Auf den Abschluss aller API-Aufrufe warten
        // await Promise.all(promises);
        // localStorage.setItem("localData", JSON.stringify(data));
        const data = JSON.parse(localStorage.getItem("localData"));
        console.log(data);
        store.commit('SET_DATA', data);
        filteredRevenueData.value = aggregateQuarterlyData(data[0].revenueData);
        companyDatas.value = data; // Daten zuweisen, nachdem alle Promises erfüllt sind
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    });
    return {
      store,
      companyDatas,
      error,
      loading,
      scrollRight,
      scrollLeft,
      isRightArrow,
      isLeftArrow,
      filteredRevenueData,
    };
  },
};
</script>

<style>
.d-none {
  display: none !important;
}

body {
  margin: 0;
  scroll-behavior: smooth;
}

header {
  background: #023a6233;
  padding: 24px;
  border-radius: 20px;
  overflow-x: hidden;
  margin-bottom: 24px;
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

.header_left_arrow {
  background-color: #36d4ff;
  padding: 8px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  position: absolute;
  left: -16px;
  top: 43%;
  cursor: pointer;
  transform: rotate(180deg);
}
</style>

<template>
  <h1>The Magnificent Seven Companies</h1>
  <header>
    <InfoCard class="info_card">
      <h2>
        <img src="./assets/img/apple.png" alt="apple logo" />
        Apple
      </h2>
      <p>Revenue Q1 2024</p>
      <div class="info_card_data">
        <b class="info_card_current_price">38.52</b>
        <div>
          <span>+1.06 <img src="./assets/img/arrow-top-green.png" alt="top green arrow"></span>
          <span>2.83 %</span>
        </div>
      </div>
      <p>In Bill USD</p>
    </InfoCard>
  </header>
</template>

<script>
import InfoCard from "./components/InfoCard.vue";
// import { stockService } from "./services/api.js";

export default {
  name: "App",
  components: {
    InfoCard,
  },
  async created() {
    // try {
    //   this.sheetData = await stockService.getRevenue(
    //     "szmcovl2hrz4z?sheet=$AAPL"
    //   );
    //   console.log("Loaded Data", this.sheetData);
    // } catch (error) {
    //   this.error = error;
    // } finally {
    //   this.loading = false;
    // }
  },
};
</script>

<style>
body {
  margin: 0;
}

header {
  background: #023a6233;
  padding: 24px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.info_card {
  display: flex;
  flex-direction: column;
}

.info_card h2 {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  font-size: 20px;
}

.info_card > p {
  font-size: 12px;
}

.info_card > p:last-child {
  margin-bottom: 0;
  font-size: 8px;
}

.info_card_data {
  display: flex;
  align-items: center;
  gap: 12px;
}

.info_card_data > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.info_card_current_price {
  font-weight: 500;
  font-size: 24px;
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

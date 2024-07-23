<template>
  <InfoCard>
    <h2>Revenue last 3 years</h2>
  </InfoCard>
</template>

<script>
import InfoCard from "./components/InfoCard.vue";
import { stockService } from "./services/api.js";

export default {
  name: "App",
  components: {
    InfoCard,
  },
  async created() {
    try {
      this.sheetData = await stockService.fetchSheetData('szmcovl2hrz4z');
      console.log("Loaded Data", this.sheetData);
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(
    71.11% 100% at 50% 0%,
    #020204 14.6%,
    #011f35 100%
  );
  padding: 300px;
  box-sizing: border-box;
}
</style>

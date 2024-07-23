<template>
  <div class="card info_card">
    <h2>
      <img :src="titleImgSrc" alt="apple logo" />
      {{ title }}
    </h2>
    <p>Revenue Q1 2024</p>
    <div class="info_card_data">
      <b class="info_card_current_price">38.52</b>
      <div>
        <span
          >+1.06
          <img src="../assets/img/arrow-top-green.png" alt="top green arrow"
        /></span>
        <span>2.83 %</span>
      </div>
    </div>
    <p>In Bill USD</p>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    title: String,
    titleImgSrc: String,
  },
};
</script>

<style scoped>
.card {
  background-color: #011f35;
  border-radius: 16px;
  padding: 24px 32px;
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

.info_card h2 img {
  width: 24px;
  object-fit: contain;
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

.info_card_data > div > span {
  display: flex;
  gap: 4px;
}

.info_card_data > div > span > img {
  object-fit: contain;
  width: 8px;
}

.info_card_current_price {
  font-weight: 500;
  font-size: 24px;
}
</style>

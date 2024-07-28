import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      companyData: []
    };
  },
  mutations: {
    SET_DATA(state, data) {
        state.revenueData = data;
      },
  },
});

const app = createApp(App);

// Install the store instance as a plugin
app.use(store)

app.mount("#app");
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#285154",
        secondary: "#6C807A",
        anchor: "#04DB9B",
      },
    },
  },
});

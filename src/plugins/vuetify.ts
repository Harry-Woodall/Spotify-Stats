/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "blue",
          secondary: "#e33ce9",
          background: "#000000",
          surface: "#000000",
          error: "#f5473b",
          warning: "#E65100",
          anchor: "#f5473b",
        },
      },
    },
  },
});

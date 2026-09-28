import DefaultTheme from "vitepress/theme";
import "@my-ds/components/dist/bundle.css";
import PropsTable from "./components/PropsTable.vue";
import ComponentHeader from "./components/ComponentHeader.vue";
import Playground from "./components/Playground.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("PropsTable", PropsTable);
    app.component("ComponentHeader", ComponentHeader);
    app.component("Playground", Playground);
  },
  async setup() {
    if (typeof window !== "undefined") {
      await import("@my-ds/components");
    }
  },
};

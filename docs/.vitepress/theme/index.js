import { watchEffect } from "vue";
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "@my-ds/tokens/tokens.css";
import "@my-ds/components/dist/bundle.css";
import PropsTable from "./components/PropsTable.vue";
import ComponentHeader from "./components/ComponentHeader.vue";
import Playground from "./components/Playground.vue";
import TokenList from "./components/TokenList.vue";
import ColorPalette from "./components/ColorPalette.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("PropsTable", PropsTable);
    app.component("ComponentHeader", ComponentHeader);
    app.component("Playground", Playground);
    app.component("TokenList", TokenList);
    app.component("ColorPalette", ColorPalette);
  },
  async setup() {
    if (typeof window !== "undefined") {
      // Keep the design system theme in sync with VitePress' appearance toggle.
      const { isDark } = useData();
      watchEffect(() => {
        document.documentElement.dataset.theme = isDark.value ? "dark" : "light";
      });

      await import("@my-ds/components");
    }
  },
};

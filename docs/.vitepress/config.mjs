import { defineConfig } from "vitepress";
import { postcssIsolateStyles } from "vitepress";

export default defineConfig({
  title: "My DS",
  description: "Component library documentation",
  head: [
    // Apply the design-system theme before first paint, mirroring VitePress' own
    // appearance preference ("auto" is left to the prefers-color-scheme fallback).
    [
      "script",
      {},
      `;(() => {
        const preference = localStorage.getItem("vitepress-theme-appearance");
        if (preference === "dark" || preference === "light")
          document.documentElement.dataset.theme = preference;
      })()`,
    ],
  ],
  vite: {
    css: {
      postcss: {
        plugins: [postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] })],
      },
    },
    server: {
      watch: {
        paths: ["../packages/components/dist/custom-elements.json"],
      },
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes("-"),
      },
    },
  },
  themeConfig: {
    sidebar: [
      {
        text: "Welcome",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Installation", link: "/install" },
        ],
      },
      {
        text: "Principles",
        items: [
          { text: "Design Principles", link: "/design-principles" },
          { text: "Accessibility Principles", link: "/accessibility" },
        ],
      },
      {
        text: "Foundations",
        items: [{ text: "Design Tokens", link: "/foundations/tokens" }],
      },
      {
        text: "Components",
        items: [{ text: "Button", link: "/components/button" }],
      },
    ],
  },
});

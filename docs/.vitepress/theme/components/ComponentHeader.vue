<script setup>
import { data as manifest } from "../../custom-elements.data.mjs";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const props = defineProps({
  tag: {
    type: String,
    required: true,
  },
});

const component = manifest.modules
  .flatMap((m) => m.declarations ?? [])
  .find((d) => d.tagName === props.tag);

const description = md.render(component.description);
</script>

<template>
  <div>
    <div style="display: flex; align-items: center; gap: 1rem">
      <h1>{{ component.displayName }}</h1>
      <code>&lt;{{ component.tagName }}&gt;</code>
      <code>{{ component.status }}</code>
    </div>
    <div v-html="description" />
  </div>
</template>

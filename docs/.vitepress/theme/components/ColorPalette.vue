<script setup>
import tokens from "@my-ds/tokens/tokens.json";

const hues = Object.entries(
  tokens
    .filter((t) => t.tier === "primitive" && t.type === "color")
    .reduce((groups, t) => {
      (groups[t.path[1]] ??= []).push(t);
      return groups;
    }, {}),
);
</script>

<template>
  <div class="palette">
    <div v-for="[hue, steps] in hues" :key="hue" class="palette-row">
      <div class="palette-hue">{{ hue }}</div>
      <div class="palette-steps">
        <div v-for="step in steps" :key="step.name" class="palette-step" :title="`${step.name}: ${step.value}`">
          <span class="palette-swatch" :style="{ background: `var(${step.name})` }" />
          <span class="palette-label">{{ step.path.at(-1) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.palette {
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
}

.palette-hue {
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: capitalize;
  margin-bottom: 0.25rem;
}

.palette-steps {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(2.75rem, 1fr));
  gap: 0.25rem;
}

.palette-swatch {
  display: block;
  height: 2.5rem;
  border-radius: var(--ds-radius-sm);
  border: 1px solid var(--ds-color-border-quiet);
}

.palette-label {
  display: block;
  font-size: 0.7rem;
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>

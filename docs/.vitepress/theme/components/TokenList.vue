<script setup>
import { computed } from "vue";
import tokens from "@my-ds/tokens/tokens.json";

const props = defineProps({
  /** Token path prefix, e.g. "color.primary" or "space". */
  group: {
    type: String,
    required: true,
  },
  tier: {
    type: String,
    default: "semantic",
  },
  /** How to preview each token: swatch | size | radius | shadow | font-size | text */
  preview: {
    type: String,
    default: "text",
  },
});

const list = computed(() =>
  tokens.filter(
    (t) => t.tier === props.tier && `${t.path.join(".")}.`.startsWith(`${props.group}.`),
  ),
);

const format = (value) => (Array.isArray(value) ? value.join(", ") : String(value));
</script>

<template>
  <table class="token-list">
    <thead>
      <tr>
        <th v-if="preview !== 'text'">Preview</th>
        <th>Token</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="token in list" :key="token.name">
        <td v-if="preview !== 'text'" class="token-preview">
          <span v-if="preview === 'swatch'" class="swatch" :style="{ background: `var(${token.name})` }" />
          <span v-else-if="preview === 'size'" class="bar" :style="{ width: `var(${token.name})` }" />
          <span v-else-if="preview === 'radius'" class="box" :style="{ borderRadius: `var(${token.name})` }" />
          <span v-else-if="preview === 'shadow'" class="box" :style="{ boxShadow: `var(${token.name})` }" />
          <span v-else-if="preview === 'font-size'" :style="{ fontSize: `var(${token.name})` }">Aa</span>
        </td>
        <td>
          <code>{{ token.name }}</code>
          <div v-if="token.description" class="token-description">{{ token.description }}</div>
        </td>
        <td class="token-value">
          <code v-if="token.reference">{{ token.reference }}</code>
          <div>
            {{ format(token.value) }}
            <span v-if="token.darkValue !== undefined" class="token-dark">/ dark: {{ format(token.darkValue) }}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.token-list {
  width: 100%;
  display: table;
}

.token-preview {
  width: 5rem;
}

.swatch,
.box {
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--ds-color-border-quiet);
}

.swatch {
  border-radius: var(--ds-radius-sm);
}

.box {
  background: var(--ds-color-surface-raised);
}

.bar {
  display: block;
  height: 0.75rem;
  min-width: 1px;
  background: var(--ds-color-primary-solid);
  border-radius: var(--ds-radius-sm);
}

.token-description,
.token-value {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.token-dark {
  white-space: nowrap;
}
</style>

<script setup>
import { reactive, computed } from "vue";
import { useComponentManifest } from "../composables/useComponentManifest.js";

const props = defineProps({
  tag: {
    type: String,
    required: true,
  },
});

const { fields } = useComponentManifest(props.tag);

function controlKindFor(type) {
  const text = type?.text ?? "string";
  if (text === "boolean") return "boolean";
  if (text === "number") return "number";
  if (text.includes('"')) return "select";
  return "text";
}

function parseOptions(typeText) {
  return [...typeText.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
}

function parseDefault(field) {
  if (field.default === undefined) {
    if (field.control === "boolean") return false;
    if (field.name === "text") return "Click me";
    return "";
  }
  try {
    return JSON.parse(field.default);
  } catch {
    return field.default;
  }
}

const controls = fields.map((field) => {
  const control = controlKindFor(field.type);
  return {
    ...field,
    control,
    options: control === "select" ? parseOptions(field.type.text) : null,
  };
});

const defaults = {};
const state = reactive({});
for (const field of controls) {
  defaults[field.name] = parseDefault(field);
  state[field.name] = defaults[field.name];
}

// Bound by property name so Vue assigns real booleans/strings through the
// element's own JS properties (Elena's reactive props) instead of
// stringifying them onto an HTML attribute.
const liveProps = computed(() => {
  const values = {};
  for (const field of controls) {
    values[field.name] = state[field.name];
  }
  return values;
});

// "text" is Elena's slot-content convention, not a regular attribute, so it
// renders as element content in the snippet rather than as an attribute.
const codeSnippet = computed(() => {
  const parts = [];
  let content = "";

  for (const field of controls) {
    const value = state[field.name];

    if (field.name === "text") {
      content = value ?? "";
      continue;
    }

    if (value === defaults[field.name]) {
      continue;
    }

    const key = field.attribute ?? field.name;
    if (field.control === "boolean") {
      if (value) parts.push(key);
    } else if (value !== "" && value != null) {
      parts.push(`${key}="${value}"`);
    }
  }

  const attrsText = parts.length ? " " + parts.join(" ") : "";
  return `<${props.tag}${attrsText}>${content}</${props.tag}>`;
});
</script>

<template>
  <div class="playground">
    <div class="playground-preview">
      <component :is="tag" v-bind="liveProps" />
    </div>

    <div class="playground-controls">
      <div v-for="field in controls" :key="field.name" class="playground-control">
        <label :for="`playground-${tag}-${field.name}`">{{ field.name }}</label>

        <select
          v-if="field.control === 'select'"
          :id="`playground-${tag}-${field.name}`"
          v-model="state[field.name]"
        >
          <option v-for="option in field.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <input
          v-else-if="field.control === 'boolean'"
          :id="`playground-${tag}-${field.name}`"
          type="checkbox"
          v-model="state[field.name]"
        />

        <input
          v-else-if="field.control === 'number'"
          :id="`playground-${tag}-${field.name}`"
          type="number"
          v-model.number="state[field.name]"
        />

        <input
          v-else
          :id="`playground-${tag}-${field.name}`"
          type="text"
          v-model="state[field.name]"
        />
      </div>
    </div>

    <pre class="playground-code"><code>{{ codeSnippet }}</code></pre>
  </div>
</template>

<style scoped>
.playground {
  border: 1px solid #f6f6f6;
  border-radius: 6px;
  margin-top: 1.25rem;
  overflow: hidden;
}

.playground-preview {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  border-bottom: 1px solid #f6f6f6;
}

.playground-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f6f6f6;
}

.playground-control {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;
}

.playground-control label {
  font-weight: 600;
  text-transform: capitalize;
}

.playground-code {
  margin: 0;
  padding: 1rem 1.5rem;
  font-size: 0.85rem;
  overflow-x: auto;
}
</style>

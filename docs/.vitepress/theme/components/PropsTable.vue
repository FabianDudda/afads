<script setup>
import { useComponentManifest } from "../composables/useComponentManifest.js";

const props = defineProps({
  tag: {
    type: String,
    required: true,
  },
});

const { fields } = useComponentManifest(props.tag);
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="field in fields" :key="field.name">
        <td>
          <code>{{ field.name }}</code>
        </td>
        <td>
          <code>{{ field.type?.text ?? "—" }}</code>
        </td>
        <td>
          <code>{{ field.default ?? "—" }}</code>
        </td>
        <td>{{ field.description }}</td>
      </tr>
    </tbody>
  </table>
</template>

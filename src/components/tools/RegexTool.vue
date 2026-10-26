<script setup>
import { computed, ref } from "vue";

const input = ref("order-2026\nuser-18\norder-2048");
const pattern = ref("(order)-(\\d+)");
const flags = ref("g");
const error = ref("");

const matches = computed(() => {
  try {
    error.value = "";
    const regex = new RegExp(pattern.value, flags.value);
    return [...input.value.matchAll(regex)].map((match, index) => ({
      index: index + 1,
      match: match[0],
      groups: match.slice(1).join(", "),
    }));
  } catch (err) {
    error.value = err.message;
    return [];
  }
});
</script>

<template>
  <div class="tool-form">
    <label class="stack">文本<textarea v-model="input" /></label>
    <div class="row">
      <label class="stack">表达式<input v-model="pattern" /></label>
      <label class="stack">Flags<input v-model="flags" /></label>
    </div>
    <pre v-if="error" class="result error">{{ error }}</pre>
    <table v-else>
      <thead><tr><th>#</th><th>匹配</th><th>分组</th></tr></thead>
      <tbody><tr v-for="row in matches" :key="row.index"><td>{{ row.index }}</td><td>{{ row.match }}</td><td>{{ row.groups }}</td></tr></tbody>
    </table>
  </div>
</template>

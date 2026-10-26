<script setup>
import { computed, ref } from "vue";

const start = ref(new Date().toISOString().slice(0, 10));
const end = ref(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
const result = computed(() => {
  const a = new Date(start.value);
  const b = new Date(end.value);
  const days = Math.round((b - a) / 86400000);
  return `相差天数: ${days}\n相差小时: ${days * 24}\n开始: ${a.toLocaleDateString()}\n结束: ${b.toLocaleDateString()}`;
});
</script>

<template>
  <div class="tool-form">
    <div class="row">
      <label class="stack">开始日期<input v-model="start" type="date" /></label>
      <label class="stack">结束日期<input v-model="end" type="date" /></label>
    </div>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

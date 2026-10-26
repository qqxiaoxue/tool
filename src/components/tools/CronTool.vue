<script setup>
import { computed, ref } from "vue";

const cron = ref("*/5 * * * *");
const result = computed(() => {
  const parts = cron.value.trim().split(/\s+/);
  if (parts.length !== 5) return "当前支持 5 段 Cron: 分 时 日 月 周";
  const names = ["分钟", "小时", "日期", "月份", "星期"];
  return parts.map((part, index) => `${names[index]}: ${part}`).join("\n");
});
</script>

<template>
  <div class="tool-form">
    <label class="stack">Cron<input v-model="cron" /></label>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

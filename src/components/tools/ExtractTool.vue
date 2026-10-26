<script setup>
import { computed, ref } from "vue";

const props = defineProps({ tool: { type: Object, required: true } });
const input = ref("官网 https://example.com 联系 dev@example.com，订单号 20260609");

const result = computed(() => {
  const patterns = {
    links: /https?:\/\/[^\s"'<>]+/g,
    emails: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
    numbers: /[-+]?\d*\.?\d+/g,
  };
  return [...new Set(input.value.match(patterns[props.tool.mode]) || [])].join("\n");
});
</script>

<template>
  <div class="tool-form">
    <label class="stack">文本<textarea v-model="input" /></label>
    <pre class="result">{{ result || "无匹配" }}</pre>
  </div>
</template>

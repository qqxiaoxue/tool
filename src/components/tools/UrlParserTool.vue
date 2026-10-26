<script setup>
import { computed, ref } from "vue";

const input = ref("https://example.com/search?q=tools&sort=hot#top");
const result = computed(() => {
  try {
    const url = new URL(input.value);
    const params = [...url.searchParams.entries()].map(([key, value]) => `${key}: ${value}`).join("\n");
    return `协议: ${url.protocol}\n主机: ${url.host}\n路径: ${url.pathname}\n参数:\n${params || "-"}\nHash: ${url.hash || "-"}`;
  } catch (err) {
    return err.message;
  }
});
</script>

<template>
  <div class="tool-form">
    <label class="stack">URL<input v-model="input" /></label>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

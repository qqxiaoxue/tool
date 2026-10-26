<script setup>
import { computed, ref } from "vue";

const input = ref(navigator.userAgent);
const result = computed(() => {
  const ua = input.value;
  const browser = ua.includes("Edg/") ? "Edge" : ua.includes("Chrome/") ? "Chrome" : ua.includes("Firefox/") ? "Firefox" : ua.includes("Safari/") ? "Safari" : "Unknown";
  const os = ua.includes("Windows") ? "Windows" : ua.includes("Mac OS") ? "macOS" : ua.includes("Android") ? "Android" : ua.includes("iPhone") ? "iOS" : "Unknown";
  const engine = ua.includes("AppleWebKit") ? "WebKit/Blink" : ua.includes("Gecko") ? "Gecko" : "Unknown";
  return `浏览器: ${browser}\n系统: ${os}\n引擎: ${engine}`;
});
</script>

<template>
  <div class="tool-form">
    <label class="stack">User-Agent<textarea v-model="input" /></label>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const value = ref("255");
const from = ref(10);
const number = computed(() => parseInt(value.value, Number(from.value)));
</script>

<template>
  <div class="tool-form">
    <div class="row">
      <label class="stack">数值<input v-model="value" /></label>
      <label class="stack">原进制<select v-model="from"><option>2</option><option>8</option><option>10</option><option>16</option></select></label>
    </div>
    <pre class="result">{{ Number.isFinite(number) ? `BIN: ${number.toString(2)}\nOCT: ${number.toString(8)}\nDEC: ${number.toString(10)}\nHEX: ${number.toString(16).toUpperCase()}` : '无效数字' }}</pre>
  </div>
</template>

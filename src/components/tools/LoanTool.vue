<script setup>
import { computed, ref } from "vue";
import { formatNumber } from "../../utils/text";

const principal = ref(1000000);
const years = ref(30);
const rate = ref(3.6);
const result = computed(() => {
  const p = Number(principal.value);
  const n = Number(years.value) * 12;
  const r = Number(rate.value) / 100 / 12;
  const monthly = (p * r * (1 + r) ** n) / ((1 + r) ** n - 1);
  return `等额本息月供: ${formatNumber(monthly)}\n总还款: ${formatNumber(monthly * n)}\n总利息: ${formatNumber(monthly * n - p)}`;
});
</script>

<template>
  <div class="tool-form">
    <div class="triple">
      <label class="stack">本金<input v-model="principal" type="number" /></label>
      <label class="stack">年限<input v-model="years" type="number" /></label>
      <label class="stack">年利率 %<input v-model="rate" type="number" /></label>
    </div>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

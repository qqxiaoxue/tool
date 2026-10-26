<script setup>
import { computed, ref } from "vue";
import { formatNumber } from "../../utils/text";

const a = ref(20);
const b = ref(80);
const result = computed(() => {
  const x = Number(a.value);
  const y = Number(b.value);
  return `${x} 是 ${y} 的 ${formatNumber((x / y) * 100)}%\n${y} 增加 ${x}% = ${formatNumber(y * (1 + x / 100))}\n${y} 减少 ${x}% = ${formatNumber(y * (1 - x / 100))}`;
});
</script>

<template>
  <div class="tool-form">
    <div class="row">
      <label class="stack">数值 A<input v-model="a" type="number" /></label>
      <label class="stack">数值 B<input v-model="b" type="number" /></label>
    </div>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

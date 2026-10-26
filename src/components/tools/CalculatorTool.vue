<script setup>
import { computed, ref } from "vue";

const expr = ref("(12 + 8) * 3 / 2");
const result = computed(() => {
  if (!/^[\d+\-*/().%\s]+$/.test(expr.value)) return "只支持数字和基础运算符";
  try {
    return Function(`"use strict";return (${expr.value})`)();
  } catch (err) {
    return err.message;
  }
});
</script>

<template>
  <div class="tool-form">
    <label class="stack">表达式<input v-model="expr" /></label>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { formatNumber } from "../../utils/text";

const height = ref(175);
const weight = ref(70);
const bmi = computed(() => Number(weight.value) / (Number(height.value) / 100) ** 2);
const level = computed(() => (bmi.value < 18.5 ? "偏瘦" : bmi.value < 24 ? "正常" : bmi.value < 28 ? "超重" : "肥胖"));
</script>

<template>
  <div class="tool-form">
    <div class="row">
      <label class="stack">身高 cm<input v-model="height" type="number" /></label>
      <label class="stack">体重 kg<input v-model="weight" type="number" /></label>
    </div>
    <pre class="result">BMI: {{ formatNumber(bmi) }}&#10;范围: {{ level }}</pre>
  </div>
</template>

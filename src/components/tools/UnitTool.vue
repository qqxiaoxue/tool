<script setup>
import { computed, ref, watch } from "vue";
import { formatNumber } from "../../utils/text";

const type = ref("length");
const value = ref(12.5);
const from = ref("m");
const to = ref("km");
const units = {
  length: { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, ft: 0.3048, mile: 1609.344 },
  weight: { mg: 0.000001, g: 0.001, kg: 1, t: 1000, oz: 0.0283495231, lb: 0.45359237 },
  temperature: { Celsius: "c", Fahrenheit: "f", Kelvin: "k" },
};
const names = computed(() => Object.keys(units[type.value]));
const result = computed(() => {
  const number = Number(value.value);
  if (!Number.isFinite(number)) return "请输入有效数字";
  if (type.value === "temperature") {
    let c = number;
    if (from.value === "Fahrenheit") c = (number - 32) * (5 / 9);
    if (from.value === "Kelvin") c = number - 273.15;
    let out = c;
    if (to.value === "Fahrenheit") out = c * (9 / 5) + 32;
    if (to.value === "Kelvin") out = c + 273.15;
    return `${number} ${from.value} = ${formatNumber(out)} ${to.value}`;
  }
  return `${number} ${from.value} = ${formatNumber((number * units[type.value][from.value]) / units[type.value][to.value])} ${to.value}`;
});

watch(type, () => {
  from.value = names.value[0];
  to.value = names.value[Math.min(2, names.value.length - 1)];
});
</script>

<template>
  <div class="tool-form">
    <div class="row">
      <label class="stack">类型<select v-model="type"><option value="length">长度</option><option value="weight">重量</option><option value="temperature">温度</option></select></label>
      <label class="stack">数值<input v-model="value" type="number" /></label>
    </div>
    <div class="row">
      <label class="stack">从<select v-model="from"><option v-for="name in names" :key="name">{{ name }}</option></select></label>
      <label class="stack">到<select v-model="to"><option v-for="name in names" :key="name">{{ name }}</option></select></label>
    </div>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

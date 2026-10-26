<script setup>
import { ref, watch } from "vue";

const props = defineProps({ tool: { type: Object, required: true } });
const length = ref(18);
const count = ref(5);
const min = ref(1);
const max = ref(100);
const result = ref("");

function randomString(size) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
  const bytes = new Uint32Array(size);
  crypto.getRandomValues(bytes);
  return [...bytes].map((value) => chars[value % chars.length]).join("");
}

function run() {
  const total = Math.min(40, Math.max(1, Number(count.value) || 1));
  if (props.tool.mode === "uuid") result.value = Array.from({ length: total }, () => crypto.randomUUID()).join("\n");
  if (props.tool.mode === "password") result.value = Array.from({ length: total }, () => randomString(Math.min(128, Math.max(8, Number(length.value) || 18)))).join("\n");
  if (props.tool.mode === "number") {
    const low = Number(min.value);
    const high = Number(max.value);
    result.value = Array.from({ length: total }, () => Math.floor(Math.random() * (high - low + 1)) + low).join("\n");
  }
}

watch(() => props.tool.id, run, { immediate: true });
</script>

<template>
  <div class="tool-form">
    <div class="row" v-if="tool.mode !== 'number'">
      <label class="stack">长度<input v-model="length" type="number" /></label>
      <label class="stack">数量<input v-model="count" type="number" /></label>
    </div>
    <div class="triple" v-else>
      <label class="stack">最小<input v-model="min" type="number" /></label>
      <label class="stack">最大<input v-model="max" type="number" /></label>
      <label class="stack">数量<input v-model="count" type="number" /></label>
    </div>
    <button class="primary" type="button" @click="run">生成</button>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

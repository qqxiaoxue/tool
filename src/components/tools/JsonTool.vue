<script setup>
import { ref } from "vue";

const input = ref('{"hello":"world","items":[1,2,3]}');
const result = ref("");
const error = ref("");

function run(space = 2) {
  try {
    error.value = "";
    result.value = JSON.stringify(JSON.parse(input.value), null, space);
  } catch (err) {
    error.value = err.message;
    result.value = "";
  }
}

run();
</script>

<template>
  <div class="tool-form">
    <label class="stack">输入<textarea v-model="input" /></label>
    <div class="actions">
      <button class="primary" type="button" @click="run(2)">格式化</button>
      <button class="secondary" type="button" @click="run(0)">压缩</button>
      <button class="secondary" type="button" @click="input = ''; result = ''; error = ''">清空</button>
    </div>
    <pre class="result" :class="{ error }">{{ error || result }}</pre>
  </div>
</template>

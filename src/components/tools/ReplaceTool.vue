<script setup>
import { ref } from "vue";

const input = ref("foo bar foo\nhello foo");
const pattern = ref("foo");
const replacement = ref("quanta");
const useRegex = ref(false);
const result = ref("");
const error = ref("");

function run() {
  try {
    error.value = "";
    const matcher = useRegex.value ? new RegExp(pattern.value, "g") : pattern.value;
    result.value = input.value.replaceAll(matcher, replacement.value);
  } catch (err) {
    error.value = err.message;
  }
}

run();
</script>

<template>
  <div class="tool-form">
    <label class="stack">文本<textarea v-model="input" /></label>
    <div class="row">
      <label class="stack">查找<input v-model="pattern" /></label>
      <label class="stack">替换为<input v-model="replacement" /></label>
    </div>
    <label class="muted"><input v-model="useRegex" type="checkbox" /> 使用正则</label>
    <button class="primary" type="button" @click="run">替换</button>
    <pre class="result" :class="{ error }">{{ error || result }}</pre>
  </div>
</template>

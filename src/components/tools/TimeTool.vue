<script setup>
import { ref } from "vue";

const ts = ref(Date.now());
const date = ref("");
const result = ref("");

function toLocalInputValue(value) {
  return new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function toDate() {
  const raw = Number(ts.value);
  const value = new Date(String(ts.value).length === 10 ? raw * 1000 : raw);
  date.value = toLocalInputValue(value);
  result.value = `本地: ${value.toLocaleString()}\nUTC: ${value.toISOString()}\n秒: ${Math.floor(value.getTime() / 1000)}\n毫秒: ${value.getTime()}`;
}

function toTimestamp() {
  ts.value = new Date(date.value).getTime();
  toDate();
}

toDate();
</script>

<template>
  <div class="tool-form">
    <div class="row">
      <label class="stack">时间戳<input v-model="ts" /></label>
      <label class="stack">日期时间<input v-model="date" type="datetime-local" /></label>
    </div>
    <div class="actions">
      <button class="primary" type="button" @click="ts = Date.now(); toDate()">当前</button>
      <button class="secondary" type="button" @click="toDate">转日期</button>
      <button class="secondary" type="button" @click="toTimestamp">转时间戳</button>
    </div>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

<script setup>
import { ref } from "vue";

const input = ref("name,score\nJSON,99\nBase64,97");
const result = ref("");
const error = ref("");

function csvToJson() {
  try {
    error.value = "";
    const rows = input.value.trim().split(/\r?\n/).map((line) => line.split(",").map((cell) => cell.trim()));
    const headers = rows.shift() || [];
    result.value = JSON.stringify(rows.map((row) => Object.fromEntries(headers.map((key, index) => [key, row[index] || ""]))), null, 2);
  } catch (err) {
    error.value = err.message;
  }
}

function csvToMarkdown() {
  const rows = input.value.trim().split(/\r?\n/).map((line) => line.split(",").map((cell) => cell.trim()));
  const headers = rows.shift() || [];
  result.value = [`| ${headers.join(" | ")} |`, `| ${headers.map(() => "---").join(" | ")} |`, ...rows.map((row) => `| ${row.join(" | ")} |`)].join("\n");
  error.value = "";
}

csvToJson();
</script>

<template>
  <div class="tool-form">
    <label class="stack">CSV<textarea v-model="input" /></label>
    <div class="actions">
      <button class="primary" type="button" @click="csvToJson">转 JSON</button>
      <button class="secondary" type="button" @click="csvToMarkdown">转 Markdown 表格</button>
    </div>
    <pre class="result" :class="{ error }">{{ error || result }}</pre>
  </div>
</template>

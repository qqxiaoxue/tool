<script setup>
import { ref, watch } from "vue";

const props = defineProps({ tool: { type: Object, required: true } });
const input = ref("<main><h1>Quanta</h1><p>Tools</p></main>");
const result = ref("");

function formatHtml(value) {
  return value.replace(/></g, ">\n<").split("\n").map((line) => line.trim()).join("\n");
}

function formatCss(value) {
  return value.replace(/\{/g, " {\n  ").replace(/;/g, ";\n  ").replace(/\}/g, "\n}\n").replace(/\n\s+\n/g, "\n").trim();
}

function formatSql(value) {
  return value.replace(/\b(select|from|where|group by|order by|limit|insert|update|delete|values|set)\b/gi, "\n$1").trim();
}

function run() {
  if (props.tool.mode === "html") result.value = formatHtml(input.value);
  if (props.tool.mode === "css") result.value = formatCss(input.value);
  if (props.tool.mode === "sql") result.value = formatSql(input.value);
}

watch(() => props.tool.id, () => {
  if (props.tool.mode === "css") input.value = "body{color:#121816;background:#f4f6f2}.card{padding:16px;border-radius:8px}";
  if (props.tool.mode === "sql") input.value = "select id,name from users where status='active' order by id desc limit 20";
  run();
}, { immediate: true });
</script>

<template>
  <div class="tool-form">
    <label class="stack">代码<textarea v-model="input" /></label>
    <button class="primary" type="button" @click="run">格式化</button>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

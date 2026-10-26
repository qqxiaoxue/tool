<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({ tool: { type: Object, required: true } });
const input = ref("Quanta Tools\n在线工具箱\nQuanta Tools");
const result = ref("");

const stats = computed(() => ({
  chars: [...input.value].length,
  words: input.value.trim() ? input.value.trim().split(/\s+/).length : 0,
  lines: input.value ? input.value.split(/\r\n|\r|\n/).length : 0,
}));

function run(action = "default") {
  const lines = input.value.split(/\r\n|\r|\n/);
  if (props.tool.mode === "stats") result.value = input.value;
  if (props.tool.mode === "case") {
    if (action === "lower") result.value = input.value.toLowerCase();
    else if (action === "title") result.value = input.value.replace(/\S+/g, (part) => part[0].toUpperCase() + part.slice(1).toLowerCase());
    else result.value = input.value.toUpperCase();
  }
  if (props.tool.mode === "sort") result.value = [...lines].sort((a, b) => a.localeCompare(b, "zh-CN")).join("\n");
  if (props.tool.mode === "dedupe") result.value = [...new Set(lines)].join("\n");
  if (props.tool.mode === "lineNumber") result.value = lines.map((line, index) => `${index + 1}. ${line}`).join("\n");
  if (props.tool.mode === "trim") result.value = input.value.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  if (props.tool.mode === "reverse") result.value = [...input.value].reverse().join("");
  if (props.tool.mode === "join") result.value = lines.map((line) => line.trim()).filter(Boolean).join(" ");
}

watch(() => props.tool.id, () => run(), { immediate: true });
</script>

<template>
  <div class="tool-form">
    <label class="stack">文本<textarea v-model="input" @input="run()" /></label>
    <div class="stat-grid">
      <div class="stat"><strong>{{ stats.chars }}</strong><span>字符</span></div>
      <div class="stat"><strong>{{ stats.words }}</strong><span>词</span></div>
      <div class="stat"><strong>{{ stats.lines }}</strong><span>行</span></div>
    </div>
    <div class="actions">
      <button class="primary" type="button" @click="run()">执行</button>
      <button v-if="tool.mode === 'case'" class="secondary" type="button" @click="run('lower')">小写</button>
      <button v-if="tool.mode === 'case'" class="secondary" type="button" @click="run('title')">标题化</button>
    </div>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

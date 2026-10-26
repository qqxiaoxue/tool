<script setup>
import { computed, ref } from "vue";
import { escapeHtml } from "../../utils/text";

const input = ref("# Quanta Tools\n\n- JSON\n- Base64\n- Hash\n\n**本地处理**");
const html = computed(() => {
  return escapeHtml(input.value)
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.*)$/gm, "<li>$1</li>")
    .replace(/\n/g, "<br />");
});
</script>

<template>
  <div class="tool-form">
    <label class="stack">Markdown<textarea v-model="input" /></label>
    <div class="preview-pane" v-html="html"></div>
  </div>
</template>

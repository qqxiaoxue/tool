<script setup>
import { computed, ref, watch } from "vue";
import { decodeBase64, encodeBase64, escapeHtml, fromUnicode, hexToBytes, toUnicode, unescapeHtml } from "../../utils/text";

const props = defineProps({ tool: { type: Object, required: true } });
const input = ref("你好，Quanta Tools");
const result = ref("");
const error = ref("");

const labels = computed(() => {
  const map = {
    base64: ["编码", "解码"],
    url: ["URL 编码", "URL 解码"],
    html: ["转义", "反转义"],
    hex: ["文本转 HEX", "HEX 转文本"],
    unicode: ["转 Unicode", "Unicode 转文本"],
  };
  return map[props.tool.mode] || ["转换", "反转换"];
});

function convert(reverse = false) {
  try {
    error.value = "";
    const value = input.value;
    if (props.tool.mode === "base64") result.value = reverse ? decodeBase64(value) : encodeBase64(value);
    if (props.tool.mode === "url") result.value = reverse ? decodeURIComponent(value) : encodeURIComponent(value);
    if (props.tool.mode === "html") result.value = reverse ? unescapeHtml(value) : escapeHtml(value);
    if (props.tool.mode === "hex") {
      result.value = reverse ? new TextDecoder().decode(hexToBytes(value)) : [...new TextEncoder().encode(value)].map((byte) => byte.toString(16).padStart(2, "0")).join(" ");
    }
    if (props.tool.mode === "unicode") result.value = reverse ? fromUnicode(value) : toUnicode(value);
  } catch (err) {
    error.value = err.message;
    result.value = "";
  }
}

watch(() => props.tool.id, () => convert(false), { immediate: true });
</script>

<template>
  <div class="tool-form">
    <label class="stack">输入<textarea v-model="input" /></label>
    <div class="actions">
      <button class="primary" type="button" @click="convert(false)">{{ labels[0] }}</button>
      <button class="secondary" type="button" @click="convert(true)">{{ labels[1] }}</button>
      <button class="secondary" type="button" @click="input = result">结果转输入</button>
    </div>
    <pre class="result" :class="{ error }">{{ error || result }}</pre>
  </div>
</template>

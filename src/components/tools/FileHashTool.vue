<script setup>
import { ref } from "vue";
import { fileDigest } from "../../utils/text";

const algorithm = ref("SHA-256");
const result = ref("");

async function onFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  result.value = `${file.name}\n${algorithm.value}: ${await fileDigest(file, algorithm.value)}`;
}
</script>

<template>
  <div class="tool-form">
    <label class="stack">算法<select v-model="algorithm"><option>SHA-1</option><option>SHA-256</option><option>SHA-384</option><option>SHA-512</option></select></label>
    <label class="stack">文件<input type="file" @change="onFile" /></label>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

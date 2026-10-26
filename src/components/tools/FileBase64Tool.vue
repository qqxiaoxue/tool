<script setup>
import { ref } from "vue";

const result = ref("");

function onFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    result.value = reader.result;
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <div class="tool-form">
    <label class="stack">文件<input type="file" @change="onFile" /></label>
    <textarea v-model="result" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const result = ref("");
const preview = ref("");

function onFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    result.value = `文件名: ${file.name}\n类型: ${file.type}\n大小: ${(file.size / 1024).toFixed(2)} KB\n尺寸: ${img.width} x ${img.height}`;
    preview.value = url;
  };
  img.src = url;
}
</script>

<template>
  <div class="tool-form">
    <label class="stack">图片<input type="file" accept="image/*" @change="onFile" /></label>
    <img v-if="preview" class="image-preview" :src="preview" alt="" />
    <pre class="result">{{ result }}</pre>
  </div>
</template>

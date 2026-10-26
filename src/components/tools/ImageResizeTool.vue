<script setup>
import { ref } from "vue";

const width = ref(800);
const output = ref("");
const preview = ref("");

function onFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    const ratio = Number(width.value) / img.width;
    const canvas = document.createElement("canvas");
    canvas.width = Number(width.value);
    canvas.height = Math.round(img.height * ratio);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    output.value = canvas.toDataURL("image/jpeg", 0.88);
    preview.value = output.value;
  };
  img.src = url;
}
</script>

<template>
  <div class="tool-form">
    <label class="stack">目标宽度<input v-model="width" type="number" /></label>
    <label class="stack">图片<input type="file" accept="image/*" @change="onFile" /></label>
    <img v-if="preview" class="image-preview" :src="preview" alt="" />
    <textarea v-if="output" v-model="output" />
  </div>
</template>

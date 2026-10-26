<script setup>
import { computed, ref } from "vue";

const hex = ref("#147a70");

const rgb = computed(() => {
  const clean = hex.value.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
});

const hsl = computed(() => {
  if (!rgb.value) return null;
  let { r, g, b } = rgb.value;
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    if (max === g) h = (b - r) / d + 2;
    if (max === b) h = (r - g) / d + 4;
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
});
</script>

<template>
  <div class="tool-form">
    <label class="stack">HEX<input v-model="hex" /></label>
    <div class="swatch" :style="{ background: rgb ? hex : '#fff' }"></div>
    <pre class="result">{{ rgb ? `HEX: ${hex.toUpperCase()}\nRGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})\nHSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '无效颜色' }}</pre>
  </div>
</template>

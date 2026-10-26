<script setup>
import { computed, ref } from "vue";
import { decodeBase64, encodeBase64, fileDigest, formatNumber, shaDigest } from "../../utils/text";

const props = defineProps({
  tool: {
    type: Object,
    required: true,
  },
});

const text = ref("Quanta Tools");
const result = ref("");
const expr = ref("12 * (3 + 4)");
const url = ref("https://example.com/search?q=tools#top");
const start = ref(new Date().toISOString().slice(0, 10));
const end = ref(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
const lat1 = ref(31.2304);
const lng1 = ref(121.4737);
const lat2 = ref(39.9042);
const lng2 = ref(116.4074);
const fileOutput = ref("");

const mode = computed(() => {
  if (["text", "convert", "crypto", "network", "math", "chart", "geo", "image", "file", "time"].includes(props.tool.category)) {
    return props.tool.category;
  }
  return "more";
});

function runText(action = "stats") {
  const lines = text.value.split(/\r?\n/);
  if (action === "trim") result.value = text.value.replace(/[ \t]+/g, " ").trim();
  else if (action === "reverse") result.value = [...text.value].reverse().join("");
  else result.value = `字符: ${[...text.value].length}\n词: ${text.value.trim() ? text.value.trim().split(/\s+/).length : 0}\n行: ${lines.length}`;
}

function runConvert(action = "base64") {
  try {
    if (action === "base64") result.value = encodeBase64(text.value);
    if (action === "base64decode") result.value = decodeBase64(text.value);
    if (action === "url") result.value = encodeURIComponent(text.value);
    if (action === "urldecode") result.value = decodeURIComponent(text.value);
  } catch (error) {
    result.value = error.message;
  }
}

async function runCrypto() {
  result.value = await shaDigest(text.value, "SHA-256");
}

function runUrl() {
  try {
    const parsed = new URL(url.value);
    result.value = `协议: ${parsed.protocol}\n主机: ${parsed.host}\n路径: ${parsed.pathname}\n参数: ${[...parsed.searchParams.entries()].map(([key, value]) => `${key}=${value}`).join(", ") || "-"}\nHash: ${parsed.hash || "-"}`;
  } catch (error) {
    result.value = error.message;
  }
}

function runMath() {
  if (!/^[\d+\-*/().%\s]+$/.test(expr.value)) {
    result.value = "只支持数字和基础运算符";
    return;
  }
  try {
    result.value = String(Function(`"use strict";return (${expr.value})`)());
  } catch (error) {
    result.value = error.message;
  }
}

function runDate() {
  const days = Math.round((new Date(end.value) - new Date(start.value)) / 86400000);
  result.value = `相差天数: ${days}\n相差小时: ${days * 24}`;
}

function runGeo() {
  const toRad = (value) => (Number(value) * Math.PI) / 180;
  const dLat = toRad(lat2.value - lat1.value);
  const dLng = toRad(lng2.value - lng1.value);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1.value)) * Math.cos(toRad(lat2.value)) * Math.sin(dLng / 2) ** 2;
  result.value = `球面距离: ${formatNumber(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))} km`;
}

async function onFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (mode.value === "file") {
    fileOutput.value = `${file.name}\n${(file.size / 1024).toFixed(2)} KB\nSHA-256: ${await fileDigest(file)}`;
  } else {
    const src = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      fileOutput.value = `${file.name}\n${(file.size / 1024).toFixed(2)} KB\n${image.width} x ${image.height}`;
      URL.revokeObjectURL(src);
    };
    image.src = src;
  }
}
</script>

<template>
  <div class="tool-form">
    <div class="preview-pane">
      <p><strong>{{ tool.name }}</strong></p>
      <p class="muted">本地基础版，无外链、无广告。专项功能会继续逐个增强。</p>
    </div>

    <template v-if="mode === 'text'">
      <label class="stack">文本<textarea v-model="text" /></label>
      <div class="actions">
        <button class="primary" type="button" @click="runText('stats')">统计</button>
        <button class="secondary" type="button" @click="runText('trim')">去空白</button>
        <button class="secondary" type="button" @click="runText('reverse')">反转</button>
      </div>
    </template>

    <template v-else-if="mode === 'convert'">
      <label class="stack">文本<textarea v-model="text" /></label>
      <div class="actions">
        <button class="primary" type="button" @click="runConvert('base64')">Base64</button>
        <button class="secondary" type="button" @click="runConvert('base64decode')">Base64 解码</button>
        <button class="secondary" type="button" @click="runConvert('url')">URL 编码</button>
        <button class="secondary" type="button" @click="runConvert('urldecode')">URL 解码</button>
      </div>
    </template>

    <template v-else-if="mode === 'crypto'">
      <label class="stack">文本<textarea v-model="text" /></label>
      <button class="primary" type="button" @click="runCrypto">SHA-256</button>
    </template>

    <template v-else-if="mode === 'network'">
      <label class="stack">URL<input v-model="url" /></label>
      <button class="primary" type="button" @click="runUrl">解析</button>
    </template>

    <template v-else-if="mode === 'math' || mode === 'chart'">
      <label class="stack">表达式<input v-model="expr" /></label>
      <button class="primary" type="button" @click="runMath">计算</button>
    </template>

    <template v-else-if="mode === 'geo'">
      <div class="row">
        <label class="stack">纬度 1<input v-model="lat1" type="number" /></label>
        <label class="stack">经度 1<input v-model="lng1" type="number" /></label>
      </div>
      <div class="row">
        <label class="stack">纬度 2<input v-model="lat2" type="number" /></label>
        <label class="stack">经度 2<input v-model="lng2" type="number" /></label>
      </div>
      <button class="primary" type="button" @click="runGeo">计算距离</button>
    </template>

    <template v-else-if="mode === 'image' || mode === 'file'">
      <label class="stack">文件<input :accept="mode === 'image' ? 'image/*' : undefined" type="file" @change="onFile" /></label>
      <pre class="result">{{ fileOutput }}</pre>
    </template>

    <template v-else>
      <div class="row">
        <label class="stack">开始日期<input v-model="start" type="date" /></label>
        <label class="stack">结束日期<input v-model="end" type="date" /></label>
      </div>
      <button class="primary" type="button" @click="runDate">计算</button>
    </template>

    <pre v-if="!['image', 'file'].includes(mode)" class="result">{{ result }}</pre>
  </div>
</template>

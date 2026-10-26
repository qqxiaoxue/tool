<script setup>
import { ref } from "vue";
import { bytesToHex, shaDigest } from "../../utils/text";

const props = defineProps({ tool: { type: Object, required: true } });
const input = ref("Quanta Tools");
const secret = ref("secret");
const algorithm = ref("SHA-256");
const result = ref("");

async function run() {
  if (props.tool.mode === "hmac") {
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret.value), { name: "HMAC", hash: algorithm.value }, false, ["sign"]);
    const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(input.value));
    result.value = bytesToHex(new Uint8Array(signature));
  } else {
    result.value = await shaDigest(input.value, algorithm.value);
  }
}

run();
</script>

<template>
  <div class="tool-form">
    <label class="stack">文本<textarea v-model="input" /></label>
    <div class="row">
      <label class="stack">算法<select v-model="algorithm" @change="run"><option>SHA-1</option><option>SHA-256</option><option>SHA-384</option><option>SHA-512</option></select></label>
      <label v-if="tool.mode === 'hmac'" class="stack">密钥<input v-model="secret" /></label>
    </div>
    <button class="primary" type="button" @click="run">生成</button>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

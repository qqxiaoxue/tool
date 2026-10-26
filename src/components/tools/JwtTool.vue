<script setup>
import { ref } from "vue";
import { decodeBase64 } from "../../utils/text";

const input = ref("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUXVhbnRhIiwiYWRtaW4iOmZhbHNlfQ.signature");
const result = ref("");
const error = ref("");

function decodePart(value) {
  return JSON.stringify(JSON.parse(decodeBase64(value.replace(/-/g, "+").replace(/_/g, "/"))), null, 2);
}

function run() {
  try {
    error.value = "";
    const [header, payload, signature] = input.value.split(".");
    result.value = `Header\n${decodePart(header)}\n\nPayload\n${decodePart(payload)}\n\nSignature\n${signature || ""}`;
  } catch (err) {
    error.value = err.message;
  }
}

run();
</script>

<template>
  <div class="tool-form">
    <label class="stack">JWT<textarea v-model="input" /></label>
    <button class="primary" type="button" @click="run">解析</button>
    <pre class="result" :class="{ error }">{{ error || result }}</pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { decodeBase64, encodeBase64 } from "../../utils/text";

const input = ref("Quanta Tools");
const password = ref("strong-password");
const result = ref("");
const error = ref("");

async function deriveKey(salt) {
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(password.value), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}

async function encrypt() {
  try {
    error.value = "";
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(salt);
    const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(input.value)));
    result.value = encodeBase64(JSON.stringify({ salt: [...salt], iv: [...iv], data: [...cipher] }));
  } catch (err) {
    error.value = err.message;
  }
}

async function decrypt() {
  try {
    error.value = "";
    const payload = JSON.parse(decodeBase64(input.value));
    const key = await deriveKey(new Uint8Array(payload.salt));
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(payload.iv) }, key, new Uint8Array(payload.data));
    result.value = new TextDecoder().decode(plain);
  } catch (err) {
    error.value = err.message;
  }
}
</script>

<template>
  <div class="tool-form">
    <label class="stack">文本 / 密文<textarea v-model="input" /></label>
    <label class="stack">密码<input v-model="password" type="password" /></label>
    <div class="actions">
      <button class="primary" type="button" @click="encrypt">加密</button>
      <button class="secondary" type="button" @click="decrypt">解密</button>
      <button class="secondary" type="button" @click="input = result">结果转输入</button>
    </div>
    <pre class="result" :class="{ error }">{{ error || result }}</pre>
  </div>
</template>

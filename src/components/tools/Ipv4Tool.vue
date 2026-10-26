<script setup>
import { computed, ref } from "vue";

const input = ref("192.168.1.25/24");

function ipToInt(ip) {
  return ip.split(".").reduce((sum, part) => (sum << 8) + Number(part), 0) >>> 0;
}

function intToIp(value) {
  return [24, 16, 8, 0].map((shift) => (value >>> shift) & 255).join(".");
}

const result = computed(() => {
  const [ip, bitsRaw] = input.value.split("/");
  const bits = Number(bitsRaw);
  if (!/^\d+\.\d+\.\d+\.\d+$/.test(ip) || bits < 0 || bits > 32) return "格式示例: 192.168.1.25/24";
  const mask = (0xffffffff << (32 - bits)) >>> 0;
  const network = ipToInt(ip) & mask;
  const broadcast = network | (~mask >>> 0);
  return `掩码: ${intToIp(mask)}\n网络: ${intToIp(network)}\n广播: ${intToIp(broadcast)}\n可用主机: ${Math.max(0, 2 ** (32 - bits) - 2)}`;
});
</script>

<template>
  <div class="tool-form">
    <label class="stack">CIDR<input v-model="input" /></label>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

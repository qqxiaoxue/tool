export function encodeBase64(value) {
  return btoa(String.fromCharCode(...new TextEncoder().encode(value)));
}

export function decodeBase64(value) {
  return new TextDecoder().decode(Uint8Array.from(atob(value), (char) => char.charCodeAt(0)));
}

export function bytesToHex(bytes) {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function hexToBytes(hex) {
  const clean = hex.replace(/\s+/g, "");
  if (!/^[0-9a-f]*$/i.test(clean) || clean.length % 2) throw new Error("HEX 长度或字符无效");
  return Uint8Array.from(clean.match(/.{2}/g) || [], (part) => parseInt(part, 16));
}

export function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function unescapeHtml(value) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

export function toUnicode(value) {
  return [...value].map((char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`).join("");
}

export function fromUnicode(value) {
  return value.replace(/\\u([0-9a-f]{4})/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

export function formatNumber(value) {
  if (!Number.isFinite(value)) return "NaN";
  return Number.parseFloat(value.toFixed(10)).toString();
}

export async function shaDigest(value, algorithm = "SHA-256") {
  const buffer = await crypto.subtle.digest(algorithm, new TextEncoder().encode(value));
  return bytesToHex(new Uint8Array(buffer));
}

export async function fileDigest(file, algorithm = "SHA-256") {
  const buffer = await file.arrayBuffer();
  const hash = await crypto.subtle.digest(algorithm, buffer);
  return bytesToHex(new Uint8Array(hash));
}

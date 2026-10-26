<script setup>
const rows = [
  [200, "OK"],
  [201, "Created"],
  [204, "No Content"],
  [301, "Moved Permanently"],
  [302, "Found"],
  [304, "Not Modified"],
  [400, "Bad Request"],
  [401, "Unauthorized"],
  [403, "Forbidden"],
  [404, "Not Found"],
  [409, "Conflict"],
  [422, "Unprocessable Content"],
  [429, "Too Many Requests"],
  [500, "Internal Server Error"],
  [502, "Bad Gateway"],
  [503, "Service Unavailable"],
];
</script>

<template>
  <table>
    <thead><tr><th>状态码</th><th>含义</th></tr></thead>
    <tbody><tr v-for="row in rows" :key="row[0]"><td>{{ row[0] }}</td><td>{{ row[1] }}</td></tr></tbody>
  </table>
</template>

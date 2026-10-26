<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { categories } from "./data/categories";
import { tools } from "./data/tools";
import ToolHost from "./components/ToolHost.vue";

const query = ref("");
const activeCategory = ref("all");
const sortMode = ref("hot");
const activeId = ref("");
const time = ref("");

const byCategory = computed(() => {
  return categories.map((category) => ({
    ...category,
    count: category.id === "all" ? tools.length : tools.filter((tool) => tool.category === category.id).length,
  }));
});

const activeTool = computed(() => tools.find((tool) => tool.id === activeId.value) || null);
const activeCategoryName = computed(
  () => categories.find((category) => category.id === activeTool.value?.category)?.name || activeTool.value?.category || "",
);
const focusedCount = computed(() => tools.filter((tool) => tool.component !== "PlaceholderTool").length);
const basicCount = computed(() => tools.length - focusedCount.value);

const filteredTools = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return tools
    .filter((tool) => {
      const inCategory = activeCategory.value === "all" || tool.category === activeCategory.value;
      const haystack = [tool.name, tool.id, tool.category, ...(tool.tags || [])].join(" ").toLowerCase();
      return inCategory && (!needle || haystack.includes(needle));
    })
    .sort((a, b) => {
      if (sortMode.value === "name") return a.name.localeCompare(b.name, "zh-CN");
      return b.hot - a.hot;
    });
});

function openTool(tool) {
  activeId.value = tool.id;
  history.replaceState(null, "", `#/${tool.id}`);
}

function syncFromHash() {
  const id = location.hash.replace(/^#\/?/, "");
  activeId.value = tools.some((tool) => tool.id === id) ? id : "";
}

function showCatalog() {
  activeId.value = "";
  history.replaceState(null, "", location.pathname);
}

function updateClock() {
  time.value = new Date().toLocaleTimeString("zh-CN", { hour12: false });
}

watch(activeCategory, () => {
  if (activeId.value && filteredTools.value.length && !filteredTools.value.some((tool) => tool.id === activeId.value)) showCatalog();
});

onMounted(() => {
  syncFromHash();
  updateClock();
  setInterval(updateClock, 1000);
  window.addEventListener("hashchange", syncFromHash);
});
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <a class="brand" href="/" @click.prevent="showCatalog">
        <span class="brand-mark">Q</span>
        <span>
          <strong>Quanta</strong>
          <small>Tools</small>
        </span>
      </a>

      <nav class="category-nav" aria-label="工具分类">
        <button
          v-for="category in byCategory"
          :key="category.id"
          class="category-button"
          :class="{ 'is-active': activeCategory === category.id }"
          type="button"
          @click="activeCategory = category.id"
        >
          <span>{{ category.name }}</span>
          <span>{{ category.count }}</span>
        </button>
      </nav>
    </aside>

    <main class="workspace">
      <header class="topbar">
        <div class="search-box">
          <span class="search-icon">/</span>
          <input v-model="query" type="search" placeholder="搜索工具、分类或关键词" autocomplete="off" />
        </div>
        <div class="status-strip">
          <span>{{ filteredTools.length }} 个结果</span>
          <span>{{ time }}</span>
        </div>
      </header>

      <section v-if="!activeTool" class="overview">
        <div>
          <p class="eyebrow">Quanta Tools</p>
          <h1>无广告在线工具台</h1>
          <p class="overview-subtitle">搜索、分类、使用工具都在本地优先完成。</p>
        </div>
        <div class="metric-row">
          <span><small>工具总数</small><strong>{{ tools.length }}</strong></span>
          <span><small>专项实现</small><strong>{{ focusedCount }}</strong></span>
          <span><small>基础版本</small><strong>{{ basicCount }}</strong></span>
        </div>
      </section>

      <section class="content-grid">
        <section v-if="activeTool" class="workbench tool-view">
          <div class="workbench-head">
            <div>
              <p class="eyebrow">{{ activeCategoryName }}</p>
              <h2>{{ activeTool.name }}</h2>
            </div>
            <div class="actions">
              <button class="secondary" type="button" @click="showCatalog">返回目录</button>
              <span class="tool-badge">{{ activeTool.icon }}</span>
            </div>
          </div>
          <ToolHost :tool="activeTool" />
        </section>

        <div v-else class="directory">
          <div class="section-head">
            <h2>工具</h2>
            <div class="segmented">
              <button :class="{ 'is-active': sortMode === 'hot' }" type="button" @click="sortMode = 'hot'">常用</button>
              <button :class="{ 'is-active': sortMode === 'name' }" type="button" @click="sortMode = 'name'">A-Z</button>
            </div>
          </div>

          <div class="tool-grid">
            <button
              v-for="tool in filteredTools"
              :key="tool.id"
              class="tool-card"
              :class="{ 'is-active': tool.id === activeId }"
              type="button"
              @click="openTool(tool)"
            >
              <span class="tool-card-top">
                <span class="tool-icon">{{ tool.icon }}</span>
                <span class="state-pill" :class="{ 'is-live': tool.component !== 'PlaceholderTool' }">
                  {{ tool.component === "PlaceholderTool" ? "基础" : "专项" }}
                </span>
              </span>
              <span>
                <strong>{{ tool.name }}</strong>
                <small>{{ categories.find((category) => category.id === tool.category)?.name }}</small>
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

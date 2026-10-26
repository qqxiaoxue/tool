const fs = require("fs");
const path = require("path");

const categoryMap = [
  [1, "text", "字符"],
  [2, "convert", "转换"],
  [3, "crypto", "加密"],
  [4, "network", "网络"],
  [5, "more", "更多"],
  [6, "chart", "图表"],
  [7, "math", "数学"],
  [8, "geo", "坐标"],
  [9, "image", "图片"],
  [10, "file", "文件"],
];

function clean(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/在线|工具|转换|生成|解析|查询|计算/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

async function main() {
  const results = [];
  const globalSeen = new Set();
  for (const [classID, category, categoryName] of categoryMap) {
    const url = `https://www.lddgo.net/en/base/class?classID=${classID}`;
    const html = await (await fetch(url)).text();
    const allLinks = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
      .map((match) => ({ href: match[1], name: clean(match[2]) }))
      .filter((item) => item.name);

    if (process.argv.includes("--sample")) {
      console.log(url);
      console.log(allLinks.slice(0, 80));
      continue;
    }

    const links = allLinks
      .filter((item) => /^\/(en|modern|pdf|word|excel|ppt|epub|ofd|svg|doc|image|common|chart|math|coordinate|network|string|convert|encrypt|file)\//.test(item.href))
      .filter((item) => !/\/base\/|\/article\/|\/basic\/|\/contact|sitemap|beian|login/.test(item.href));

    const seen = new Set();
    for (const link of links) {
      const cleanHref = link.href.replace(/\/+/g, "/").replace(/^https:\//, "https://");
      const key = cleanHref;
      if (seen.has(key) || globalSeen.has(key)) continue;
      seen.add(key);
      globalSeen.add(key);
      const parts = cleanHref.split("?")[0].split("/").filter(Boolean);
      const rawName = parts[parts.length - 1] || link.name;
      const name = rawName
        .replace(/\.html$/i, "")
        .split("-")
        .filter(Boolean)
        .map((part) => part.toUpperCase() === part ? part : part[0].toUpperCase() + part.slice(1))
        .join(" ");
      results.push({
        id: `${category}-${slug(rawName) || results.length}`,
        name,
        category,
        source: cleanHref.startsWith("http") ? cleanHref : `https://www.lddgo.net${cleanHref}`,
        sourceCategory: categoryName,
        component: "PlaceholderTool",
        icon: categoryName.slice(0, 1),
        tags: parts,
        hot: Math.max(20, 65 - Math.floor(results.length / 16)),
      });
    }
  }

  fs.mkdirSync(path.join(process.cwd(), "src", "data"), { recursive: true });
  fs.writeFileSync(
    path.join(process.cwd(), "src", "data", "lddgoCatalog.generated.json"),
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify({ count: results.length, sample: results.slice(0, 8) }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

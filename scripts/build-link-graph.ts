/**
 * Sinh sơ đồ internal link toàn site (kiểu Obsidian knowledge graph) để audit
 * SEO: trang nào nhận nhiều link, trang nào orphan, link nào vi phạm silo.
 *
 * Chỉ đếm link thực sự render ra <a href> (cú pháp [nhãn](đường-dẫn) trong prose,
 * parse bởi LINK_RE — cùng regex với src/pages/WikiArticlePage.tsx). Field
 * `techniquesLink` trên content/cay/*.json KHÔNG được tính vì hiện không có
 * component nào render nó thành link thật (dead field).
 *
 * content/vung/*.json bị loại khỏi node graph vì /vung-trong redirect thẳng về
 * Pillar (src/App.tsx) — vùng không phải trang có URL riêng.
 *
 * Output: scripts/output/link-graph.json (data thô) + scripts/output/link-graph.html
 * (báo cáo trực quan, mở thẳng bằng browser, không cần dev server).
 *
 * Chạy: npm run link-graph
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content");
const OUT_DIR = join(ROOT, "scripts", "output");

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

// Theo .agents/rules/seo-formatting-json.md §Internal linking: wiki chung không
// được link thẳng sang money, TRỪ nhóm "wiki tiêu chuẩn" (category Tiêu chuẩn & kiểm định).
const SILO_EXEMPT_CATEGORY = "Tiêu chuẩn & kiểm định";

type NodeType = "wiki" | "hub" | "cay" | "static";

interface GraphNode {
  id: string;
  title: string;
  type: NodeType;
  meta?: string; // category / group / herbSlug, tuỳ type — hiển thị phụ trong sidebar
  inboundCount: number;
  outboundCount: number;
}

interface GraphEdge {
  source: string;
  target: string;
  label: string;
  sourceType: NodeType;
  targetType: NodeType | "unknown";
  violatesSilo: boolean;
  broken: boolean;
}

const readDir = (dir: string): any[] =>
  existsSync(join(CONTENT, dir))
    ? readdirSync(join(CONTENT, dir))
        .filter((f) => f.endsWith(".json"))
        .map((f) => JSON.parse(readFileSync(join(CONTENT, dir, f), "utf8")))
    : [];

const herbs = readDir("cay");
const wikiArticles = readDir("wiki");
const hubs = readDir("wiki-hub");

const staticPaths = [
  "/",
  "/thu-mua-duoc-lieu",
  "/kien-thuc",
  "/ve-toi",
  "/lien-he",
  "/chinh-sach-bao-mat",
  "/dieu-khoan-su-dung",
  "/mien-tru-trach-nhiem",
  "/chinh-sach-noi-dung",
  "/so-do-trang",
];

const nodes = new Map<string, GraphNode>();
const nodeSource = new Map<string, any>(); // id → raw content object, dùng để quét link

function addNode(id: string, title: string, type: NodeType, meta: string | undefined, raw?: any) {
  nodes.set(id, { id, title, type, meta, inboundCount: 0, outboundCount: 0 });
  if (raw) nodeSource.set(id, raw);
}

for (const p of staticPaths) addNode(p, p, "static", undefined);
for (const h of herbs) addNode(`/thu-mua-duoc-lieu/${h.slug}`, h.name, "cay", h.group, h);
for (const hub of hubs)
  addNode(`/kien-thuc/ky-thuat-trong-${hub.herbSlug}`, hub.title, "hub", hub.herbSlug, hub);
for (const a of wikiArticles) addNode(`/kien-thuc/${a.id}`, a.title, "wiki", a.category, a);

function collectStrings(value: any, out: string[]): void {
  if (typeof value === "string") {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const v of value) collectStrings(v, out);
  } else if (value && typeof value === "object") {
    for (const v of Object.values(value)) collectStrings(v, out);
  }
}

function normalize(href: string): string {
  const clean = href.split("#")[0].split("?")[0];
  if (clean === "/") return "/";
  return clean.replace(/\/$/, "");
}

const edges: GraphEdge[] = [];

for (const [sourceId, raw] of nodeSource) {
  const sourceNode = nodes.get(sourceId)!;
  const strings: string[] = [];
  collectStrings(raw, strings);

  for (const text of strings) {
    LINK_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = LINK_RE.exec(text)) !== null) {
      const [, label, hrefRaw] = m;
      if (!hrefRaw.startsWith("/")) continue; // bỏ link ngoài (http...)
      const target = normalize(hrefRaw);
      const targetNode = nodes.get(target);
      const targetType: NodeType | "unknown" = targetNode ? targetNode.type : "unknown";
      const violatesSilo =
        sourceNode.type === "wiki" &&
        targetType === "cay" &&
        sourceNode.meta !== SILO_EXEMPT_CATEGORY;

      edges.push({
        source: sourceId,
        target,
        label,
        sourceType: sourceNode.type,
        targetType,
        violatesSilo,
        broken: !targetNode,
      });

      sourceNode.outboundCount++;
      if (targetNode) targetNode.inboundCount++;
    }
  }
}

const nodeList = Array.from(nodes.values());
const orphans = nodeList.filter((n) => n.inboundCount === 0 && n.type !== "static");
const siloViolations = edges.filter((e) => e.violatesSilo);
const brokenLinks = edges.filter((e) => e.broken);
const topInbound = [...nodeList].sort((a, b) => b.inboundCount - a.inboundCount).slice(0, 10);

const graphData = {
  generatedAt: new Date().toISOString(),
  nodes: nodeList,
  edges,
  stats: {
    totalNodes: nodeList.length,
    totalEdges: edges.length,
    byType: {
      wiki: nodeList.filter((n) => n.type === "wiki").length,
      hub: nodeList.filter((n) => n.type === "hub").length,
      cay: nodeList.filter((n) => n.type === "cay").length,
      static: nodeList.filter((n) => n.type === "static").length,
    },
    orphanCount: orphans.length,
    orphansByType: {
      wiki: orphans.filter((n) => n.type === "wiki").length,
      hub: orphans.filter((n) => n.type === "hub").length,
      cay: orphans.filter((n) => n.type === "cay").length,
    },
    siloViolationCount: siloViolations.length,
    brokenLinkCount: brokenLinks.length,
  },
  orphans,
  topInbound,
  siloViolations,
  brokenLinks,
};

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "link-graph.json"), JSON.stringify(graphData, null, 2));

const htmlTemplate = readFileSync(join(ROOT, "scripts", "lib", "link-graph-template.html"), "utf8");
const graphDataJson = JSON.stringify(graphData).replace(/</g, "\\u003c");
// Dùng replacer dạng hàm để tránh chuỗi JSON chứa ký tự "$" bị String.replace
// hiểu nhầm thành pattern thay thế đặc biệt ($&, $1, ...).
const html = htmlTemplate.replace("/*__GRAPH_DATA__*/", () => graphDataJson);
writeFileSync(join(OUT_DIR, "link-graph.html"), html);

console.log(
  `✓ Link graph: ${graphData.stats.totalNodes} node (wiki ${graphData.stats.byType.wiki}, hub ${graphData.stats.byType.hub}, cay ${graphData.stats.byType.cay}, static ${graphData.stats.byType.static}), ` +
    `${graphData.stats.totalEdges} edge, ${graphData.stats.orphanCount} orphan, ${graphData.stats.siloViolationCount} silo violation, ${graphData.stats.brokenLinkCount} broken link`,
);
console.log(`→ scripts/output/link-graph.html`);

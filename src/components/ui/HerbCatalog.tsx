import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp, TrendingDown, Minus, Search, ChevronLeft, ChevronRight, ChevronDown, X, BookOpen, SlidersHorizontal } from "lucide-react";
import { HERBS_DATA, REGIONS_DATA, getHubByHerbSlug } from "../../lib/data";
import { paths } from "../../lib/paths";
import type { HerbGroup, HerbalMedicine } from "../../types";
import { RegionMap, type RegionNode } from "./RegionMap";

const GROUP_LABEL: Record<HerbGroup, string> = {
  "cu-re": "Củ, rễ",
  "hoa-la": "Hoa, lá",
  nam: "Nấm",
  vo: "Vỏ",
  than: "Thân, cành",
};

const TREND_ICON = { up: TrendingUp, down: TrendingDown, stable: Minus } as const;
// Màu mũi tên xu hướng giá theo chiều: tăng = xanh (lợi cho người bán), giảm = terracotta, ổn định = xám.
const TREND_STYLE = { up: "text-[#1F7A46]", down: "text-[#B85037]", stable: "text-gray-400" } as const;
const PAGE_SIZE = 8;

/** Bỏ dấu tiếng Việt + hạ chữ thường để tìm kể cả khi gõ không dấu. */
const norm = (s: string) =>
  s.toLowerCase().replace(/đ/g, "d").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

/** Tách chuỗi thành các "từ" đã bỏ dấu (ngăn bởi khoảng trắng hoặc gạch nối). */
const words = (s: string) => norm(s).split(/[\s-]+/).filter(Boolean);

/**
 * Khớp từ khoá kiểu tiếng Việt. 1 từ → so khớp theo ĐẦU TỪ (để "hà" ra "hà thủ ô"
 * chứ không lọt "chẩu"→"chau"); nhiều từ → so khớp cả cụm. Dò trong tên, tên khác, slug.
 */
const matchesQuery = (h: HerbalMedicine, nq: string): boolean => {
  if (!nq) return true;
  const fields = [h.name, ...h.otherNames, h.slug];
  if (nq.includes(" ")) return fields.some((f) => norm(f).replace(/-/g, " ").includes(nq));
  return fields.some((f) => words(f).some((w) => w.startsWith(nq)));
};

/**
 * Gom danh sách vùng (slug → tên + số cây) từ dữ liệu cây. CHỈ giữ vùng có trang
 * thật (tồn tại trong REGIONS_DATA) để bản đồ không dẫn tới combo cây×vùng 404.
 */
const buildRegionNodes = (): RegionNode[] => {
  const valid = new Set(REGIONS_DATA.map((r) => r.slug));
  const map = new Map<string, { name: string; count: number }>();
  for (const h of HERBS_DATA) {
    for (const r of h.regions) {
      if (!valid.has(r.regionSlug)) continue;
      const cur = map.get(r.regionSlug);
      if (cur) cur.count += 1;
      else map.set(r.regionSlug, { name: r.regionName, count: 1 });
    }
  }
  return [...map.entries()].map(([slug, v]) => ({ slug, name: v.name, count: v.count }));
};

/** Dãy số trang có dấu "…" khi nhiều trang, luôn giữ trang đầu/cuối và quanh trang hiện tại. */
const pageWindow = (cur: number, total: number): (number | "…")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const nums = new Set([1, total, cur, cur - 1, cur + 1]);
  const sorted = [...nums].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const n of sorted) {
    if (n - prev > 1) out.push("…");
    out.push(n);
    prev = n;
  }
  return out;
};

/** Chip cho một điều kiện lọc đang bật; bấm để gỡ nhanh điều kiện đó. */
const FilterChip: React.FC<{ label: React.ReactNode; onRemove: () => void }> = ({ label, onRemove }) => (
  <button
    type="button"
    onClick={onRemove}
    className="inline-flex items-center gap-1 pl-3 pr-2 py-1 rounded-full bg-[#F5ECE1] border border-[#E6DDD0] text-xs font-sans font-semibold text-[#4F433A] hover:border-[#B85037] hover:text-[#B85037] cursor-pointer transition-colors"
  >
    <span className="truncate max-w-[10rem]">{label}</span>
    <X className="w-3.5 h-3.5 shrink-0" />
  </button>
);

/**
 * Công cụ tra cứu dược liệu hợp nhất: một ô tìm lớn duy nhất vừa lọc lưới cây tức
 * thời (Enter để nhảy tới cây khớp đầu tiên), kèm gợi ý cây đang cần mua, bản đồ
 * vùng bấm được + lọc theo nhóm + lưới thẻ có phân trang. Mọi thao tác chạy phía
 * trình duyệt. Thay cho việc có 2 ô search rời (tìm nhanh vs. duyệt) gây trùng lặp.
 */
export const HerbCatalog: React.FC = () => {
  const navigate = useNavigate();
  const [group, setGroup] = React.useState<HerbGroup | "all">("all");
  const [region, setRegion] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [filtersOpen, setFiltersOpen] = React.useState(false); // panel vùng/nhóm trên mobile

  const nq = norm(query);
  // Đổi bộ lọc hoặc từ khoá thì về trang 1.
  React.useEffect(() => setPage(1), [group, region, nq]);

  const regionNodes = React.useMemo(buildRegionNodes, []);
  const groups = React.useMemo(() => [...new Set(HERBS_DATA.map((h) => h.group))] as HerbGroup[], []);

  // Gợi ý khi chưa lọc gì: cây đang cần gấp / phổ biến (ưu tiên hot), lấy 8 cây đầu.
  const suggestions = React.useMemo(
    () => [...HERBS_DATA].sort((a, b) => (b.priorityLevel === "hot" ? 1 : 0) - (a.priorityLevel === "hot" ? 1 : 0)).slice(0, 8),
    [],
  );

  const filtered = React.useMemo(
    () =>
      HERBS_DATA.filter(
        (h) =>
          (group === "all" || h.group === group) &&
          (region === null || h.regions.some((r) => r.regionSlug === region)) &&
          matchesQuery(h, nq),
      ),
    [group, region, nq],
  );

  const regionName = region ? regionNodes.find((r) => r.slug === region)?.name : null;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // Chỉ mời gọi bằng chips khi bà con chưa gõ và chưa lọc vùng/nhóm.
  const hasActiveFilters = !!nq || !!region || group !== "all";
  const showSuggestions = !hasActiveFilters;
  // Số điều kiện nằm trong panel thu gọn (vùng + nhóm) — hiện badge trên nút mở panel.
  const panelFilterCount = (region ? 1 : 0) + (group !== "all" ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setRegion(null);
    setGroup("all");
  };

  // Đường dẫn tới trang cây (kèm vùng nếu đang lọc theo vùng) — dùng cho cả <Link> và submit.
  const herbHref = (h: HerbalMedicine) => (region ? paths.herbRegion(h.slug, region) : paths.herb(h.slug));

  // Enter trong ô tìm → nhảy thẳng tới cây khớp đầu tiên (lối tắt cho người biết rõ cây cần).
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filtered[0]) navigate(herbHref(filtered[0]));
  };

  return (
    <div className="space-y-6">
      {/* H2 cho khối công cụ: giữ mạch heading h1→h2 của trang (label ô tìm không tính
          là heading). Ẩn khỏi giao diện, vẫn hiện với bộ đọc màn hình & bot. */}
      <h2 className="sr-only">Công cụ tra cứu giá thu mua dược liệu theo cây &amp; vùng</h2>

      {/* Ô tìm lớn duy nhất + gợi ý cây hot */}
      <div className="bg-white border border-[#E6DDD0] rounded-2xl p-5 md:p-7 shadow-xs space-y-4">
        <form onSubmit={onSubmit} className="space-y-2">
          <label htmlFor="herb-catalog-search" className="block font-serif text-xl md:text-2xl font-bold text-[#4F433A]">
            Bà con đang muốn bán cây dược liệu gì?
          </label>
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-[#E6DDD0] bg-[#FBF9F5] focus-within:border-[#B85037] transition-colors">
            <Search className="w-6 h-6 text-[#B85037] shrink-0" />
            <input
              id="herb-catalog-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              placeholder="Gõ tên cây, ví dụ: cà gai leo, ba kich, dinh lang…"
              className="w-full bg-transparent text-lg font-sans text-[#2D2521] placeholder:text-[#B0A695] focus:outline-none"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Xoá" className="shrink-0 text-[#B0A695] hover:text-[#B85037] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 font-sans">
            Gõ tên cây để lọc nhanh, xem giá thu mua, tiêu chuẩn & nơi bán. Đang cần bán <strong className="text-[#4F433A]">{HERBS_DATA.length}</strong> loại dược liệu.
          </p>
        </form>

        {showSuggestions && (
          <div className="space-y-2">
            <span className="block text-sm font-sans font-semibold text-[#7A6E62]">🔥 Cây dược liệu đang được thu mua nhiều:</span>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((h) => (
                <Link
                  key={h.slug}
                  to={paths.herb(h.slug)}
                  className="px-3.5 py-2 rounded-full border border-[#E6DDD0] bg-white text-sm font-sans font-semibold text-[#4F433A] hover:border-[#B85037] hover:text-[#B85037] cursor-pointer transition-colors"
                >
                  {h.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Nút mở bộ lọc vùng/nhóm — chỉ trên mobile; desktop luôn hiện sidebar */}
      <button
        type="button"
        onClick={() => setFiltersOpen((o) => !o)}
        aria-expanded={filtersOpen}
        className="lg:hidden w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-[#E6DDD0] bg-white text-[#4F433A] font-sans font-semibold text-sm cursor-pointer hover:border-[#B85037] transition-colors"
      >
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#B85037]" />
          Lọc theo vùng &amp; nhóm
          {panelFilterCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#B85037] text-white text-xs font-bold">{panelFilterCount}</span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Duyệt: bản đồ vùng + lọc nhóm + lưới kết quả */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
        {/* Cột trái: vùng + lọc nhóm (thu gọn trên mobile, dính khi cuộn trên desktop) */}
        <div className={`${filtersOpen ? "block" : "hidden"} lg:block space-y-4 lg:sticky lg:top-4`}>
          <RegionMap regions={regionNodes} selected={region} onSelect={setRegion} />
          <div className="bg-white border border-[#E6DDD0] rounded-2xl p-4">
            <span className="block text-sm font-sans font-bold text-[#4F433A] mb-3">Nhóm dược liệu</span>
            <div className="flex flex-wrap gap-2">
              {(["all", ...groups] as const).map((g) => {
                const active = group === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGroup(g)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 rounded-full border text-sm font-sans font-semibold cursor-pointer transition-colors ${
                      active ? "bg-[#B85037] border-[#B85037] text-white" : "bg-white border-[#E6DDD0] text-[#4F433A] hover:border-[#B85037] hover:text-[#B85037]"
                    }`}
                  >
                    {g === "all" ? "Tất cả" : GROUP_LABEL[g]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cột phải: kết quả */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="text-sm text-gray-600 font-sans">
              Tìm thấy <strong className="text-[#4F433A]">{filtered.length}</strong> cây
            </p>
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                {nq && <FilterChip label={<>“{query}”</>} onRemove={() => setQuery("")} />}
                {regionName && <FilterChip label={regionName} onRemove={() => setRegion(null)} />}
                {group !== "all" && <FilterChip label={GROUP_LABEL[group]} onRemove={() => setGroup("all")} />}
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-sans font-semibold text-[#B85037] hover:underline cursor-pointer"
                >
                  Xoá tất cả
                </button>
              </div>
            )}
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500 italic py-8 text-center">Không tìm thấy cây nào khớp. Thử bỏ bớt điều kiện hoặc gõ ngắn gọn hơn.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pageItems.map((h) => {
                  const price = h.prices[0];
                  const TrendI = price ? TREND_ICON[price.trend] : Minus;
                  const hot = h.priorityLevel === "hot";
                  const hasHub = !!getHubByHerbSlug(h.slug);
                  return (
                    <div
                      key={h.slug}
                      className="bg-white border border-[#E6DDD0] hover:border-[#B85037] rounded-xl p-4 hover:shadow-[0_4px_16px_-6px_rgba(184,80,55,0.25)] transition-all group flex flex-col"
                    >
                      <Link
                        to={herbHref(h)}
                        className="text-left flex-1 flex flex-col cursor-pointer"
                      >
                        {/* Eyebrow: nhóm + dấu hiệu cần gấp */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.12em] text-[#B85037]">{GROUP_LABEL[h.group]}</span>
                          {hot && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-[#9F3E28]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#9F3E28] animate-pulse" /> Cần gấp
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif font-bold text-lg text-[#4F433A] group-hover:text-[#B85037] transition-colors leading-snug mt-1.5">
                          {h.name}
                        </h3>

                        {price ? (
                          <div className="flex items-baseline gap-1.5 mt-2">
                            <span className="font-mono font-extrabold text-[1.35rem] leading-none text-[#1F7A46]">{price.priceRange}</span>
                            <span className="font-sans text-sm text-gray-500">đ/{price.unit}</span>
                            <TrendI className={`w-4 h-4 ml-auto ${TREND_STYLE[price.trend]}`} />
                          </div>
                        ) : (
                          <div className="mt-2 text-sm text-gray-400 font-sans italic">Giá theo thoả thuận</div>
                        )}

                        <span className="text-[13px] text-gray-500 font-sans mt-1.5">Thu hoạch: {h.technique.harvestTime}</span>

                        <span className="inline-flex items-center gap-1 text-sm font-sans font-bold text-[#B85037] mt-3">
                          {region ? `Xem giá tại ${regionName}` : "Xem giá & nơi bán"}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>

                      {hasHub && (
                        <Link
                          to={paths.hubWiki(h.slug)}
                          title={`Kỹ thuật trồng ${h.name}`}
                          className="inline-flex items-center gap-1.5 self-start text-[13px] font-sans font-semibold text-[#4F7942] hover:text-[#2E5941] cursor-pointer mt-3 pt-3 border-t border-[#EFE8DC] w-full transition-colors"
                        >
                          <BookOpen className="w-4 h-4 shrink-0" />
                          Xem kỹ thuật trồng
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Phân trang */}
              {totalPages > 1 && (
                <nav className="flex flex-wrap items-center justify-center gap-1.5 pt-2 shrink-0" aria-label="Phân trang danh mục">
                  <button
                    type="button"
                    onClick={() => setPage(safePage - 1)}
                    disabled={safePage === 1}
                    aria-label="Trang trước"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E6DDD0] bg-white text-[#4F433A] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#B85037] hover:text-[#B85037] cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {pageWindow(safePage, totalPages).map((p, i) =>
                    p === "…" ? (
                      <span key={`e${i}`} className="w-9 h-9 inline-flex items-center justify-center text-gray-400 text-sm">…</span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        aria-current={p === safePage ? "page" : undefined}
                        className={`w-9 h-9 rounded-lg border text-sm font-sans font-bold cursor-pointer transition-colors ${
                          p === safePage
                            ? "bg-[#B85037] border-[#B85037] text-white"
                            : "bg-white border-[#E6DDD0] text-[#4F433A] hover:border-[#B85037] hover:text-[#B85037]"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    onClick={() => setPage(safePage + 1)}
                    disabled={safePage === totalPages}
                    aria-label="Trang sau"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E6DDD0] bg-white text-[#4F433A] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#B85037] hover:text-[#B85037] cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

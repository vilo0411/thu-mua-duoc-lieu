# Antigravity entry point — thu mua dược liệu

Toàn bộ logic (rules, vai trò, workflow) sống ở `.agents/`. Lệnh slash được Antigravity đăng ký qua các `SKILL.md` dưới `.agents/skills/<tên-lệnh>/` (đây là đường dẫn chuẩn Antigravity quét — không phải `.antigravity/skills/`) — mỗi file chỉ trỏ vào workflow tương ứng, không lặp lại nội dung (xem `.agents/rules/workflow-integrity.md`, mục "Một nguồn sự thật").

| Lệnh | Skill | Workflow |
|---|---|---|
| `/setup` | `.agents/skills/setup/SKILL.md` | `.agents/workflows/setup.md` |
| `/cluster` | `.agents/skills/cluster/SKILL.md` | `.agents/workflows/cluster.md` |
| `/keyword-plan` | `.agents/skills/keyword-plan/SKILL.md` | `.agents/workflows/keyword-plan.md` |
| `/outlining` | `.agents/skills/outlining/SKILL.md` | `.agents/workflows/outlining.md` |
| `/drafting` | `.agents/skills/drafting/SKILL.md` | `.agents/workflows/drafting.md` |
| `/revise` | `.agents/skills/revise/SKILL.md` | `.agents/workflows/revise.md` |
| `/approve` | `.agents/skills/approve/SKILL.md` | `.agents/workflows/approve.md` |
| `/write` | `.agents/skills/write/SKILL.md` | `.agents/workflows/write.md` |
| `/seo-optimize` | `.agents/skills/seo-optimize/SKILL.md` | `.agents/workflows/seo-optimize.md` |
| `/link` | `.agents/skills/link/SKILL.md` | `.agents/workflows/link.md` |
| `/image` | `.agents/skills/image/SKILL.md` | `.agents/workflows/image.md` |
| `/learn` | `.agents/skills/learn/SKILL.md` | `.agents/workflows/learn.md` |

Vai trò dùng trong các workflow: `.agents/agents/seo-collector.md`, `brand-guardian.md`, `quality-guardian.md`, `research-agent.md`. Dữ liệu chiến lược: `knowledge/` (brand, market, pipeline, content).

Antigravity tự động compile skill khi khởi động `agy`/mở workspace trong thư mục chứa `.agents/skills/` — không cần reload thủ công. Nếu vẫn không thấy slash command, kiểm tra workspace root đang mở đúng thư mục chứa `.agents/skills/` chưa.

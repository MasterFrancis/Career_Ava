# Career Flow · UK（纯前端 Web App）

基于 `career_report_uk_text_only.md` 的单人使用 Web App：问卷测评 → 8 维度画像 → 可解释推荐 → 岗位浏览（用户 vs 岗位画像对比可视化）→ 岗位详情（折叠信息 + 本地备注 + 路线图只读）→ 决策矩阵。

## 运行

```bash
npm install
npm run dev
```

默认启动在 `0.0.0.0:3000`，适配 Replit/远程预览。

## 数据如何保存（无后端）

- 全部数据仅存浏览器本地 `localStorage`
- 刷新/下次打开会自动恢复（答案、结果、矩阵、备注、上次停留页面）
- 存储 Key：`career-app:uk:v1`

## Reset 在哪里

- 任意页面底部右侧 `Reset`
- 二次确认后清空本地数据并回到首页

## 重要逻辑（可复用函数）

- 问卷与计分：`src/domain/quiz.ts`
  - `computeDimensionScores()`：按 A–H（每维 3 题）求和，得分范围 3–15
- 推荐（透明可复现）：`src/domain/recommend.ts`
  - `matchScore = Σ(dimScore × weight)`
- 路径权重与岗位画像：`src/domain/paths.ts`
  - `PATH_WEIGHTS[path][A..H]`（0–3）
  - `ROLE_PROFILES[path][A..H]`（由 weight 映射到 0–15，用于“岗位倾向画像”）
- 用户 vs 岗位差异解释：`src/domain/compare.ts`
  - `getMatchInsight()`：输出优势/风险维度
- 决策矩阵：`src/domain/matrix.ts`
  - `computeMatrixRanking()`：按 `Σ(权重×评分)` 自动排序
- 本地持久化与自动恢复：`src/state/storage.ts`、`src/state/store.tsx`

## 页面路径

- `/` 欢迎页
- `/quiz` 问卷（逐题、进度、题号跳转、即时保存）
- `/results` 结果总览（8 维度可视化 + 推荐 Top 2–3 + 可复现拆解）
- `/paths` 岗位浏览（迷你雷达：用户 vs 岗位画像）
- `/paths/:pathId` 岗位详情（大图对比 + 折叠信息 + 本地备注 + 路线图只读）
- `/matrix` 决策矩阵（引导文案 + 权重/评分 + 自动排名）

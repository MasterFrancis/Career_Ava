import { DIMENSION_ORDER, type DimensionKey } from './dimensions'

export type PathId =
  | 'ux-research'
  | 'inhouse-insights'
  | 'agency-strategy'
  | 'research-consulting'
  | 'public-sector-research'
  | 'measurement'

export type Path = {
  id: PathId
  name: string
  oneLiner: string
  deliverables: string[]
  cadence: string
  entryEvidence: string
  wlbRisk: string
  sections: {
    kernel: string[]
    titleVariants: string[]
    workflow: string[]
    skillTree: string[]
    marketSalary: string[]
    prosConsWlb: string[]
    actionAdvice: string[]
    roadmap: {
      phase: string
      bullets: string[]
    }[]
  }
}

export const PATHS: Path[] = [
  {
    id: 'ux-research',
    name: 'UX研究',
    oneLiner: '用研究证据影响产品决策，把洞察写进路线图与优先级。',
    deliverables: ['研究计划', '访谈/可用性记录', '洞察总结', '设计建议/优先级'],
    cadence: '与产品/设计高频共创；迭代快，节点型交付。',
    entryEvidence: '3–5 个闭环案例（问题→方法→洞察→建议→影响/下一步）。',
    wlbRisk: '交付速度 vs 研究深度；stakeholder 管理强度波动。',
    sections: {
      kernel: [
        '对齐决策问题：影响哪一个产品选择？',
        '设计并执行研究（定性为主，可补轻量量化）。',
        '把用户语言翻译成产品语言，推动落地与复盘。',
      ],
      titleVariants: [
        'User Researcher / UX Researcher',
        'Product Researcher / UX Insights',
        'Research Ops（研究运营/流程体系）',
        'Mixed-Methods / Quant UX（偏量化）',
      ],
      workflow: [
        '对齐问题 → 方法选择 → 招募与伦理 → 执行 → 分析编码 → 洞察机会点 → 建议与取舍 → 推动落地',
      ],
      skillTree: [
        '研究设计与提问：偏差控制、样本策略、可执行的问题定义。',
        '定性方法深度：访谈/观察/共创，能讲清可信度与限制。',
        '产品语境：旅程/指标/迭代节奏，洞察能落到决策点。',
        '沟通与影响：对齐利益相关者、管理分歧、推进优先级。',
      ],
      marketSalary: [
        '岗位热度：伦敦最多，其他城市也有；受科技招聘周期影响。',
        '差异点：能影响决策 + 具备基础量化/实验意识更稀缺。',
      ],
      prosConsWlb: [
        '优点：能把研究训练直接转成产品影响力；长期成长路径清晰。',
        '风险：只做研究不推动落地会被认为价值不清晰；面试综合考核强。',
        'WLB：整体中等偏好，但关键版本/决策节点会更忙。',
      ],
      actionAdvice: [
        '做 1 次轻量研究闭环（5–8 访谈或 5 人可用性），输出可执行建议 5 条。',
        '作品集用统一结构讲清：为什么这样做、证据链、限制与下一步。',
      ],
      roadmap: [
        {
          phase: '0–2个月（启动）',
          bullets: ['搭 1 个作品集框架', '完成 1 个轻量研究闭环交付'],
        },
        {
          phase: '2–6个月（补齐）',
          bullets: ['补齐指标/实验/量化到“能对话”', '练 10 页以内研究汇报'],
        },
        {
          phase: '6–18个月（积累）',
          bullets: ['累积 3–5 个闭环案例', '争取真实协作/实习证据'],
        },
        {
          phase: '毕业前6–12个月（冲刺）',
          bullets: ['研究设计题/洞察题/利益相关者题', '定制化投递与案例补强'],
        },
      ],
    },
  },
  {
    id: 'inhouse-insights',
    name: '甲方洞察',
    oneLiner: '把研究转成业务建议与取舍，影响品牌/增长/产品决策。',
    deliverables: ['洞察备忘录', '策略建议', '研究 brief', '定期简报/洞察库'],
    cadence: '跨部门翻译：研究→市场/产品/管理层；更贴近年度经营节奏。',
    entryEvidence: '2–3 份“洞察→建议”的作品，能讲清业务目标与取舍。',
    wlbRisk: '向上管理多；研究深度受业务节奏影响。',
    sections: {
      kernel: [
        '把业务问题翻译成研究问题，并统筹内外部研究资源。',
        '整合定性洞察 + 业务/媒体/渠道数据，形成可决策的建议。',
        '把洞察系统化：dashboard、洞察库、定期简报。',
      ],
      titleVariants: [
        'Consumer / Customer / Market Insights',
        'Brand & Market Insights',
        'Audience Insights（媒体/内容行业）',
        'Market Intelligence / CX Research',
      ],
      workflow: [
        '业务问题 → 研究 brief → 供应商/自研 → 证据整合 → 建议与取舍 → 评审材料 → 复盘',
      ],
      skillTree: [
        '消费者/市场框架：STP、JTBD、品牌资产/品类结构。',
        '证据整合：把研究与业务数据连接成“可决策的故事”。',
        '供应商管理：brief、评标、质量把控、预算与时间线。',
        '沟通：用一页纸讲清结论–证据–建议–风险。',
      ],
      marketSalary: ['岗位相对稳定；命名分散但需求长期存在。'],
      prosConsWlb: [
        '优点：商业语境更清晰，成长看“影响力”，路径稳。',
        '风险：纯研究时间可能低于预期；决策文化弱时洞察易被边缘化。',
        'WLB：通常较好，旺季在年度规划/大 campaign/新品节点。',
      ],
      actionAdvice: [
        '输出 2–3 份洞察备忘录：问题→证据→建议→风险与取舍（每份 3–5 页）。',
        '用公开信息 + 3–5 次访谈做一个行业主题洞察，并给动作清单。',
      ],
      roadmap: [
        {
          phase: '0–2个月（启动）',
          bullets: ['输出 2 份洞察备忘录（建议+取舍）'],
        },
        {
          phase: '2–6个月（补齐）',
          bullets: ['练 brief 写作与供应商评估逻辑', '训练“5分钟讲清”表达'],
        },
        {
          phase: '6–18个月（积累）',
          bullets: ['选 1 个行业主赛道做主题积累', '把洞察做成可复用体系（库/简报）'],
        },
        {
          phase: '毕业前6–12个月（冲刺）',
          bullets: ['用 JD 反推案例标题', '准备面试 case 与取舍题'],
        },
      ],
    },
  },
  {
    id: 'agency-strategy',
    name: '乙方品牌策略',
    oneLiner: '洞察→主张→策略→创意方向：用提案与叙事推动客户买单。',
    deliverables: ['一页主张', '策略框架', 'Pitch Deck', '创意 brief', '复盘建议'],
    cadence: '项目制；对外沟通与提案多，节奏更不可控。',
    entryEvidence: '3–5 个策略案例（可自拟命题），证明洞察与表达一体化。',
    wlbRisk: '提案期强度大；返工与不确定性更强。',
    sections: {
      kernel: [
        '从混乱信息提炼一句洞察，形成主张与策略方向。',
        '与创意团队共创，把策略翻译成可执行创意 brief。',
        '通过 pitch 与答辩说服客户，并参与复盘优化。',
      ],
      titleVariants: [
        'Brand Strategist / Strategy Planner',
        'Creative Strategist / Comms Planner',
        'Content / Social Strategist',
        'Experience Strategist（靠近 CX/服务设计）',
      ],
      workflow: [
        '研究与趋势 → 定义品牌问题 → 洞察与主张 → 策略框架 → 创意方向 → 提案与答辩 → 复盘',
      ],
      skillTree: [
        '洞察提炼：从复杂材料压缩成一句“可行动洞察”。',
        '叙事写作与 deck 结构：讲故事、说服、现场应对。',
        '策略框架：STP/品牌资产/传播组合/效果衡量基本概念。',
        '协作：与创意/客户多方迭代，抗返工与不确定性。',
      ],
      marketSalary: ['岗位集中在伦敦；受广告预算周期影响较明显。'],
      prosConsWlb: [
        '优点：表达与创意协作强，作品集可快速拉开差距。',
        '风险：包装要求高；客户变化快，返工频繁。',
        'WLB：波动大，pitch/大 campaign 期加班明显。',
      ],
      actionAdvice: [
        '做 2 个自拟策略案例：命题→洞察→主张→策略→创意方向→衡量。',
        '练“1/3/10页”三档提案表达，训练取舍与节奏。',
      ],
      roadmap: [
        { phase: '0–2个月（启动）', bullets: ['做 2 个自拟策略案例（可展示）'] },
        {
          phase: '2–6个月（补齐）',
          bullets: ['提案表达三档训练（1/3/10页）', '建立个人洞察写作模板'],
        },
        {
          phase: '6–18个月（积累）',
          bullets: ['做到 3–5 个可展示案例', '积累行业语境与提案风格'],
        },
        {
          phase: '毕业前6–12个月（冲刺）',
          bullets: ['针对目标 agency 定制作品', '练 pitch 与提案答辩'],
        },
      ],
    },
  },
  {
    id: 'research-consulting',
    name: '研究咨询',
    oneLiner: '项目制交付：研究方法 + 项目管理 + 客户沟通三位一体。',
    deliverables: ['研究报告', 'Workshop 产出', '客户沟通纪要', '建议清单'],
    cadence: '多客户多议题；流程与进度管理强，多线程并行。',
    entryEvidence: '用模板化结构展示“研究交付能力”（方法+分析+报告结构）。',
    wlbRisk: '并行项目与交付时限压力；研究深度易被时间线压缩。',
    sections: {
      kernel: [
        '理解客户 brief：目的、受众、方法、交付与时间线。',
        '执行研究（定性为主，可混合量化），并形成可被采用的建议。',
        '项目管理与客户对齐贯穿全程。',
      ],
      titleVariants: [
        'Research Executive / Research Manager',
        'Project Manager / Consultant',
        'Behavioural / Social Researcher',
        'Strategy / Management Consulting（更偏案例与模型）',
      ],
      workflow: [
        '客户 brief → 研究设计 → 招募/供应商 → 执行 → 分析 → 报告/呈现 → 客户对齐 → 后续机会',
      ],
      skillTree: [
        '方法论与写作：采样/偏差/访谈与问卷设计，结论口径清晰。',
        '项目管理：多线程推进、风险控制、质量检查。',
        '客户沟通：守住研究边界，同时交付“可用版本”。',
        '表达：把洞察转成客户可执行的行动清单与优先级。',
      ],
      marketSalary: ['行业生态成熟（研究外包链条稳定）；伦敦集中但多城市有 office。'],
      prosConsWlb: [
        '优点：训练营属性强，补齐商业化表达与交付体系。',
        '风险：被交付驱动；高峰期沟通与加班较常见。',
        'WLB：研究公司中等；咨询更波动，取决于项目。',
      ],
      actionAdvice: [
        '做 1 个模拟交付项目：brief→方法→样本→分析→报告（含限制说明与建议）。',
        '建立可复用报告模板：结论页结构、风险与限制、建议优先级。',
      ],
      roadmap: [
        { phase: '0–2个月（启动）', bullets: ['完成 1 个模拟交付项目（brief→报告）'] },
        { phase: '2–6个月（补齐）', bullets: ['项目管理清单 + 风险控制训练'] },
        { phase: '6–18个月（积累）', bullets: ['找真实合作项目补齐客户沟通证据'] },
        { phase: '毕业前6–12个月（冲刺）', bullets: ['case/结构化面试训练'] },
      ],
    },
  },
  {
    id: 'public-sector-research',
    name: '公共部门研究',
    oneLiner: '把问题–证据–建议–风险写成可被采纳的政策与评估材料。',
    deliverables: ['Policy brief', '评估框架/逻辑模型', '证据综述', '访谈总结与建议'],
    cadence: '伦理与可解释性重要；写作产出多，周期相对更长。',
    entryEvidence: '写作样本（政策简报/评估总结）+ 证据链口径说明。',
    wlbRisk: '程序性与合规要求高；决策周期长，成就感可能更延迟。',
    sections: {
      kernel: [
        '把政策/服务问题翻译成研究问题：改变什么、衡量什么。',
        '设计研究并确保伦理合规与数据保护。',
        '形成可审计的证据链与建议清单，推动落地与复盘。',
      ],
      titleVariants: [
        'Government Social Research Officer / Social Researcher',
        'Policy Researcher / Policy Analyst',
        'Evaluation Officer / Monitoring & Evaluation (M&E)',
        'Insight Analyst（公共部门语境）',
      ],
      workflow: [
        '问题定义 → 研究与合规 → 执行（定性/共创/混合） → 分析写作 → policy brief/评估报告 → 推动采纳',
      ],
      skillTree: [
        '研究设计与写作：结构化、可审计、限制说明清楚。',
        '评估框架：Theory of Change / Logic Model，过程评估 vs 效果评估。',
        '伦理合规：敏感议题、弱势群体研究规范与数据保护。',
        '利益相关者管理：在多方目标冲突中推进共识。',
      ],
      marketSalary: ['岗位数量中等偏多；区域中心也有，稳定性通常较好。'],
      prosConsWlb: [
        '优点：价值对齐强；证据写作能力可形成壁垒。',
        '风险：合规流程占时；落地受政策与组织环境影响。',
        'WLB：通常较好且可预期，但重大节点会更忙。',
      ],
      actionAdvice: [
        '写 1 份 policy brief（2–4页）+ 1 份评估框架（逻辑模型+指标+数据来源）。',
        '选一个公共议题做“证据→建议”练习，写清风险与取舍。',
      ],
      roadmap: [
        { phase: '0–2个月（启动）', bullets: ['policy brief + 评估框架样本'] },
        { phase: '2–6个月（补齐）', bullets: ['ToC/Logic Model + 证据口径训练'] },
        { phase: '6–18个月（积累）', bullets: ['影响力叙事 + 议题积累'] },
        { phase: '毕业前6–12个月（冲刺）', bullets: ['写作样本集 + 岗位定制'] },
      ],
    },
  },
  {
    id: 'measurement',
    name: '品牌测量',
    oneLiner: '把传播与效果指标连接成可复盘的闭环，让预算与创意更可决策。',
    deliverables: ['指标框架', '前后测/实验方案', '活动后评估', '复盘报告', '优化建议'],
    cadence: '连接传播团队与数据/研究；强调口径对齐与可解释性。',
    entryEvidence: '1–2 份“目标→指标→数据→复盘→建议”的闭环文档。',
    wlbRisk: '数据口径对齐成本；归因与解释争议带来反复追问。',
    sections: {
      kernel: [
        '定义目标与指标体系（漏斗/增量/ROI 等）。',
        '设计测量方案（tracking、前后测、对照/实验），整合多源数据。',
        '把结果翻译成行动：人群/创意/渠道/预算的下一轮优化。',
      ],
      titleVariants: [
        'Brand / Marketing Effectiveness',
        'Comms / Media Measurement',
        'Marketing Analytics / Marketing Science',
        'Econometrics / MMM（更偏建模）',
      ],
      workflow: [
        '目标与指标 → 方案设计 → 数据整合 → 复盘解释 → 动作建议 → 下一轮优化',
      ],
      skillTree: [
        '指标与框架：漏斗、KPI/OKR、增量与归因的基本概念。',
        '研究能力：定性解释 Why + 量化验证 What（至少能读懂方法限制）。',
        '数据整合：Excel/Sheets 熟练；进阶可补 SQL/可视化工具。',
        '表达：把方法与结论讲清楚，能承受追问与复核。',
      ],
      marketSalary: ['趋势向上：英国市场对“可衡量的传播效果”要求持续增强。'],
      prosConsWlb: [
        '优点：可解释复盘价值高，技能栈更稀缺；路径可转增长/策略。',
        '风险：对量化敏感度要求高；组织成熟度差异大。',
        'WLB：相对可控，但大投放/大促/复盘窗口会阶段性忙。',
      ],
      actionAdvice: [
        '做 1 个闭环复盘：目标→指标→数据→复盘→建议（可用公开数据/小样本）。',
        '练“创意要素拆解 + 效果差异解释”，把传播背景变成优势。',
      ],
      roadmap: [
        { phase: '0–2个月（启动）', bullets: ['完成 1 份闭环复盘文档'] },
        { phase: '2–6个月（补齐）', bullets: ['指标/归因/增量思路到“能复盘”'] },
        { phase: '6–18个月（积累）', bullets: ['小样本数据复盘 + 可解释性训练'] },
        { phase: '毕业前6–12个月（冲刺）', bullets: ['面试材料：框架+复盘报告'] },
      ],
    },
  },
]

export type PathWeight = 0 | 1 | 2 | 3

/*
推荐算法透明化（来自用户需求）：
- 为每条路径定义 weight[path][A..H]（0–3）
- matchScore = Σ(dimScore * weight)
*/
export const PATH_WEIGHTS: Record<PathId, Record<DimensionKey, PathWeight>> = {
  'ux-research': { A: 3, B: 3, C: 3, D: 3, E: 2, F: 1, G: 0, H: 1 },
  'inhouse-insights': { A: 3, B: 1, C: 1, D: 3, E: 2, F: 1, G: 0, H: 3 },
  'agency-strategy': { A: 1, B: 3, C: 1, D: 3, E: 0, F: 3, G: 0, H: 1 },
  'research-consulting': { A: 3, B: 1, C: 2, D: 3, E: 2, F: 3, G: 0, H: 1 },
  'public-sector-research': { A: 3, B: 2, C: 1, D: 2, E: 2, F: 0, G: 3, H: 1 },
  measurement: { A: 2, B: 0, C: 0, D: 2, E: 3, F: 1, G: 0, H: 3 },
}

export type RoleProfile = Record<DimensionKey, number>

/*
岗位维度画像 roleProfile[path][A..H]
- 这里用 weight 映射：roleProfile = weight * 5（范围 0–15）
- 解释：0 表示几乎不要求该维度；15 表示该路径对该维度倾向很高
*/
export function weightsToRoleProfile(
  weights: Record<DimensionKey, PathWeight>,
): RoleProfile {
  const p: RoleProfile = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0 }
  for (const k of DIMENSION_ORDER) {
    p[k] = weights[k] * 5
  }
  return p
}

export const ROLE_PROFILES: Record<PathId, RoleProfile> = {
  'ux-research': weightsToRoleProfile(PATH_WEIGHTS['ux-research']),
  'inhouse-insights': weightsToRoleProfile(PATH_WEIGHTS['inhouse-insights']),
  'agency-strategy': weightsToRoleProfile(PATH_WEIGHTS['agency-strategy']),
  'research-consulting': weightsToRoleProfile(PATH_WEIGHTS['research-consulting']),
  'public-sector-research': weightsToRoleProfile(PATH_WEIGHTS['public-sector-research']),
  measurement: weightsToRoleProfile(PATH_WEIGHTS.measurement),
}

export function getPathById(pathId: PathId): Path {
  const found = PATHS.find((p) => p.id === pathId)
  if (!found) {
    throw new Error(`Unknown path: ${pathId}`)
  }
  return found
}


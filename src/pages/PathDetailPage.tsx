import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { DIMENSIONS } from '../domain/dimensions'
import { buildMatchExplanation, getMatchInsight } from '../domain/compare'
import { getPathById, type PathId } from '../domain/paths'
import { useStore } from '../state/useStore'
import { Accordion } from '../ui/Accordion'
import { RadarChart } from '../ui/charts/RadarChart'

function isPathId(v: string | undefined): v is PathId {
  return (
    v === 'ux-research' ||
    v === 'inhouse-insights' ||
    v === 'agency-strategy' ||
    v === 'research-consulting' ||
    v === 'public-sector-research' ||
    v === 'measurement'
  )
}

export function PathDetailPage() {
  const { pathId } = useParams()
  const { state, dispatch } = useStore()
  const invalid = !isPathId(pathId)
  const safePathId: PathId = invalid ? 'ux-research' : pathId

  const path = getPathById(safePathId)
  const roleProfile = state.roleProfiles[safePathId]
  const insight = useMemo(
    () => getMatchInsight(state.dimensionScores, roleProfile, safePathId),
    [roleProfile, safePathId, state.dimensionScores],
  )
  const explain = useMemo(() => buildMatchExplanation(insight), [insight])

  if (invalid) return <Navigate to="/paths" replace />

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0 }}>
          <h1 className="h1">{path.name}</h1>
          <p className="lead">{path.oneLiner}</p>
        </div>
        <div className="btnRow" style={{ marginTop: 0 }}>
          <Link to="/paths" className="btn btnGhost" style={{ textDecoration: 'none' }}>
            返回浏览
          </Link>
          <Link to="/matrix" className="btn" style={{ textDecoration: 'none' }}>
            去决策矩阵
          </Link>
        </div>
      </div>

      <div className="grid2" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitleRow">
              <h2 className="cardTitle">用户 vs 岗位画像（大图对比）</h2>
              <div className="meta">青=你 · 粉=岗位倾向</div>
            </div>
          </div>
          <div className="cardBody" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 14 }}>
            <div style={{ display: 'grid', placeItems: 'center' }}>
              <RadarChart size={320} values={state.dimensionScores} compareValues={roleProfile} />
            </div>
            <div>
              <div className="card" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="cardBody">
                  <div className="cardTitleRow">
                    <h3 className="cardTitle">匹配解释（2–4 句）</h3>
                    <div className="meta">不是只有一个分数</div>
                  </div>
                  <div className="divider" />
                  <div style={{ display: 'grid', gap: 8 }}>
                    {explain.advantageLines.map((t) => (
                      <div key={t} className="meta">
                        {t}
                      </div>
                    ))}
                    {explain.riskLines.map((t) => (
                      <div key={t} className="meta">
                        {t}
                      </div>
                    ))}
                  </div>

                  <div className="tagRow">
                    {insight.advantage.map((k) => (
                      <span key={`a-${k}`} className="tag tagGood">
                        优势 {k}·{DIMENSIONS[k].shortName}
                      </span>
                    ))}
                    {insight.risk.map((k) => (
                      <span key={`r-${k}`} className="tag tagRisk">
                        风险 {k}·{DIMENSIONS[k].shortName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="divider" />

              <div className="card" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="cardBody">
                  <div className="cardTitleRow">
                    <h3 className="cardTitle">个人备注（本地保存）</h3>
                    <div className="meta">写下你的证据与疑问</div>
                  </div>
                  <textarea
                    value={state.notes[safePathId] ?? ''}
                    onChange={(e) => dispatch({ type: 'notes/set', pathId: safePathId, text: e.target.value })}
                    placeholder="例如：我最愿意尝试的行业/公司、最担心的短板、下一个验证动作…"
                    className="noteArea"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">
            <div className="cardTitleRow">
              <h2 className="cardTitle">岗位信息（逐层展开）</h2>
              <div className="meta">总览 → 折叠详情</div>
            </div>
          </div>
          <div className="cardBody">
            <div className="tagRow">
              <span className="tag">交付物：{path.deliverables.slice(0, 2).join('、')}…</span>
              <span className="tag">入门证据：{path.entryEvidence}</span>
              <span className="tag">WLB 风险：{path.wlbRisk}</span>
            </div>

            <div className="divider" />

            <Accordion title="岗位内核（是什么）" defaultOpen>
              <ul className="ul">
                {path.sections.kernel.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="岗位名称变体（英国常见）">
              <ul className="ul">
                {path.sections.titleVariants.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="典型工作流（怎么做）">
              <ul className="ul">
                {path.sections.workflow.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="技能树（需要什么能力）">
              <ul className="ul">
                {path.sections.skillTree.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="市场与薪资（方向性参考）">
              <ul className="ul">
                {path.sections.marketSalary.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="优缺点与 WLB">
              <ul className="ul">
                {path.sections.prosConsWlb.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="验证型行动建议（尽快做出证据）">
              <ul className="ul">
                {path.sections.actionAdvice.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="路线图 / 计划方案（只读参考）">
              <div style={{ display: 'grid', gap: 10 }}>
                {path.sections.roadmap.map((s) => (
                  <div key={s.phase} className="roadPhase">
                    <div className="roadPhaseTitle">{s.phase}</div>
                    <ul className="ul" style={{ marginTop: 6 }}>
                      {s.bullets.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

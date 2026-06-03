import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { DIMENSIONS } from '../domain/dimensions'
import { buildMatchExplanation, getMatchInsight } from '../domain/compare'
import { getPathById, PATHS, type PathId } from '../domain/paths'
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
  const idx = PATHS.findIndex((p) => p.id === safePathId)
  const prevPath = PATHS[(idx - 1 + PATHS.length) % PATHS.length]
  const nextPath = PATHS[(idx + 1) % PATHS.length]
  const roleProfile = state.roleProfiles[safePathId]
  const insight = useMemo(
    () => getMatchInsight(state.dimensionScores, roleProfile, safePathId),
    [roleProfile, safePathId, state.dimensionScores],
  )
  const explain = useMemo(() => buildMatchExplanation(insight), [insight])

  const [allOpen, setAllOpen] = useState(false)
  const [forceOpen, setForceOpen] = useState<boolean | undefined>(undefined)

  if (invalid) return <Navigate to="/paths" replace />

  return (
    <div>
      <div className="pathTabs" aria-label="岗位切换">
        {PATHS.map((p) => (
          <Link
            key={p.id}
            to={`/paths/${p.id}`}
            className={`pathTab ${p.id === safePathId ? 'pathTabActive' : ''}`}
            aria-current={p.id === safePathId ? 'page' : undefined}
          >
            {p.name}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <h1 className="h1" style={{ margin: 0, fontSize: 28 }}>{path.name}</h1>
            <div className="pathCadence">{path.cadence}</div>
          </div>
          <p className="lead" style={{ margin: 0 }}>{path.oneLiner}</p>
        </div>
        <div className="btnRow" style={{ marginTop: 0 }}>
          <Link to="/paths" className="btn btnGhost" style={{ textDecoration: 'none' }}>
          返回列表
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
              <h2 className="cardTitle">用户 vs 岗位画像</h2>
              <div className="meta">青=你 · 粉=岗位倾向</div>
            </div>
          </div>
          <div className="cardBody splitChartXL" style={{ display: 'grid', gap: 24 }}>
            <div className="chartWrap" style={{ position: 'relative', top: 'auto', background: 'transparent', padding: 0 }}>
              <RadarChart size={280} values={state.dimensionScores} compareValues={roleProfile} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card cardSub">
                <div className="cardBody">
                  <div className="cardTitleRow">
                    <h3 className="cardTitle">匹配解释</h3>
                  </div>
                  <div className="divider" />
                  <div style={{ display: 'grid', gap: 8 }}>
                    <div className="textAdvantage">
                      {explain.advantageLine}
                    </div>
                    <div className="textRisk">
                      {explain.riskLine}
                    </div>
                  </div>

                  <div className="tagRow">
                    {insight.advantage.map((k) => (
                      <span key={`a-${k}`} className="tag tagGood">
                        优势：{DIMENSIONS[k].shortName}
                      </span>
                    ))}
                    {insight.risk.map((k) => (
                      <span key={`r-${k}`} className="tag tagRisk">
                        风险：{DIMENSIONS[k].shortName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card cardSub">
                <div className="cardBody">
                  <div className="cardTitleRow">
                    <h3 className="cardTitle">岗位速览</h3>
                  </div>
                  <div className="tagRow" style={{ marginTop: 12 }}>
                    <span className="tag">交付物：{path.deliverables.join('、')}</span>
                    <span className="tag">入门证据：{path.entryEvidence}</span>
                    <span className="tag">WLB 风险：{path.wlbRisk}</span>
                  </div>
                </div>
              </div>

              <div className="card cardSub">
                <div className="cardBody">
                  <div className="cardTitleRow">
                    <h3 className="cardTitle">个人备注</h3>
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
              <h2 className="cardTitle">岗位信息</h2>
              <button
                type="button"
                className="linkBtn meta"
                onClick={() => {
                  const next = !allOpen
                  setAllOpen(next)
                  setForceOpen(next)
                }}
                style={{ fontSize: 13 }}
              >
                {allOpen ? '折叠全部' : '展开全部'}
              </button>
            </div>
          </div>
          <div className="cardBody">
            <div className="sectionNav">
              <a className="sectionLink" href="#sec-kernel">岗位内核</a>
              <a className="sectionLink" href="#sec-titles">岗位名称变体</a>
              <a className="sectionLink" href="#sec-workflow">典型工作流</a>
              <a className="sectionLink" href="#sec-skills">技能树</a>
              <a className="sectionLink" href="#sec-market">市场与薪资</a>
              <a className="sectionLink" href="#sec-pros">优缺点与 WLB</a>
              <a className="sectionLink" href="#sec-action">验证型行动建议</a>
              <a className="sectionLink" href="#sec-roadmap">路线图 / 计划方案</a>
            </div>

            <div id="sec-kernel" className="sectionAnchor">
              <Accordion title="岗位内核" defaultOpen forceOpen={forceOpen}>
                <ul className="ul">
                  {path.sections.kernel.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Accordion>
            </div>

            <div id="sec-titles" className="sectionAnchor">
              <Accordion title="岗位名称变体" defaultOpen forceOpen={forceOpen}>
                <ul className="ul">
                  {path.sections.titleVariants.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Accordion>
            </div>

            <div id="sec-workflow" className="sectionAnchor">
              <Accordion title="典型工作流" defaultOpen forceOpen={forceOpen}>
                <ul className="ul">
                  {path.sections.workflow.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Accordion>
            </div>

            <div id="sec-skills" className="sectionAnchor">
              <Accordion title="技能树" defaultOpen forceOpen={forceOpen}>
                <ul className="ul">
                  {path.sections.skillTree.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Accordion>
            </div>

            <div id="sec-market" className="sectionAnchor">
              <Accordion title="市场与薪资" defaultOpen forceOpen={forceOpen}>
                <ul className="ul">
                  {path.sections.marketSalary.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Accordion>
            </div>

            <div id="sec-pros" className="sectionAnchor">
              <Accordion title="优缺点与 WLB" defaultOpen forceOpen={forceOpen}>
                <ul className="ul">
                  {path.sections.prosConsWlb.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Accordion>
            </div>

            <div id="sec-action" className="sectionAnchor">
              <Accordion title="验证型行动建议" forceOpen={forceOpen}>
                <ul className="ul">
                  {path.sections.actionAdvice.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Accordion>
            </div>

            <div id="sec-roadmap" className="sectionAnchor">
              <Accordion title="路线图 / 计划方案" forceOpen={forceOpen}>
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
      <div className="card cardSub" style={{ marginTop: 16 }}>
        <div className="cardBody">
          <div className="meta">这里的“岗位”指 6 条职业路径中的一条；用于横向对比你的偏好画像与岗位倾向。</div>
          <div className="btnRow" style={{ justifyContent: 'space-between' }}>
            <Link to={`/paths/${prevPath.id}`} className="btn btnGhost" style={{ textDecoration: 'none' }}>
              上一岗位：{prevPath.name}
            </Link>
            <Link to={`/paths/${nextPath.id}`} className="btn btnGhost" style={{ textDecoration: 'none' }}>
              下一岗位：{nextPath.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

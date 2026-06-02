import { Link, useNavigate } from 'react-router-dom'
import { DIMENSION_ORDER, DIMENSIONS } from '../domain/dimensions'
import { getPathById, PATH_WEIGHTS } from '../domain/paths'
import { useStore } from '../state/useStore'
import { RadarChart } from '../ui/charts/RadarChart'
import { Accordion } from '../ui/Accordion'

export function ResultsPage() {
  const { state } = useStore()
  const navigate = useNavigate()

  const rec = state.recommendations?.top ?? []

  return (
    <div>
      <h1 className="h1">结果总览</h1>
      <p className="lead">
        你得到的是“工作偏好画像”（不是能力高低）。接下来会用透明权重算法推荐 2–3
        条路径，并展示匹配来源。
      </p>

      <div className="grid2" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitleRow">
              <h2 className="cardTitle">8 维度画像</h2>
              <div className="meta">每维 3–15 分</div>
            </div>
          </div>
          <div className="cardBody splitChart">
            <div className="chartWrap">
              <RadarChart size={240} values={state.dimensionScores} />
            </div>
            <div className="chartSide">
              {DIMENSION_ORDER.map((k) => {
                const v = state.dimensionScores[k]
                return (
                  <div key={k} className="dimRow">
                    <div className="dimHead">
                      <div className="dimKey">{k}</div>
                      <div style={{ minWidth: 0 }}>
                        <div className="dimName">{DIMENSIONS[k].name}</div>
                        <div className="dimDesc">{DIMENSIONS[k].oneLiner}</div>
                      </div>
                      <div className="dimScore">{v}/15</div>
                    </div>
                    <div className="dimBar">
                      <div className="dimBarFill" style={{ width: `${(v / 15) * 100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">
            <div className="cardTitleRow">
              <h2 className="cardTitle">推荐路径 Top {rec.length}</h2>
              <div className="meta">matchScore = Σ(dimScore × weight)</div>
            </div>
          </div>
          <div className="cardBody">
            {rec.length === 0 ? (
              <div className="meta">还未完成问卷。</div>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {rec.map((r, idx) => {
                  const path = getPathById(r.pathId)
                  return (
                    <div key={r.pathId} className="card cardSub">
                      <div className="cardBody">
                        <div className="cardTitleRow">
                          <div style={{ minWidth: 0 }}>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                              <div className="tag" style={{ borderRadius: 999, fontSize: 12 }}>
                                Top {idx + 1}
                              </div>
                              <div className="pathName">{path.name}</div>
                            </div>
                            <div className="meta" style={{ marginTop: 6 }}>
                              {path.oneLiner}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, letterSpacing: '-0.5px' }}>
                              {r.matchScore}
                            </div>
                            <div className="meta">matchScore</div>
                          </div>
                        </div>

                        <div className="tagRow">
                          {r.highlightDims.map((k) => (
                            <span key={k} className="tag tagGood">
                              亮点 {k}·{DIMENSIONS[k].shortName}
                            </span>
                          ))}
                        </div>

                        <div className="btnRow">
                          <button type="button" className="btn btnPrimary" onClick={() => navigate(`/paths/${r.pathId}`)}>
                            看岗位详情
                          </button>
                          <Link to="/paths" className="btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                            岗位浏览对比
                          </Link>
                        </div>

                        <Accordion title="查看可复现计算（维度贡献拆解）">
                          <div className="meta">
                            weight 取值 0–3；dimScore 取值 0–15；贡献 = dimScore × weight。
                          </div>
                          <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
                            {DIMENSION_ORDER.map((k) => {
                              const w = PATH_WEIGHTS[r.pathId][k]
                              const s = state.dimensionScores[k]
                              const c = s * w
                              return (
                                <div key={k} className="breakRow">
                                  <div className="breakKey">{k}</div>
                                  <div className="breakMid">
                                    <span className="meta">{DIMENSIONS[k].name}</span>
                                  </div>
                                  <div className="breakNums">
                                    <span>{s}</span>
                                    <span className="meta">×</span>
                                    <span>{w}</span>
                                    <span className="meta">=</span>
                                    <span style={{ fontWeight: 800 }}>{c}</span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </Accordion>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="divider" />

            <div className="btnRow">
              <button type="button" className="btn" onClick={() => navigate('/paths')}>
                进入岗位浏览（对比可视化）
              </button>
              <button type="button" className="btn" onClick={() => navigate('/matrix')}>
                打开决策矩阵（把权衡显性化）
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

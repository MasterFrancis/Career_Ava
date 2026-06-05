import { Link, useNavigate } from 'react-router-dom'
import { DIMENSION_ORDER, DIMENSIONS } from '../domain/dimensions'
import { getPathById, PATH_WEIGHTS } from '../domain/paths'
import { useStore } from '../state/useStore'
import { RadarChart } from '../ui/charts/RadarChart'
import { Accordion } from '../ui/Accordion'

const PIXEL_ICON_PATTERNS: Record<string, string[]> = {
  A: ['01111110', '11000011', '10111101', '10100101', '10100101', '10111101', '11000011', '01111110'],
  B: ['00111100', '01111110', '11000011', '11000011', '11001111', '01111110', '00111110', '00000111'],
  C: ['00100100', '01111110', '11111111', '00100100', '00111100', '01111110', '11000011', '00000000'],
  D: ['00011000', '00111100', '00111100', '00111100', '00111100', '00111100', '01111110', '01011010'],
  E: ['11000011', '11000011', '11011011', '11011011', '11011011', '11011011', '11111111', '00000000'],
  F: ['00111100', '01100110', '11000011', '11011011', '11011011', '11000011', '01111110', '00111100'],
  G: ['00111100', '01111110', '11100111', '11000011', '11000011', '11100111', '01111110', '00111100'],
  H: ['00111100', '01111110', '11111111', '11100111', '11100111', '11111111', '01111110', '00111100'],
}

function PixelDimensionIcon({ id, compact = false }: { id: string; compact?: boolean }) {
  const pattern = PIXEL_ICON_PATTERNS[id] ?? PIXEL_ICON_PATTERNS.A
  return (
    <span className={`pixelDimIcon ${compact ? 'pixelDimIconCompact' : ''}`} aria-hidden="true">
      {pattern.map((row, rowIndex) =>
        row.split('').map((cell, colIndex) => (
          <span
            key={`${id}-${rowIndex}-${colIndex}`}
            className={`pixelDimCell ${cell === '1' ? 'pixelDimCellOn' : ''}`}
          />
        )),
      )}
    </span>
  )
}

export function ResultsPage() {
  const { state } = useStore()
  const navigate = useNavigate()

  const rec = state.recommendations?.top ?? []

  return (
    <div>
      <div className="pageIntro">
        <h1 className="h1">结果总览</h1>
        <p className="lead">
          你得到的是“工作偏好画像”（不是能力高低）。接下来会用透明权重算法推荐 2–3
          条路径，并展示匹配来源。
        </p>
      </div>

      <div className="grid2" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitleRow">
              <h2 className="cardTitle">8 维度画像</h2>
              <div className="meta">每维 3–15 分</div>
            </div>
          </div>
          <div className="cardBody splitChart">
            <div className="chartWrap chartWrapCrop" style={{ gridRow: 1, display: 'flex', justifyContent: 'center' }}>
              <RadarChart size={400} values={state.dimensionScores} />
            </div>
            <div className="chartSide">
              {DIMENSION_ORDER.map((k) => {
                const v = state.dimensionScores[k]
                return (
                  <div key={k} className="dimRow">
                    <div className="dimHead">
                      <div className="dimKey"><PixelDimensionIcon id={k} /></div>
                      <div style={{ minWidth: 0 }}>
                        <div className="dimName">{DIMENSIONS[k].name}</div>
                        <div className="dimDesc">{DIMENSIONS[k].oneLiner}</div>
                      </div>
                      <div className="dimScore">{v}/15</div>
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
                              <div className="pathName" style={{ fontSize: 18 }}>{path.name}</div>
                            </div>
                            <div style={{ marginTop: 8, color: 'var(--text)', fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
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
                              亮点：{DIMENSIONS[k].shortName}
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

                        <Accordion title="维度贡献拆解" className="resultsAccordion">
                          <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
                            {DIMENSION_ORDER.map((k) => {
                              const w = PATH_WEIGHTS[r.pathId][k]
                              const s = state.dimensionScores[k]
                              const c = s * w
                              return (
                                <div key={k} className="breakRow">
                                  <div className="breakKey"><PixelDimensionIcon id={k} compact /></div>
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

          </div>
        </div>
      </div>
      
      <div className="btnRow" style={{ marginTop: 24, justifyContent: 'center', gap: 16 }}>
        <button type="button" className="btn btnPrimary" style={{ padding: '14px 28px', fontSize: 16 }} onClick={() => navigate('/paths')}>
          进入岗位浏览（对比可视化）
        </button>
        <button type="button" className="btn" style={{ padding: '14px 28px', fontSize: 16 }} onClick={() => navigate('/matrix')}>
          打开决策矩阵（把权衡显性化）
        </button>
      </div>
    </div>
  )
}

import type { CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DIMENSION_ORDER, DIMENSIONS } from '../domain/dimensions'
import { getPathById, PATH_WEIGHTS } from '../domain/paths'
import { useStore } from '../state/useStore'
import { RadarChart } from '../ui/charts/RadarChart'
import { Accordion } from '../ui/Accordion'

const PIXEL_ICON_PATTERNS: Record<string, string[]> = {
  // 箱子 / 结构
  A: ['0011111000', '0111111100', '1101101110', '1100000110', '1111111110', '0110011000', '0110011000', '0110011000', '1111111110', '0000000000'],
  // 放大镜 / 追问
  B: ['0011110000', '0110011000', '1100001100', '1100001100', '1100001100', '0110011000', '0011111000', '0000111100', '0000011000', '0000000000'],
  // 双人 / 协作
  C: ['0011001100', '0111011110', '0011001100', '0111111110', '1111111111', '1101101011', '1101101011', '0100100010', '1110111011', '0000000000'],
  // 喇叭 / 表达
  D: ['0000110000', '0001111000', '1111111110', '1111111111', '1111111110', '0001111000', '0001111000', '0001111000', '0011001100', '0000000000'],
  // 柱状图 / 测量
  E: ['0000000000', '0011000000', '0011001100', '0011001100', '0011011110', '0011011110', '0111011110', '0111111111', '1111111111', '0000000000'],
  // 时钟 / 节奏
  F: ['0011111000', '0111111100', '1100001110', '1101100110', '1101111110', '1100011110', '1100001110', '0111111100', '0011111000', '0000000000'],
  // 盾牌 / 公共
  G: ['0011111000', '0111111100', '1111111110', '1110011110', '1110011110', '1110011110', '0111111100', '0011111000', '0001110000', '0000000000'],
  // 靶心 / 商业
  H: ['0011111000', '0111111100', '1101101110', '1110011110', '1101101110', '1111111110', '1101101110', '0111111100', '0011111000', '0000000000'],
}

function PixelDimensionIcon({ id, compact = false }: { id: string; compact?: boolean }) {
  const pattern = PIXEL_ICON_PATTERNS[id] ?? PIXEL_ICON_PATTERNS.A
  const rowCount = pattern.length
  const colCount = pattern[0]?.length ?? 0
  return (
    <span
      className={`pixelDimIcon pixelDimIcon${id} ${compact ? 'pixelDimIconCompact' : ''}`}
      style={{ '--pixel-rows': rowCount, '--pixel-cols': colCount } as CSSProperties}
      aria-hidden="true"
    >
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

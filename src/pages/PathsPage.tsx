import { Link } from 'react-router-dom'
import { DIMENSIONS } from '../domain/dimensions'
import { buildMatchExplanation, getMatchInsight } from '../domain/compare'
import { PATHS } from '../domain/paths'
import { useStore } from '../state/useStore'
import { RadarChart } from '../ui/charts/RadarChart'
import { Accordion } from '../ui/Accordion'

export function PathsPage() {
  const { state } = useStore()

  return (
    <div>
      <h1 className="h1">岗位浏览 · 用户 vs 岗位画像</h1>
      <p className="lead">
        每张卡片右上角是迷你雷达：青色=你，粉色=岗位倾向。下面的标签是“优势维度/风险维度”的短提示（点击进入详情看完整解释与大图对比）。
      </p>

      <Accordion title="对比规则（为什么是优势/风险）">
        <div className="meta">
          优势：你明显高于岗位倾向，或在岗位高权重维度上得分很高。风险：岗位倾向高但你得分偏低，可能更容易感到不舒服或需要补齐。
        </div>
      </Accordion>

      <div style={{ display: 'grid', gap: 14, marginTop: 14 }}>
        {PATHS.map((p) => {
          const roleProfile = state.roleProfiles[p.id]
          const insight = getMatchInsight(state.dimensionScores, roleProfile, p.id)
          const lines = buildMatchExplanation(insight)

          return (
            <Link
              key={p.id}
              to={`/paths/${p.id}`}
              className="card clickCard"
              style={{
                textDecoration: 'none',
                display: 'block',
                position: 'relative',
              }}
            >
              <div className="cardBody">
                <div className="pathCardHead">
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                      <div className="pathName">{p.name}</div>
                      <div className="meta">{p.cadence}</div>
                    </div>
                    <div className="meta" style={{ marginTop: 8 }}>
                      {p.oneLiner}
                    </div>
                  </div>

                  <div className="miniViz">
                    <RadarChart size={118} values={state.dimensionScores} compareValues={roleProfile} showLabels={false} />
                  </div>
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

                <div className="pathCardLines">
                  <div className="pathCardLineBlock">
                    <div className="meta" style={{ marginBottom: 6 }}>
                      解释（简版）
                    </div>
                    <div style={{ display: 'grid', gap: 6 }}>
                      {lines.advantageLines.slice(0, 2).map((t) => (
                        <div key={t} className="meta">
                          {t}
                        </div>
                      ))}
                      {lines.riskLines.slice(0, 2).map((t) => (
                        <div key={t} className="meta">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pathCardCTA meta">点击卡片 → 查看详情、完整对比与路线图</div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

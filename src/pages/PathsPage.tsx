import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DIMENSIONS } from '../domain/dimensions'
import { buildMatchExplanation, getMatchInsight } from '../domain/compare'
import { PATHS } from '../domain/paths'
import { useStore } from '../state/useStore'
import { RadarChart } from '../ui/charts/RadarChart'
import { Accordion } from '../ui/Accordion'

export function PathsPage() {
  const { state } = useStore()
  const [filter, setFilter] = useState<'all' | 'top' | 'lowRisk' | 'agency' | 'public'>('all')

  const topIds = state.recommendations?.top.map((r) => r.pathId) ?? []

  const paths = useMemo(() => {
    if (filter === 'top') {
      return topIds.map((id) => PATHS.find((p) => p.id === id)).filter(Boolean) as typeof PATHS
    }

    let list = PATHS
    if (filter === 'public') {
      list = list.filter((p) => p.id === 'public-sector-research')
    }
    if (filter === 'agency') {
      list = list.filter((p) => p.id === 'agency-strategy' || p.id === 'research-consulting')
    }
    if (filter === 'lowRisk') {
      list = list.filter((p) => {
        const roleProfile = state.roleProfiles[p.id]
        const insight = getMatchInsight(state.dimensionScores, roleProfile, p.id)
        return insight.risk.length === 0
      })
    }
    return list
  }, [filter, state.dimensionScores, state.roleProfiles, topIds])

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

      <div className="segmentGroup" style={{ marginTop: 12, width: 'fit-content' }}>
        <button type="button" className={`segmentBtn ${filter === 'all' ? 'segmentBtnActive' : ''}`} onClick={() => setFilter('all')}>
          全部
        </button>
        <button
          type="button"
          className={`segmentBtn ${filter === 'top' ? 'segmentBtnActive' : ''}`}
          onClick={() => setFilter('top')}
          disabled={topIds.length === 0}
          title={topIds.length === 0 ? '完成问卷后可用' : '仅看推荐 Top'}
        >
          推荐 Top
        </button>
        <button type="button" className={`segmentBtn ${filter === 'lowRisk' ? 'segmentBtnActive' : ''}`} onClick={() => setFilter('lowRisk')}>
          风险少
        </button>
        <button type="button" className={`segmentBtn ${filter === 'agency' ? 'segmentBtnActive' : ''}`} onClick={() => setFilter('agency')}>
          乙方咨询
        </button>
        <button type="button" className={`segmentBtn ${filter === 'public' ? 'segmentBtnActive' : ''}`} onClick={() => setFilter('public')}>
          公共部门
        </button>
      </div>

      <div style={{ display: 'grid', gap: 14, marginTop: 14 }}>
        {paths.map((p) => {
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
              <div className="cardBody" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16 }}>
                <div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="pathName" style={{ fontSize: 18 }}>{p.name}</div>
                      <div className="pathCadence">{p.cadence}</div>
                    </div>
                    <div style={{ marginTop: 8, color: 'var(--text)', fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
                      {p.oneLiner}
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
                      <div style={{ display: 'grid', gap: 8 }}>
                        <div className="textAdvantage">
                          {lines.advantageLine}
                        </div>
                        <div className="textRisk">
                          {lines.riskLine}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="miniViz" style={{ alignSelf: 'start' }}>
                  <RadarChart size={118} values={state.dimensionScores} compareValues={roleProfile} showLabels={false} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

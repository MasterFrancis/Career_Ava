import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { computeMatrixRanking, MATRIX_COLUMNS, type MatrixScore, type MatrixWeight } from '../domain/matrix'
import { PATHS } from '../domain/paths'
import { useStore } from '../state/useStore'
import { Accordion } from '../ui/Accordion'
import { Info, ArrowUpDown } from 'lucide-react'

export function MatrixPage() {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()

  const ranking = useMemo(() => computeMatrixRanking(state.matrix), [state.matrix])
  const [order, setOrder] = useState(() => PATHS.map(p => p.id))

  const handleSort = () => {
    setOrder(ranking.map(r => r.pathId))
  }

  // const maxTotal = ranking[0]?.total ?? 1

  return (
    <div>
      <div className="pageIntro">
        <h1 className="h1">决策矩阵</h1>
        <p className="lead">
          把“权衡”显性化：你可以把测评推荐的 2–4 条路径带到这里，按你在意的列权重与评分计算总分并排序。
        </p>
        <Accordion title="怎么用" defaultOpen className="pageAccordion">
          <div className="meta" style={{ display: 'grid', gap: 8 }}>
            <div>1) 先在结果页/岗位浏览页选 2–4 条候选路径；</div>
            <div>2) 先调列权重（不太重要–非常重要）：权重代表“你有多在意”；</div>
            <div>3) 再填每条路径评分（1–5）：不是追求满分，而是看清取舍。</div>
          </div>
        </Accordion>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="cardBody" style={{ overflowX: 'visible' }}>
          <table className="matrixTable" style={{ fontSize: '0.85em' }}>
            <thead>
              <tr>
                <th className="matrixTh" style={{ width: 80 }}>
                  <button type="button" className="btn" style={{ padding: '4px 8px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, margin: '0 auto' }} onClick={handleSort} title="按当前总分重新排序">
                    排序
                    <ArrowUpDown size={14} strokeWidth={3} />
                  </button>
                </th>
                <th className="matrixTh" style={{ textAlign: 'left' }}>路径</th>
                {MATRIX_COLUMNS.map((c) => (
                  <th key={c.id} className="matrixTh">
                    <div style={{ display: 'grid', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 760 }}>
                        {c.name}
                        {c.desc && (
                          <div className="tooltipWrap" style={{ color: 'var(--muted)' }}>
                            <Info size={14} />
                            <div className="tooltipContent">{c.desc}</div>
                          </div>
                        )}
                      </div>
                      <select
                        className="matrixSelect"
                        value={state.matrix.columnWeights[c.id]}
                        onChange={(e) =>
                          dispatch({
                            type: 'matrix/setWeight',
                            columnId: c.id,
                            weight: Number(e.target.value) as MatrixWeight,
                          })
                        }
                      >
                        <option value={1}>不太重要</option>
                        <option value={2}>一般</option>
                        <option value={3}>非常重要</option>
                      </select>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {order.map((pathId) => {
                const p = PATHS.find((pp) => pp.id === pathId)!
                const rankIndex = ranking.findIndex(r => r.pathId === pathId)
                const rankInfo = ranking[rankIndex]
                return (
                  <tr key={p.id}>
                    <td className="matrixTd">
                      <div className="tag" style={{ padding: '4px 8px', width: 'fit-content', fontWeight: 800 }}>
                        #{rankIndex + 1}
                      </div>
                      <div className="meta" style={{ marginTop: 6, fontWeight: 700 }}>
                        {rankInfo.total} 分
                      </div>
                    </td>
                    <td className="matrixTd matrixName">
                      <button type="button" className="linkBtn" onClick={() => navigate(`/paths/${p.id}`)} style={{ fontWeight: 800 }}>
                        {p.name}
                      </button>
                    </td>
                    {MATRIX_COLUMNS.map((c) => (
                      <td key={c.id} className="matrixTd">
                        <div className="segmentGroup" style={{ gap: 2, padding: 3, width: '100%', display: 'flex' }}>
                          {[1, 2, 3, 4, 5].map((v) => {
                            const active = state.matrix.scores[p.id][c.id] === v
                            return (
                              <button
                                key={v}
                                type="button"
                                className={`segmentBtn matrixScoreBtn ${active ? 'segmentBtnActive' : ''}`}
                                style={{ padding: '4px 0', flex: 1, minWidth: 24, fontSize: 13, textAlign: 'center' }}
                                onClick={() =>
                                  dispatch({
                                    type: 'matrix/setScore',
                                    pathId: p.id,
                                    columnId: c.id,
                                    score: v as MatrixScore,
                                  })
                                }
                              >
                                {v}
                              </button>
                            )
                          })}
                        </div>
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

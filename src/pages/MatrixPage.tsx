import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { computeMatrixRanking, MATRIX_COLUMNS, type MatrixScore, type MatrixWeight } from '../domain/matrix'
import { PATHS } from '../domain/paths'
import { useStore } from '../state/useStore'
import { Accordion } from '../ui/Accordion'

export function MatrixPage() {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()

  const ranking = useMemo(() => computeMatrixRanking(state.matrix), [state.matrix])
  // const maxTotal = ranking[0]?.total ?? 1

  return (
    <div>
      <h1 className="h1">决策矩阵</h1>
      <p className="lead">
        把“权衡”显性化：你可以把测评推荐的 2–4 条路径带到这里，按你在意的列权重与评分计算总分并排序。
      </p>

      <Accordion title="怎么用（超短引导）" defaultOpen>
        <div className="meta" style={{ display: 'grid', gap: 8 }}>
          <div>1) 先在结果页/岗位浏览页选 2–4 条候选路径；</div>
          <div>2) 先调列权重（1–3）：权重代表“你有多在意”；</div>
          <div>3) 再填每条路径评分（1–5）：不是追求满分，而是看清取舍。</div>
        </div>
      </Accordion>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="cardHeader">
          <div className="cardTitleRow">
            <h2 className="cardTitle">矩阵表</h2>
            <div className="meta">本地自动保存，实时重新排序</div>
          </div>
        </div>
        <div className="cardBody" style={{ overflowX: 'auto' }}>
          <table className="matrixTable">
            <thead>
              <tr>
                <th className="matrixTh">排名</th>
                <th className="matrixTh">路径</th>
                {MATRIX_COLUMNS.map((c) => (
                  <th key={c.id} className="matrixTh">
                    <div style={{ display: 'grid', gap: 8 }}>
                      <div style={{ fontWeight: 760 }}>{c.name}</div>
                      <div className="segmentGroup">
                        {[1, 2, 3].map((v) => {
                          const active = state.matrix.columnWeights[c.id] === v
                          return (
                            <button
                              key={v}
                              type="button"
                              className={`segmentBtn ${active ? 'segmentBtnActive' : ''}`}
                              onClick={() =>
                                dispatch({
                                  type: 'matrix/setWeight',
                                  columnId: c.id,
                                  weight: v as MatrixWeight,
                                })
                              }
                            >
                              权重 {v}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ranking.map((r, idx) => {
                const p = PATHS.find((pp) => pp.id === r.pathId)!
                return (
                  <tr key={p.id}>
                    <td className="matrixTd">
                      <div className="tag" style={{ padding: '4px 8px', width: 'fit-content', fontWeight: 800 }}>
                        #{idx + 1}
                      </div>
                      <div className="meta" style={{ marginTop: 6, fontWeight: 700 }}>
                        {r.total} 分
                      </div>
                    </td>
                    <td className="matrixTd matrixName">
                      <button type="button" className="linkBtn" onClick={() => navigate(`/paths/${p.id}`)} style={{ fontWeight: 800 }}>
                        {p.name}
                      </button>
                    </td>
                    {MATRIX_COLUMNS.map((c) => (
                      <td key={c.id} className="matrixTd">
                        <div className="segmentGroup">
                          {[1, 2, 3, 4, 5].map((v) => {
                            const active = state.matrix.scores[p.id][c.id] === v
                            return (
                              <button
                                key={v}
                                type="button"
                                className={`segmentBtn ${active ? 'segmentBtnActive' : ''}`}
                                style={{ padding: '6px 10px' }}
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

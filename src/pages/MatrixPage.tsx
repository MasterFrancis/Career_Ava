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
  const maxTotal = ranking[0]?.total ?? 1

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

      <div className="grid2" style={{ marginTop: 14, gridTemplateColumns: '1.25fr 0.75fr' }}>
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitleRow">
              <h2 className="cardTitle">矩阵表</h2>
              <div className="meta">本地自动保存</div>
            </div>
          </div>
          <div className="cardBody" style={{ overflowX: 'auto' }}>
            <table className="matrixTable">
              <thead>
                <tr>
                  <th className="matrixTh">路径</th>
                  {MATRIX_COLUMNS.map((c) => (
                    <th key={c.id} className="matrixTh">
                      <div style={{ display: 'grid', gap: 6 }}>
                        <div style={{ fontWeight: 760 }}>{c.name}</div>
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
                          {[1, 2, 3].map((v) => (
                            <option key={v} value={v}>
                              权重 {v}
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PATHS.map((p) => (
                  <tr key={p.id}>
                    <td className="matrixTd matrixName">
                      <button type="button" className="linkBtn" onClick={() => navigate(`/paths/${p.id}`)}>
                        {p.name}
                      </button>
                    </td>
                    {MATRIX_COLUMNS.map((c) => (
                      <td key={c.id} className="matrixTd">
                        <select
                          className="matrixSelect"
                          value={state.matrix.scores[p.id][c.id]}
                          onChange={(e) =>
                            dispatch({
                              type: 'matrix/setScore',
                              pathId: p.id,
                              columnId: c.id,
                              score: Number(e.target.value) as MatrixScore,
                            })
                          }
                        >
                          {[1, 2, 3, 4, 5].map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">
            <div className="cardTitleRow">
              <h2 className="cardTitle">自动排名</h2>
              <div className="meta">总分 = Σ(权重×评分)</div>
            </div>
          </div>
          <div className="cardBody" style={{ display: 'grid', gap: 10 }}>
            {ranking.map((r, idx) => {
              const p = PATHS.find((pp) => pp.id === r.pathId)!
              return (
                <div key={r.pathId} className="rankRow">
                  <div className="rankHead">
                    <div className="tag" style={{ padding: '4px 8px' }}>
                      #{idx + 1}
                    </div>
                    <div style={{ fontWeight: 860, color: 'rgba(255,255,255,0.92)' }}>{p.name}</div>
                    <div className="meta" style={{ marginLeft: 'auto' }}>
                      {r.total}
                    </div>
                  </div>
                  <div className="rankBar">
                    <div className="rankBarFill" style={{ width: `${(r.total / maxTotal) * 100}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { DIMENSION_ORDER, DIMENSIONS } from '../domain/dimensions'
import { isQuizComplete } from '../domain/quiz'
import { useStore } from '../state/useStore'

export function WelcomePage() {
  const { state } = useStore()
  const navigate = useNavigate()

  const answeredCount = useMemo(
    () => state.quizAnswers.filter((a) => a != null).length,
    [state.quizAnswers],
  )

  const complete = isQuizComplete(state.quizAnswers)

  return (
    <div>
      <h1 className="h1">职业路径 Web App · 强引导版</h1>
      <p className="lead">
        这是你提供的报告的“逐层展开”交互化版本：先用 24 题得到 8 维度画像，再用透明算法给出可解释推荐，并在岗位浏览阶段用“用户画像 vs 岗位倾向”帮助你理解匹配度来源。
      </p>

      <div className="grid2">
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitleRow">
              <h2 className="cardTitle">你将经历的流程</h2>
              <div className="meta">本地存储 · 可随时继续</div>
            </div>
          </div>
          <div className="cardBody">
            <div className="tagRow">
              <span className="tag">欢迎页</span>
              <span className="tag">问卷（逐题）</span>
              <span className="tag">结果总览（8维）</span>
              <span className="tag">岗位浏览（对比可视化）</span>
              <span className="tag">岗位详情</span>
              <span className="tag">路线图（只读）</span>
            </div>

            <div className="divider" />

            <div className="btnRow">
              <button type="button" className="btn btnPrimary" onClick={() => navigate('/quiz')}>
                {answeredCount === 0 ? '开始问卷' : '继续问卷'}
              </button>
              {complete && (
                <button type="button" className="btn" onClick={() => navigate('/results')}>
                  查看上次结果
                </button>
              )}
              {answeredCount > 0 && !complete && (
                <span className="meta">已答 {answeredCount}/24</span>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">
            <div className="cardTitleRow">
              <h2 className="cardTitle">8 维度速览</h2>
              <div className="meta">A–H · 每维 3 题</div>
            </div>
          </div>
          <div className="cardBody">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
              {DIMENSION_ORDER.map((k) => (
                <div key={k} className="tag" style={{ borderRadius: 14, padding: 10 }}>
                  <div style={{ fontWeight: 760, color: 'rgba(255,255,255,0.9)' }}>
                    {k} · {DIMENSIONS[k].name}
                  </div>
                  <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
                    {DIMENSIONS[k].oneLiner}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

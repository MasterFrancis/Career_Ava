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
    <div className="homeHero">
      <div className="homeHeroGrid">
        <div className="homeHeroLeft">
          <div className="homeKicker">Career Flow · UK</div>
          <h1 className="homeTitle">把职业选择变成一条可走的路</h1>
          <p className="homeSub">
            24 题 → 8 维度画像 → 可解释推荐 → 用户画像 vs 岗位倾向对比。
          </p>

          <div className="homeActions">
            <button type="button" className="btn btnPrimary" onClick={() => navigate('/quiz')}>
              {answeredCount === 0 ? '开始问卷' : '继续问卷'}
            </button>
            {complete && (
              <button type="button" className="btn" onClick={() => navigate('/results')}>
                查看上次结果
              </button>
            )}
            {answeredCount > 0 && !complete && <span className="meta">已答 {answeredCount}/24</span>}
          </div>

          <div className="homeChips">
            <span className="chip">无后端 · 全本地存储</span>
            <span className="chip">推荐可复现可拆解</span>
            <span className="chip">对比可视化解释匹配来源</span>
          </div>
        </div>

        <div className="homeHeroRight">
          <div className="homeStat">
            <div className="homeStatNum">8</div>
            <div className="homeStatText">维度画像</div>
          </div>
          <div className="homeStat">
            <div className="homeStatNum">6</div>
            <div className="homeStatText">路径对比</div>
          </div>
          <div className="homeStat">
            <div className="homeStatNum">1</div>
            <div className="homeStatText">决策矩阵</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <details className="accordion">
          <summary className="accordionSummary">
            <span>展开查看 8 维度说明</span>
            <span className="accordionRight">
              <span className="accordionHint">展开</span>
              <svg
                className="accordionChevron"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                role="presentation"
                aria-hidden="true"
              >
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </summary>
          <div className="accordionBody">
            <div className="dimExplainGrid">
              {DIMENSION_ORDER.map((k) => (
                <div key={k} className="dimExplainCard">
                  <div className="dimExplainHead">
                    <div className="dimExplainKey">{k}</div>
                    <div>
                      <div className="dimExplainName">{DIMENSIONS[k].name}</div>
                      <div className="dimExplainText">{DIMENSIONS[k].oneLiner}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}

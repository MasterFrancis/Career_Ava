import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
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
          <h1 className="homeTitle">职业地图已加载</h1>
          <p className="homeSub">
            欢迎来到你的职业冒险地图。用 24 道题点亮能力属性，在英国求职世界里解锁 6 条高壁垒路线，看看哪一条最适合你升级打怪。
          </p>

          <div className="homeActions">
            <button type="button" className="btn btnPrimary homePixelBtn homePixelBtnPrimary" onClick={() => navigate('/quiz')}>
              {answeredCount === 0 ? '开始问卷' : '继续问卷'}
            </button>
            {complete && (
              <button type="button" className="btn homePixelBtn homePixelBtnGhost" onClick={() => navigate('/results')}>
                查看上次结果
              </button>
            )}
            {answeredCount > 0 && !complete && <span className="meta">已答 {answeredCount}/24</span>}
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
    </div>
  )
}

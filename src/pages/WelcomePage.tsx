import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { DIMENSION_ORDER, DIMENSIONS } from '../domain/dimensions'
import { isQuizComplete } from '../domain/quiz'
import { useStore } from '../state/useStore'
import { 
  Box, Search, Users, Mic, 
  LineChart, Clock, Shield, Target 
} from 'lucide-react'

const DIM_ICONS: Record<string, React.ReactNode> = {
  A: <Box size={18} />,
  B: <Search size={18} />,
  C: <Users size={18} />,
  D: <Mic size={18} />,
  E: <LineChart size={18} />,
  F: <Clock size={18} />,
  G: <Shield size={18} />,
  H: <Target size={18} />
}

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
            专为在英国求职的定性研究与社会学背景量身定制的职业路径探索工具。通过 24 题自我评估，匹配 6 大高壁垒岗位，提供透明的可解释推荐与路线图。
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

      <div className="homeDesc">
        <div className="dimExplainScroll">
          {DIMENSION_ORDER.map(key => {
            const d = DIMENSIONS[key as keyof typeof DIMENSIONS]
            return (
              <div key={key} className="dimExplainCardScroll">
                <div className="dimExplainHead">
                  <div className="dimExplainIcon">{DIM_ICONS[key]}</div>
                  <div>
                    <div className="dimExplainName">{d.name}</div>
                  </div>
                </div>
                <div className="dimExplainText">{d.oneLiner}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

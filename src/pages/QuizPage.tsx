import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUIZ_QUESTIONS, isQuizComplete, type QuizAnswer } from '../domain/quiz'
import { DIMENSIONS } from '../domain/dimensions'
import { useStore } from '../state/useStore'
import { Modal } from '../ui/Modal'

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

export function QuizPage() {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()

  const firstEmpty = useMemo(
    () => state.quizAnswers.findIndex((a) => a == null),
    [state.quizAnswers],
  )

  const [cursor, setCursor] = useState(() => (firstEmpty === -1 ? 0 : firstEmpty))

  const q = QUIZ_QUESTIONS[cursor]
  const answer = state.quizAnswers[cursor]
  const doneCount = state.quizAnswers.filter((a) => a != null).length
  const complete = isQuizComplete(state.quizAnswers)

  const [showLockedModal, setShowLockedModal] = useState(false)

  const setAnswer = (a: QuizAnswer) => {
    if (complete) {
      setShowLockedModal(true)
      return
    }
    dispatch({ type: 'quiz/setAnswer', index: cursor, answer: a })
    if (cursor < 23) setCursor((c) => clamp(c + 1, 0, 23))
  }

  return (
    <div>
      <div className="pageIntro">
        <h1 className="h1">问卷测评</h1>
        <p className="lead">
          逐题作答（1–5 分）。每次选择会立即保存到本地；你可以刷新或下次打开继续。
        </p>
      </div>

      <div className="stepper">
        <div className="stepperLeft">
          <div className="stepperTitle">
            Step <span className="stepperNum">{q.index}</span> / 24
          </div>
          <div className="meta">已答 {doneCount}/24</div>
        </div>
        <div className="stepperDots" aria-label="Progress">
          {QUIZ_QUESTIONS.map((qq, idx) => {
            const v = state.quizAnswers[idx]
            const active = !complete && idx === cursor
            const done = v != null
            return (
              <button
                key={qq.index}
                type="button"
                className={`stepDot ${active ? 'stepDotActive' : ''} ${done ? 'stepDotDone' : ''}`}
                onClick={() => setCursor(idx)}
                aria-label={`Go to question ${qq.index}`}
              />
            )
          })}
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitleRow">
              <h2 className="cardTitle">
                第 {q.index} 题 · {DIMENSIONS[q.dimension as keyof typeof DIMENSIONS].name}
              </h2>
              <div className="meta">{answer ? `已选 ${answer}` : '未作答'}</div>
            </div>
          </div>
          <div className="cardBody">
            <div className="quizStatement" key={q.index}>
              {q.text}
            </div>

            <div className="quizScale">
              {[1, 2, 3, 4, 5].map((v) => {
                const selected = answer === v
                return (
                  <button
                    key={v}
                    type="button"
                    className={`quizScaleBtn ${selected ? 'quizScaleBtnActive' : ''}`}
                    onClick={() => setAnswer(v as QuizAnswer)}
                    disabled={complete && !selected}
                  >
                    {v}
                  </button>
                )
              })}
            </div>

            <div className="quizScaleHint">
              <span>1 完全不像我</span>
              <span>3 看情境</span>
              <span>5 非常像我</span>
            </div>

            <div className="btnRow" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                className="btn btnGhost"
                onClick={() => setCursor((c) => clamp(c - 1, 0, 23))}
                disabled={cursor === 0}
              >
                上一题
              </button>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {complete ? (
                  <button type="button" className="btn btnPrimary" onClick={() => navigate('/results')}>
                    查看结果
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btnPrimary"
                    onClick={() => setCursor((c) => clamp(c + 1, 0, 23))}
                    disabled={cursor === 23}
                  >
                    下一题
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLockedModal && (
        <Modal title="测评已完成" onClose={() => setShowLockedModal(false)}>
          <div style={{ color: 'var(--accent3)' }}>测评已锁定。如需重新测试，请点击页面底部的“重置”按钮清空数据。</div>
          <div className="modalActions">
            <button type="button" className="btn btnPrimary" onClick={() => setShowLockedModal(false)}>
              知道了
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

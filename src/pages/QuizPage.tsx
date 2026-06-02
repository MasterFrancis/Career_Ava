import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUIZ_QUESTIONS, isQuizComplete, type QuizAnswer } from '../domain/quiz'
import { useStore } from '../state/useStore'

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
  const progress = state.quizAnswers.filter((a) => a != null).length / 24
  const complete = isQuizComplete(state.quizAnswers)

  const setAnswer = (a: QuizAnswer) => {
    dispatch({ type: 'quiz/setAnswer', index: cursor, answer: a })
    if (cursor < 23) setCursor((c) => clamp(c + 1, 0, 23))
  }

  return (
    <div>
      <h1 className="h1">问卷测评</h1>
      <p className="lead">
        逐题作答（1–5 分）。每次选择会立即保存到本地；你可以刷新或下次打开继续。
      </p>

      <div className="quizProgress">
        <div className="quizProgressBar" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
      <div className="meta" style={{ marginTop: 10 }}>
        已完成 {Math.round(progress * 100)}% · {state.quizAnswers.filter((a) => a != null).length}/24
      </div>

      <div className="grid2" style={{ marginTop: 14, gridTemplateColumns: '1.15fr 0.85fr' }}>
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitleRow">
              <h2 className="cardTitle">
                第 {q.index} 题 · 维度 {q.dimension}
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

        <div className="card">
          <div className="cardHeader">
            <div className="cardTitleRow">
              <h2 className="cardTitle">题号跳转</h2>
              <div className="meta">点选可直达</div>
            </div>
          </div>
          <div className="cardBody">
            <div className="quizGrid">
              {QUIZ_QUESTIONS.map((qq, idx) => {
                const a = state.quizAnswers[idx]
                const active = idx === cursor
                const done = a != null
                return (
                  <button
                    key={qq.index}
                    type="button"
                    className={`quizGridBtn ${active ? 'quizGridBtnActive' : ''} ${done ? 'quizGridBtnDone' : ''}`}
                    onClick={() => setCursor(idx)}
                  >
                    {qq.index}
                  </button>
                )
              })}
            </div>

            <div className="divider" />

            <button
              type="button"
              className="btn"
              onClick={() => {
                if (firstEmpty === -1) return
                setCursor(firstEmpty)
              }}
              disabled={firstEmpty === -1}
            >
              跳到第一个未答题
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

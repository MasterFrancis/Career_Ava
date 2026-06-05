import { useEffect, useMemo, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { WelcomePage } from './pages/WelcomePage'
import { QuizPage } from './pages/QuizPage'
import { ResultsPage } from './pages/ResultsPage'
import { PathsPage } from './pages/PathsPage'
import { PathDetailPage } from './pages/PathDetailPage'
import { MatrixPage } from './pages/MatrixPage'
import { useStore } from './state/useStore'
import { isQuizComplete } from './domain/quiz'
import { Modal } from './ui/Modal'
import { PixelSkyCanvas } from './ui/PixelSkyCanvas'
import { resetAll } from './state/storage'

function Guard({
  requireQuizComplete,
  children,
}: {
  requireQuizComplete?: boolean
  children: React.ReactNode
}) {
  const {
    state: { quizAnswers },
  } = useStore()
  const complete = isQuizComplete(quizAnswers)
  if (requireQuizComplete && !complete) return <Navigate to="/quiz" replace />
  return <>{children}</>
}

export default function App() {
  const { state, dispatch } = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [showReset, setShowReset] = useState(false)
  const [showTopBar, setShowTopBar] = useState(true)

  useEffect(() => {
    dispatch({ type: 'ui/setLastRoute', route: location.pathname })
  }, [dispatch, location.pathname])

  // Removed automatic redirection to lastRoute so that clicking "开始" can navigate to "/" normally.
  // useEffect(() => {
  //   if (location.pathname === '/' && state.uiPrefs.lastRoute && state.uiPrefs.lastRoute !== '/') {
  //     navigate(state.uiPrefs.lastRoute, { replace: true })
  //   }
  // }, [location.pathname, navigate, state.uiPrefs.lastRoute])

  const pills = useMemo(
    () => [
      { to: '/', label: '开始' },
      { to: '/quiz', label: '问卷' },
      { to: '/results', label: '结果' },
      { to: '/paths', label: '岗位浏览' },
      { to: '/matrix', label: '决策矩阵' },
    ],
    [],
  )

  const complete = isQuizComplete(state.quizAnswers)

  useEffect(() => {
    if (!complete) return
    setShowTopBar(true)
  }, [complete, location.pathname])

  useEffect(() => {
    if (!complete) return

    let lastScrollY = window.scrollY
    let ticking = false

    const updateTopBar = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY
      const nearTop = currentScrollY <= 24

      if (nearTop || delta < -6) {
        setShowTopBar(true)
      } else if (delta > 6) {
        setShowTopBar(false)
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateTopBar)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [complete])

  return (
    <div className="appShell">
      <PixelSkyCanvas />
      <div className="uiScale">
        {complete && (
          <div className={`topBarShell ${showTopBar ? 'topBarShellVisible' : 'topBarShellHidden'}`}>
            <div className="topBarTrigger" aria-hidden="true" />
            <div className="topBar">
              <nav className="navPills" aria-label="Main">
                {pills.map((p) => {
                  const active =
                    location.pathname === p.to || location.pathname.startsWith(`${p.to}/`)
                  const disabled = (p.to === '/results' || p.to === '/paths' || p.to === '/matrix') && !complete
                  return (
                    <NavLink
                      key={p.to}
                      to={disabled ? '/quiz' : p.to}
                      className={() => `pill ${active ? 'pillActive' : ''}`}
                    >
                      {p.label}
                    </NavLink>
                  )
                })}
              </nav>
            </div>
          </div>
        )}

        <div className={`page ${complete ? 'pageWithTopBar' : ''}`}>
          <div className="pageInner">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route
                path="/results"
                element={
                  <Guard requireQuizComplete>
                    <ResultsPage />
                  </Guard>
                }
              />
              <Route
                path="/paths"
                element={
                  <Guard requireQuizComplete>
                    <PathsPage />
                  </Guard>
                }
              />
              <Route
                path="/paths/:pathId"
                element={
                  <Guard requireQuizComplete>
                    <PathDetailPage />
                  </Guard>
                }
              />
              <Route
                path="/matrix"
                element={
                  <Guard requireQuizComplete>
                    <MatrixPage />
                  </Guard>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>

        <div className="footerRevealZone">
          <div className="footer">
            <span>数据仅存浏览器本地，刷新自动恢复</span>
            <button type="button" className="linkBtn" onClick={() => setShowReset(true)}>
              重置
            </button>
          </div>
        </div>

        {showReset && (
          <Modal title="确认重置？" onClose={() => setShowReset(false)}>
            <div style={{ color: 'var(--accent3)' }}>将清空所有本地数据：问卷答案、结果、矩阵、备注与偏好。</div>
            <div className="modalActions">
              <button type="button" className="btn btnGhost" onClick={() => setShowReset(false)}>
                取消
              </button>
              <button
                type="button"
                className="btn btnPrimary"
                onClick={() => {
                  resetAll()
                  dispatch({ type: 'reset' })
                  setShowReset(false)
                  navigate('/', { replace: true })
                }}
              >
                清空并重启
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

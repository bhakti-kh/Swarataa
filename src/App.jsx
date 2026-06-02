import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'
import Landing from './pages/Landing'
import PrakritiQuiz from './pages/PrakritiQuiz'
import Results from './pages/Results'
import RiyazFramework from './pages/RiyazFramework'
import Login from './pages/Login'
import './index.css'

export default function App() {
  const [page, setPage] = useState('landing')
  const [quizAnswers, setQuizAnswers] = useState(null)
  const [aiPlan, setAiPlan] = useState(null)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthLoading(false)
    })
    return unsub
  }, [])

  const navigate = (to, data = null) => {
    if (to === 'results' && data) {
      setQuizAnswers(data.answers)
      setAiPlan(data.plan)
    }
    setPage(to)
    window.scrollTo(0, 0)
  }

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--warm-cream)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '3px solid #eee', borderTopColor: 'var(--saffron)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--text-light)', fontFamily: 'Inter, sans-serif' }}>Loading Swarataa...</p>
        </div>
      </div>
    )
  }

  // Quiz requires sign-in
  if (page === 'quiz' && !user) {
    return <Login navigate={navigate} redirectTo="quiz" />
  }

  return (
    <div>
      {page === 'landing' && <Landing navigate={navigate} user={user} />}
      {page === 'quiz' && <PrakritiQuiz navigate={navigate} user={user} />}
      {page === 'results' && <Results navigate={navigate} answers={quizAnswers} plan={aiPlan} user={user} />}
      {page === 'riyaz' && <RiyazFramework navigate={navigate} user={user} />}
      {page === 'login' && <Login navigate={navigate} />}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'
import Landing from './pages/Landing'
import Login from './pages/Login'
import PrakritiQuiz from './pages/PrakritiQuiz'
import Results from './pages/Results'
import AppLayout from './pages/AppLayout'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import RiyazFramework from './pages/RiyazFramework'
import HerbSupport from './pages/HerbSupport'
import Progress from './pages/Progress'
import Library from './pages/Library'
import Community from './pages/Community'
import './index.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [aiPlan, setAiPlan] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthLoading(false)
    })
    return unsub
  }, [])

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

  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages — no sidebar */}
        <Route path="/" element={<Landing user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={user ? <PrakritiQuiz setAiPlan={setAiPlan} /> : <Navigate to="/login" />} />
        <Route path="/results" element={<Results plan={aiPlan} />} />

        {/* App pages — with sidebar */}
        <Route path="/app" element={<AppLayout user={user} />}>
          <Route index element={<Navigate to="/app/welcome" />} />
          <Route path="welcome" element={<Welcome user={user} />} />
          <Route path="dashboard" element={<Dashboard user={user} plan={aiPlan} />} />
          <Route path="riyaz" element={<RiyazFramework />} />
          <Route path="herbs" element={<HerbSupport plan={aiPlan} />} />
          <Route path="progress" element={<Progress />} />
          <Route path="library" element={<Library />} />
          <Route path="community" element={<Community />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

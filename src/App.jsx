import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, savePlanToFirestore, loadPlanFromFirestore } from './utils/firebase'
import Landing from './pages/Landing'
import Login from './pages/Login'
import PrakritiQuiz from './pages/PrakritiQuiz'
import AppLayout from './pages/AppLayout'
import Dashboard from './pages/Dashboard'
import PersonalPlan from './pages/PersonalPlan'
import HerbSupport from './pages/HerbSupport'
import Progress from './pages/Progress'
import Library from './pages/Library'
import Community from './pages/Community'
import './index.css'

const PLAN_KEY = 'swarataa_plan'

export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [aiPlan, setAiPlan] = useState(() => {
    try {
      const saved = localStorage.getItem(PLAN_KEY)
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        // Load plan from Firestore for this user
        const firestorePlan = await loadPlanFromFirestore(u.uid)
        if (firestorePlan) {
          setAiPlan(firestorePlan)
          try { localStorage.setItem(PLAN_KEY, JSON.stringify(firestorePlan)) } catch {}
        }
      }
      setAuthLoading(false)
    })
    return unsub
  }, [])

  const savePlan = async (plan) => {
    setAiPlan(plan)
    // Save to localStorage (fast, local)
    try { localStorage.setItem(PLAN_KEY, JSON.stringify(plan)) } catch {}
    // Save to Firestore (persistent, cross-device)
    if (user) await savePlanToFirestore(user.uid, plan)
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing user={user} hasPlan={!!aiPlan} />} />
        <Route path="/login" element={<Login hasPlan={!!aiPlan} />} />
        <Route path="/quiz" element={
          user ? <PrakritiQuiz setAiPlan={savePlan} /> : <Navigate to="/login" />
        } />

        <Route path="/app" element={<AppLayout user={user} hasPlan={!!aiPlan} />}>
          <Route index element={<Navigate to="/app/dashboard" />} />
          <Route path="dashboard" element={<Dashboard user={user} plan={aiPlan} />} />
          <Route path="plan" element={<PersonalPlan plan={aiPlan} />} />
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

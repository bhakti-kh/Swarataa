import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'
import Layout from './pages/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrakritiQuiz from './pages/PrakritiQuiz'
import Results from './pages/Results'
import RiyazFramework from './pages/RiyazFramework'
import HerbSupport from './pages/HerbSupport'
import Progress from './pages/Progress'
import Library from './pages/Library'
import Community from './pages/Community'
import './index.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [quizPlan, setQuizPlan] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthLoading(false)
    })
    return unsub
  }, [])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading Swarataa...</p>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={user ? <PrakritiQuiz setQuizPlan={setQuizPlan} /> : <Navigate to="/login" />} />
        <Route path="/results" element={<Results plan={quizPlan} />} />
        <Route element={<Layout user={user} />}>
          <Route path="/dashboard" element={<Dashboard user={user} plan={quizPlan} />} />
          <Route path="/riyaz" element={<RiyazFramework />} />
          <Route path="/herbs" element={<HerbSupport plan={quizPlan} />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/library" element={<Library />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

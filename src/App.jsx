import { useState } from 'react'
import Landing from './pages/Landing'
import PrakritiQuiz from './pages/PrakritiQuiz'
import Results from './pages/Results'
import RiyazFramework from './pages/RiyazFramework'
import './index.css'

export default function App() {
  const [page, setPage] = useState('landing')
  const [quizAnswers, setQuizAnswers] = useState(null)
  const [aiPlan, setAiPlan] = useState(null)

  const navigate = (to, data = null) => {
    if (to === 'results' && data) {
      setQuizAnswers(data.answers)
      setAiPlan(data.plan)
    }
    setPage(to)
    window.scrollTo(0, 0)
  }

  return (
    <div>
      {page === 'landing' && <Landing navigate={navigate} />}
      {page === 'quiz' && <PrakritiQuiz navigate={navigate} />}
      {page === 'results' && <Results navigate={navigate} answers={quizAnswers} plan={aiPlan} />}
      {page === 'riyaz' && <RiyazFramework navigate={navigate} />}
    </div>
  )
}

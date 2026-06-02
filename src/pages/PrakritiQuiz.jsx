import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generatePlan } from '../utils/ai'
import styles from './PrakritiQuiz.module.css'

const QUESTIONS = [
  {
    id: 'body_frame',
    dimension: 'Physical Constitution',
    question: 'How would you describe your body frame?',
    options: [
      { label: 'Thin, light, find it hard to gain weight', dosha: 'vata' },
      { label: 'Medium, muscular, moderate weight', dosha: 'pitta' },
      { label: 'Broad, tend to gain weight easily', dosha: 'kapha' },
    ],
  },
  {
    id: 'skin',
    dimension: 'Physical Constitution',
    question: 'What is your skin like most of the time?',
    options: [
      { label: 'Dry, rough, or flaky — especially in winter', dosha: 'vata' },
      { label: 'Warm, oily in the T-zone, prone to redness', dosha: 'pitta' },
      { label: 'Soft, smooth, slightly oily or cool', dosha: 'kapha' },
    ],
  },
  {
    id: 'digestion',
    dimension: 'Digestion & Appetite',
    question: 'How is your digestion and appetite?',
    options: [
      { label: 'Irregular — sometimes hungry, sometimes not, bloating', dosha: 'vata' },
      { label: 'Strong and sharp — I get irritable if I skip meals', dosha: 'pitta' },
      { label: 'Slow and steady — I can skip meals without noticing', dosha: 'kapha' },
    ],
  },
  {
    id: 'sleep',
    dimension: 'Sleep & Energy',
    question: 'How do you sleep?',
    options: [
      { label: 'Light sleeper, trouble falling or staying asleep', dosha: 'vata' },
      { label: 'Moderate — sleep well but wake if too hot', dosha: 'pitta' },
      { label: 'Deep, heavy sleeper — could sleep all day', dosha: 'kapha' },
    ],
  },
  {
    id: 'mind',
    dimension: 'Mental & Emotional',
    question: 'How would you describe your thinking style?',
    options: [
      { label: 'Quick, creative, easily distracted, anxious under stress', dosha: 'vata' },
      { label: 'Sharp, focused, driven — can be perfectionistic or critical', dosha: 'pitta' },
      { label: 'Calm, steady, methodical — slow to decide but loyal', dosha: 'kapha' },
    ],
  },
  {
    id: 'voice_quality',
    dimension: 'Voice Characteristics',
    question: 'How would you describe your natural singing voice?',
    options: [
      { label: 'Thin, airy, light in volume — can crack when tired', dosha: 'vata' },
      { label: 'Clear, sharp, warm, with good projection', dosha: 'pitta' },
      { label: 'Rich, deep, full-bodied — takes time to warm up', dosha: 'kapha' },
    ],
  },
  {
    id: 'vocal_issues',
    dimension: 'Voice Characteristics',
    question: 'What vocal issues do you face most often?',
    options: [
      { label: 'Dryness, cracks, loss of voice when overworked', dosha: 'vata' },
      { label: 'Inflammation, hoarseness, burning sensation after singing', dosha: 'pitta' },
      { label: 'Heaviness, mucus buildup, sluggish warmup', dosha: 'kapha' },
    ],
  },
  {
    id: 'practice_energy',
    dimension: 'Practice Patterns',
    question: 'How does your practice energy typically feel?',
    options: [
      { label: 'Bursts of enthusiasm but inconsistent — hard to maintain routine', dosha: 'vata' },
      { label: 'Intense, focused sessions — I push myself hard', dosha: 'pitta' },
      { label: 'Prefer long, slow warmups — once going, I can sustain well', dosha: 'kapha' },
    ],
  },
  {
    id: 'seasonal',
    dimension: 'Practice Patterns',
    question: 'When does your voice feel most vulnerable?',
    options: [
      { label: 'Autumn and winter — cold, dry weather affects me most', dosha: 'vata' },
      { label: 'Summer — heat and humidity strain my voice', dosha: 'pitta' },
      { label: 'Spring — mucus and congestion are my challenge', dosha: 'kapha' },
    ],
  },
  {
    id: 'experience',
    dimension: 'Singer Profile',
    question: 'How long have you been practicing Hindustani classical music?',
    options: [
      { label: 'Less than 2 years (Fresher / Beginner)', dosha: 'beginner' },
      { label: '2–7 years (Intermediate)', dosha: 'intermediate' },
      { label: '7+ years (Advanced)', dosha: 'advanced' },
    ],
  },
]

export default function PrakritiQuiz({ setAiPlan }) {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const q = QUESTIONS[current]
  const progress = ((current) / QUESTIONS.length) * 100

  const handleSelect = async (option) => {
    const newAnswers = { ...answers, [q.id]: { label: option.label, dosha: option.dosha } }
    setAnswers(newAnswers)

    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1)
    } else {
      // Last question — generate AI plan
      setLoading(true)
      setError(null)
      try {
        const plan = await generatePlan(newAnswers, QUESTIONS)
        setAiPlan(plan)
        navigate('/results')
      } catch (e) {
        setError(`Error: ${e.message}`)
        setLoading(false)
      }
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingInner}>
          <div className={styles.spinner} />
          <h2>Analysing your prakriti...</h2>
          <p>Our AI is reading your constitution and crafting your personalized vocal plan.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.back} onClick={() => navigate('/')}>
            ← Back
          </button>
          <div className={styles.stepLabel}>
            Question {current + 1} of {QUESTIONS.length}
          </div>
        </div>

        {/* Progress */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        {/* Question */}
        <div className={styles.card}>
          <div className={styles.dimension}>{q.dimension}</div>
          <h2 className={styles.question}>{q.question}</h2>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.options}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`${styles.option} ${answers[q.id]?.label === opt.label ? styles.selected : ''}`}
                onClick={() => handleSelect(opt)}
              >
                <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dimension indicator */}
        <div className={styles.dimensions}>
          {['Physical Constitution', 'Digestion & Appetite', 'Sleep & Energy', 'Mental & Emotional', 'Voice Characteristics', 'Practice Patterns', 'Singer Profile'].map((d, i) => {
            const qs = QUESTIONS.filter(q => q.dimension === d)
            const answered = qs.filter(q => answers[q.id]).length
            return (
              <div key={d} className={`${styles.dim} ${answered === qs.length ? styles.dimDone : ''}`}>
                {d}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generatePlan } from '../utils/ai'

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

export default function PrakritiQuiz({ setQuizPlan }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const q = QUESTIONS[current]
  const progress = (current / QUESTIONS.length) * 100

  const handleSelect = async (option) => {
    const newAnswers = { ...answers, [q.id]: { label: option.label, dosha: option.dosha } }
    setAnswers(newAnswers)

    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1)
    } else {
      setLoading(true)
      setError(null)
      try {
        const plan = await generatePlan(newAnswers, QUESTIONS)
        setQuizPlan(plan)
        navigate('/results')
      } catch (e) {
        setError(`${e.message}`)
        setLoading(false)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-6">
          <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-2xl mb-3 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Analysing your prakriti...
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Our AI is reading your constitution and crafting your personalized vocal plan.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => navigate('/')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back
          </button>
          <span className="text-sm text-muted-foreground">
            {current + 1} / {QUESTIONS.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-muted rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-400"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            {q.dimension}
          </p>
          <h2 className="text-xl text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {q.question}
          </h2>

          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800 mb-4">
              {error}
            </div>
          )}

          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                className="w-full flex items-center gap-4 bg-secondary hover:bg-primary/8 border-2 border-transparent hover:border-primary rounded-xl px-5 py-4 text-left transition-all group"
              >
                <span className="w-8 h-8 rounded-lg bg-card flex items-center justify-center text-xs font-bold text-foreground flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-foreground leading-snug">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dimension pills */}
        <div className="flex flex-wrap gap-2 mt-6">
          {['Physical', 'Digestion', 'Sleep', 'Mental', 'Voice', 'Practice', 'Profile'].map((d, i) => {
            const done = current > [1, 2, 3, 4, 6, 8, 9][i]
            return (
              <span
                key={d}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  done ? 'bg-accent/15 text-accent' : 'bg-muted text-muted-foreground'
                }`}
              >
                {d}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

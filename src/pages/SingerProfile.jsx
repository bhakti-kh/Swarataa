import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SingerProfile.module.css'

const QUESTIONS = [
  {
    id: 'voiceType',
    question: 'What is your voice type?',
    hint: 'Not sure? Choose the register that feels most natural to sing in.',
    options: [
      { label: 'Soprano', desc: 'High female voice' },
      { label: 'Mezzo-Soprano', desc: 'Mid-range female voice' },
      { label: 'Alto / Contralto', desc: 'Lower female voice' },
      { label: 'Tenor', desc: 'High male voice' },
      { label: 'Baritone', desc: 'Mid-range male voice' },
      { label: 'Not sure yet', desc: 'Still discovering' },
    ],
  },
  {
    id: 'training',
    question: 'How are you currently learning?',
    hint: 'This helps us tailor your riyaz format.',
    options: [
      { label: 'Just starting out', desc: 'New to classical music' },
      { label: 'Self-taught', desc: 'Learning on my own' },
      { label: 'Learning with a guru', desc: 'One-on-one training' },
      { label: 'Attending music school', desc: 'Formal institutional training' },
    ],
  },
  {
    id: 'goal',
    question: 'What is your primary goal?',
    hint: 'Your plan will be optimised for this.',
    options: [
      { label: 'Vocal health & longevity', desc: 'Protect and strengthen my voice' },
      { label: 'Learn new ragas', desc: 'Expand my repertoire' },
      { label: 'Performance readiness', desc: 'Prepare for concerts or events' },
      { label: 'Build a daily practice', desc: 'Create a sustainable riyaz habit' },
    ],
  },
  {
    id: 'challenge',
    question: 'What is your biggest challenge right now?',
    hint: 'We will address this directly in your plan.',
    options: [
      { label: 'Breath control', desc: 'Running out of breath mid-phrase' },
      { label: 'Pitch accuracy', desc: 'Staying on swar consistently' },
      { label: 'Vocal endurance', desc: 'Voice tiring after long practice' },
      { label: 'Consistency', desc: 'Maintaining a regular practice habit' },
    ],
  },
]

export default function SingerProfile({ setSingerProfile }) {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState(0)

  const q = QUESTIONS[current]
  const progress = (current / QUESTIONS.length) * 100
  const allDone = Object.keys(answers).length === QUESTIONS.length

  const handleSelect = (option) => {
    const newAnswers = { ...answers, [q.id]: option.label }
    setAnswers(newAnswers)
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1)
    }
  }

  const handleContinue = () => {
    setSingerProfile(answers)
    try { localStorage.setItem('swarataa_singer_profile', JSON.stringify(answers)) } catch {}
    navigate('/quiz')
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>स्व</span>
            <span className={styles.logoText}>Swarataa</span>
          </div>
          <div className={styles.step}>Step 1 of 2 — Singer Profile</div>
        </div>

        {/* Progress */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        {/* Question */}
        <div className={styles.card}>
          <p className={styles.hint}>{q.hint}</p>
          <h2 className={styles.question}>{q.question}</h2>

          <div className={styles.options}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`${styles.option} ${answers[q.id] === opt.label ? styles.optionSelected : ''}`}
                onClick={() => handleSelect(opt)}
              >
                <div className={styles.optionText}>
                  <span className={styles.optionLabel}>{opt.label}</span>
                  <span className={styles.optionDesc}>{opt.desc}</span>
                </div>
                {answers[q.id] === opt.label && <span className={styles.check}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Nav dots */}
        <div className={styles.dots}>
          {QUESTIONS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''} ${answers[QUESTIONS[i].id] ? styles.dotDone : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        {/* Continue */}
        {allDone && (
          <button className="btn-primary" onClick={handleContinue} style={{ width: '100%', marginTop: 8 }}>
            Continue to Prakriti Assessment →
          </button>
        )}

        <p className={styles.subtext}>Next: 10 questions about your body and voice constitution (2 min)</p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SingerProfile.module.css'

const QUESTIONS = [
  {
    id: 'voiceType',
    question: 'Where does your voice feel most at home?',
    hint: 'This helps us understand your natural saptak (register).',
    options: [
      { label: 'Mandra Saptak', sublabel: 'मन्द्र सप्तक', desc: 'Deep, rich, resonant — lower register' },
      { label: 'Madhya Saptak', sublabel: 'मध्य सप्तक', desc: 'Balanced, versatile — middle register' },
      { label: 'Taar Saptak', sublabel: 'तार सप्तक', desc: 'Clear, light, high — upper register' },
      { label: 'Gambheer Awaaz', sublabel: 'गंभीर आवाज़', desc: 'Heavy, weighty voice quality' },
      { label: 'Komala Awaaz', sublabel: 'कोमल आवाज़', desc: 'Soft, delicate, gentle quality' },
      { label: 'Abhi Pata Nahi', sublabel: 'अभी पता नहीं', desc: 'Still discovering my natural range' },
    ],
  },
  {
    id: 'training',
    question: 'How are you learning Hindustani classical music?',
    hint: 'Your riyaz format will be tailored to your learning style.',
    options: [
      { label: 'Guru-Shishya Parampara', sublabel: 'गुरु-शिष्य परंपरा', desc: 'Learning directly from a guru' },
      { label: 'Swayam Abhyas', sublabel: 'स्वयं अभ्यास', desc: 'Self-taught, practicing on my own' },
      { label: 'Sangeet Vidyalaya', sublabel: 'संगीत विद्यालय', desc: 'Formal music school or academy' },
      { label: 'Abhi Shuru Kar Raha/Rahi Hoon', sublabel: 'अभी शुरू कर रहा/रही हूँ', desc: 'Just beginning my journey' },
    ],
  },
  {
    id: 'goal',
    question: 'What is drawing you to riyaz?',
    hint: 'Your vocal plan will be optimised for this intention.',
    options: [
      { label: 'Swar Shuddhi', sublabel: 'स्वर शुद्धि', desc: 'Master pitch purity and accuracy' },
      { label: 'Raga Vistar', sublabel: 'राग विस्तार', desc: 'Explore and learn new ragas' },
      { label: 'Swara Swasthya', sublabel: 'स्वर स्वास्थ्य', desc: 'Strengthen and protect my voice' },
      { label: 'Niyamit Sadhana', sublabel: 'नियमित साधना', desc: 'Build a consistent daily practice' },
    ],
  },
  {
    id: 'challenge',
    question: 'What is your biggest challenge right now?',
    hint: 'We will address this directly in your personalized plan.',
    options: [
      { label: 'Saans ka Niyantran', sublabel: 'सांस का नियंत्रण', desc: 'Breath control across long phrases' },
      { label: 'Swar mein Rehna', sublabel: 'स्वर में रहना', desc: 'Staying in swar — pitch consistency' },
      { label: 'Awaaz ki Thakaan', sublabel: 'आवाज़ की थकान', desc: 'Voice fatigues during long practice' },
      { label: 'Niyamit Riyaz', sublabel: 'नियमित रियाज़', desc: 'Maintaining a regular practice habit' },
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
      setTimeout(() => setCurrent(current + 1), 300)
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
          <div className={styles.stepBadge}>
            Singer Profile · {current + 1} of {QUESTIONS.length}
          </div>
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
                <div className={styles.optionLeft}>
                  <span className={styles.optionLabel}>{opt.label}</span>
                  <span className={styles.optionSublabel}>{opt.sublabel}</span>
                  <span className={styles.optionDesc}>{opt.desc}</span>
                </div>
                {answers[q.id] === opt.label && (
                  <span className={styles.check}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dot nav */}
        <div className={styles.dots}>
          {QUESTIONS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''} ${answers[QUESTIONS[i].id] ? styles.dotDone : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        {/* CTA */}
        {allDone && (
          <button
            className="btn-primary"
            onClick={handleContinue}
            style={{ width: '100%', marginTop: 4 }}
          >
            Continue to Prakriti Assessment →
          </button>
        )}

        <p className={styles.subtext}>
          Next: 10 questions about your body constitution and vocal nature
        </p>
      </div>
    </div>
  )
}

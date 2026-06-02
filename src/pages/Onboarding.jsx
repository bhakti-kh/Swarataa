import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generatePlan } from '../utils/ai'
import { useLanguage } from '../context/LanguageContext'
import styles from './Onboarding.module.css'

// ── All 19 questions across 3 sections ─────────────────────────────────────

const SECTIONS = ['About You', 'Your Voice', 'Prakriti']

const QUESTIONS = [
  // ── Section 0: Personal (5 questions) ────────────────────────────────
  {
    id: 'gender', section: 0,
    question: 'How do you identify?',
    hint: 'Some Ayurvedic practices are tailored by this.',
    options: [
      { label: 'Male', sub: 'पुरुष' },
      { label: 'Female', sub: 'स्त्री' },
      { label: 'Non-binary', sub: 'नॉन-बाइनरी' },
      { label: 'Prefer not to say', sub: 'बताना नहीं चाहते' },
    ],
  },
  {
    id: 'ageGroup', section: 0,
    question: 'Which age group are you in?',
    hint: 'Practice intensity and recovery vary by age.',
    options: [
      { label: 'Under 18', sub: '१८ से कम' },
      { label: '18–25', sub: '१८–२५' },
      { label: '26–35', sub: '२६–३५' },
      { label: '36–50', sub: '३६–५०' },
      { label: '50+', sub: '५०+' },
    ],
  },
  {
    id: 'role', section: 0,
    question: 'What is your role as a singer?',
    hint: 'Your plan depth and goals depend on this.',
    options: [
      { label: 'Shishya', sub: 'शिष्य — Guru\'s student in parampara' },
      { label: 'Music School Student', sub: 'संगीत विद्यालय का छात्र' },
      { label: 'Hobbyist', sub: 'शौकिया — Singing for joy' },
      { label: 'Music Teacher', sub: 'संगीत गुरु — Teaching others' },
      { label: 'Professional Singer', sub: 'पेशेवर गायक — Performing artist' },
    ],
  },
  {
    id: 'dailyUsage', section: 0,
    question: 'How heavily do you use your voice daily?',
    hint: 'Calibrates your vocal fatigue and recovery recommendations.',
    options: [
      { label: 'Minimal', sub: 'कम उपयोग — Mostly quiet days' },
      { label: 'Conversational', sub: 'सामान्य — Regular daily conversation' },
      { label: 'Heavy', sub: 'भारी — Teaching, speaking, or performing' },
      { label: 'Variable', sub: 'अनियमित — Depends on the day' },
    ],
  },
  {
    id: 'singLanguage', section: 0,
    question: 'Which language do you primarily sing in?',
    hint: 'Helps personalise raga and composition recommendations.',
    options: [
      { label: 'Hindi / Braj Bhasha', sub: 'हिंदी / ब्रज भाषा' },
      { label: 'Marathi', sub: 'मराठी' },
      { label: 'Kannada', sub: 'ಕನ್ನಡ' },
      { label: 'Bengali', sub: 'বাংলা' },
      { label: 'Tamil / Telugu', sub: 'தமிழ் / తెలుగు' },
      { label: 'Mix / Multiple', sub: 'मिश्रित भाषाएं' },
    ],
  },

  // ── Section 1: Voice (4 questions) ──────────────────────────────────
  {
    id: 'saptak', section: 1,
    question: 'Where does your voice feel most at home?',
    hint: 'Your natural saptak — the register where you sing most comfortably.',
    options: [
      { label: 'Mandra Saptak', sub: 'मन्द्र सप्तक — Deep, resonant lower register' },
      { label: 'Madhya Saptak', sub: 'मध्य सप्तक — Balanced, versatile middle register' },
      { label: 'Taar Saptak', sub: 'तार सप्तक — Clear, light upper register' },
      { label: 'Mixed / Flexible', sub: 'मिश्र — Comfortable across registers' },
      { label: 'Still discovering', sub: 'अभी पता नहीं' },
    ],
  },
  {
    id: 'texture', section: 1,
    question: 'How would you describe your voice texture?',
    hint: 'This correlates with your dosha and shapes your vocal exercises.',
    options: [
      { label: 'Gambheer', sub: 'गंभीर — Heavy, resonant, full-bodied' },
      { label: 'Komala', sub: 'कोमल — Soft, delicate, gentle' },
      { label: 'Madhur', sub: 'मधुर — Sweet, melodious, warm' },
      { label: 'Teekha / Nasal', sub: 'तीखा — Sharp or nasal quality' },
      { label: 'Mixed', sub: 'मिश्र — Varies by day or mood' },
    ],
  },
  {
    id: 'riyazHabit', section: 1,
    question: 'How much do you currently practice?',
    hint: 'Your plan will build from where you are today.',
    options: [
      { label: 'No regular practice yet', sub: 'अभी नियमित रियाज़ नहीं है' },
      { label: 'Under 30 min / day', sub: '३० मिनट से कम' },
      { label: '30–60 min / day', sub: '३०–६० मिनट' },
      { label: '1–2 hrs / day', sub: '१–२ घंटे' },
      { label: '2+ hrs / day', sub: '२ घंटे से अधिक' },
    ],
  },
  {
    id: 'challenge', section: 1,
    question: 'What is your biggest challenge right now?',
    hint: 'Your plan will address this directly.',
    options: [
      { label: 'Saans ka Niyantran', sub: 'सांस का नियंत्रण — Breath control' },
      { label: 'Swar mein Rehna', sub: 'स्वर में रहना — Pitch accuracy' },
      { label: 'Awaaz ki Thakaan', sub: 'आवाज़ की थकान — Vocal fatigue' },
      { label: 'Niyamit Riyaz', sub: 'नियमित रियाज़ — Consistency' },
    ],
  },

  // ── Section 2: Prakriti (10 questions) ──────────────────────────────
  {
    id: 'body_frame', section: 2,
    question: 'How would you describe your body frame?',
    hint: 'Physical Constitution',
    options: [
      { label: 'Thin, light, find it hard to gain weight', dosha: 'vata' },
      { label: 'Medium, muscular, moderate weight', dosha: 'pitta' },
      { label: 'Broad, tend to gain weight easily', dosha: 'kapha' },
    ],
  },
  {
    id: 'skin', section: 2,
    question: 'What is your skin like most of the time?',
    hint: 'Physical Constitution',
    options: [
      { label: 'Dry, rough, or flaky — especially in winter', dosha: 'vata' },
      { label: 'Warm, oily in the T-zone, prone to redness', dosha: 'pitta' },
      { label: 'Soft, smooth, slightly oily or cool', dosha: 'kapha' },
    ],
  },
  {
    id: 'digestion', section: 2,
    question: 'How is your digestion and appetite?',
    hint: 'Digestion & Appetite',
    options: [
      { label: 'Irregular — sometimes hungry, sometimes not', dosha: 'vata' },
      { label: 'Strong and sharp — irritable if I skip meals', dosha: 'pitta' },
      { label: 'Slow and steady — can skip meals without noticing', dosha: 'kapha' },
    ],
  },
  {
    id: 'sleep', section: 2,
    question: 'How do you sleep?',
    hint: 'Sleep & Energy',
    options: [
      { label: 'Light sleeper, trouble falling or staying asleep', dosha: 'vata' },
      { label: 'Moderate — sleep well but wake if too hot', dosha: 'pitta' },
      { label: 'Deep, heavy sleeper — could sleep all day', dosha: 'kapha' },
    ],
  },
  {
    id: 'mind', section: 2,
    question: 'How would you describe your thinking style?',
    hint: 'Mental & Emotional',
    options: [
      { label: 'Quick, creative, easily distracted, anxious under stress', dosha: 'vata' },
      { label: 'Sharp, focused, driven — can be perfectionistic', dosha: 'pitta' },
      { label: 'Calm, steady, methodical — slow to decide but loyal', dosha: 'kapha' },
    ],
  },
  {
    id: 'voice_quality', section: 2,
    question: 'How would you describe your natural singing voice?',
    hint: 'Voice Characteristics',
    options: [
      { label: 'Thin, airy, light — can crack when tired', dosha: 'vata' },
      { label: 'Clear, sharp, warm, with good projection', dosha: 'pitta' },
      { label: 'Rich, deep, full-bodied — takes time to warm up', dosha: 'kapha' },
    ],
  },
  {
    id: 'vocal_issues', section: 2,
    question: 'What vocal issues do you face most often?',
    hint: 'Voice Characteristics',
    options: [
      { label: 'Dryness, cracks, loss of voice when overworked', dosha: 'vata' },
      { label: 'Inflammation, hoarseness, burning after singing', dosha: 'pitta' },
      { label: 'Heaviness, mucus buildup, sluggish warmup', dosha: 'kapha' },
    ],
  },
  {
    id: 'practice_energy', section: 2,
    question: 'How does your practice energy typically feel?',
    hint: 'Practice Patterns',
    options: [
      { label: 'Bursts of enthusiasm but inconsistent', dosha: 'vata' },
      { label: 'Intense, focused — I push myself hard', dosha: 'pitta' },
      { label: 'Prefer long slow warmups — once going, I sustain well', dosha: 'kapha' },
    ],
  },
  {
    id: 'seasonal', section: 2,
    question: 'When does your voice feel most vulnerable?',
    hint: 'Practice Patterns',
    options: [
      { label: 'Autumn and winter — cold, dry weather affects me most', dosha: 'vata' },
      { label: 'Summer — heat and humidity strain my voice', dosha: 'pitta' },
      { label: 'Spring — mucus and congestion are my challenge', dosha: 'kapha' },
    ],
  },
  {
    id: 'experience', section: 2,
    question: 'How long have you been practicing Hindustani classical music?',
    hint: 'Singer Profile',
    options: [
      { label: 'Less than 2 years (Fresher / Beginner)', dosha: 'beginner' },
      { label: '2–7 years (Intermediate)', dosha: 'intermediate' },
      { label: '7+ years (Advanced)', dosha: 'advanced' },
    ],
  },
]

const SECTION_COLORS = ['var(--saffron)', 'var(--soft-green)', 'var(--deep-teal)']
const SECTION_ICONS = ['👤', '🎤', '🌿']

export default function Onboarding({ setAiPlan, lang }) {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const q = QUESTIONS[current]
  const currentSection = q.section
  const totalProgress = (current / QUESTIONS.length) * 100

  // Questions answered per section
  const sectionQs = (sec) => QUESTIONS.filter(q => q.section === sec)
  const sectionDone = (sec) => sectionQs(sec).every(q => answers[q.id])

  const handleSelect = async (option) => {
    const newAnswers = { ...answers, [q.id]: option }
    setAnswers(newAnswers)

    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1)
    } else {
      // All done — generate plan
      setLoading(true)
      setError(null)
      try {
        const prakritiAnswers = {}
        QUESTIONS.filter(q => q.section === 2).forEach(q => {
          if (newAnswers[q.id]) prakritiAnswers[q.id] = newAnswers[q.id]
        })

        const singerProfile = {
          gender: newAnswers.gender?.label,
          ageGroup: newAnswers.ageGroup?.label,
          role: newAnswers.role?.label,
          dailyUsage: newAnswers.dailyUsage?.label,
          singLanguage: newAnswers.singLanguage?.label,
          saptak: newAnswers.saptak?.label,
          texture: newAnswers.texture?.label,
          riyazHabit: newAnswers.riyazHabit?.label,
          challenge: newAnswers.challenge?.label,
        }

        const plan = await generatePlan(prakritiAnswers, QUESTIONS.filter(q => q.section === 2), singerProfile, lang)
        setAiPlan(plan)
        navigate('/app/plan')
      } catch (e) {
        setError(`${e.message}`)
        setLoading(false)
      }
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingInner}>
          <div className={styles.spinner} />
          <h2>{t.generating}</h2>
          <p>{t.generatingSub}</p>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Logo + section label */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>स्व</span>
            <span className={styles.logoText}>Swarataa</span>
          </div>
          <div className={styles.sectionBadge} style={{ color: SECTION_COLORS[currentSection], borderColor: SECTION_COLORS[currentSection] + '40', background: SECTION_COLORS[currentSection] + '10' }}>
            {SECTION_ICONS[currentSection]} {SECTIONS[currentSection]}
          </div>
        </div>

        {/* Master progress bar */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${totalProgress}%` }} />
        </div>

        {/* Section dots */}
        <div className={styles.sectionDots}>
          {SECTIONS.map((sec, i) => (
            <div key={i} className={`${styles.sectionDot} ${i === currentSection ? styles.sectionDotActive : ''} ${sectionDone(i) ? styles.sectionDotDone : ''}`}
              style={i === currentSection ? { background: SECTION_COLORS[i] } : {}}
            >
              {sectionDone(i) ? '✓' : SECTION_ICONS[i]}
            </div>
          ))}
        </div>

        {/* Question card */}
        <div className={styles.card}>
          <p className={styles.hint}>{q.hint}</p>
          <h2 className={styles.question}>{q.question}</h2>

          <div className={styles.options}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`${styles.option} ${answers[q.id]?.label === opt.label || answers[q.id]?.dosha === opt.dosha ? styles.optionSelected : ''}`}
                onClick={() => handleSelect(opt)}
                style={answers[q.id]?.label === opt.label ? { borderColor: SECTION_COLORS[currentSection] } : {}}
              >
                <div className={styles.optionContent}>
                  <span className={styles.optionLabel}>{opt.label}</span>
                  {opt.sub && <span className={styles.optionSub}>{opt.sub}</span>}
                </div>
                {(answers[q.id]?.label === opt.label || answers[q.id]?.dosha === opt.dosha) && (
                  <span className={styles.check} style={{ color: SECTION_COLORS[currentSection] }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Back button */}
        {current > 0 && (
          <button className={styles.backBtn} onClick={() => setCurrent(current - 1)}>
            ← Back
          </button>
        )}

        <p className={styles.progress}>
          Question {current + 1} of {QUESTIONS.length} · Section {currentSection + 1} of 3
        </p>

      </div>
    </div>
  )
}

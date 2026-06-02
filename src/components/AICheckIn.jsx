import { useState } from 'react'
import { Sparkles, Mic, Clock, ChevronRight, Check, Loader2, RefreshCw } from 'lucide-react'
import styles from './AICheckIn.module.css'

const VOCAL_STATES = [
  { id: 'fresh', emoji: '🟢', label: 'Fresh & ready', desc: 'Voice feels clear and warmed up' },
  { id: 'tired', emoji: '🟡', label: 'Slightly tired', desc: 'A bit worn from earlier use' },
  { id: 'strained', emoji: '🔴', label: 'Strained or sore', desc: 'Throat feels tight or irritated' },
  { id: 'unsure', emoji: '🔵', label: 'Not sure', desc: 'Haven\'t checked in yet today' },
]

const TIME_OPTIONS = [10, 20, 30]

function getDoshaKaal() {
  const h = new Date().getHours()
  if (h >= 6 && h < 10) return 'Kapha Kaal (6–10 AM) — ideal for deep alaap'
  if (h >= 10 && h < 14) return 'Pitta Kaal (10 AM–2 PM) — good for taans and precision'
  if (h >= 14 && h < 18) return 'Vata Kaal (2–6 PM) — good for improvisation'
  if (h >= 18 && h < 22) return 'Kapha Kaal (6–10 PM) — ideal for evening ragas'
  return 'Pitta Kaal (late night) — vocal rest recommended'
}

const PHASE_COLORS = {
  Warmup: 'var(--light-teal)',
  'Breath Preparation': 'rgba(232,135,58,0.08)',
  Alankars: 'rgba(201,150,43,0.1)',
  'Raga Practice': 'var(--light-teal)',
  Cooldown: 'rgba(74,124,106,0.08)',
  'Chakradhyan': 'rgba(123,94,167,0.1)',
  default: 'rgba(26,74,74,0.05)',
}

export default function AICheckIn({ plan }) {
  const [vocalState, setVocalState] = useState(null)
  const [timeAvailable, setTimeAvailable] = useState(20)
  const [loading, setLoading] = useState(false)
  const [session, setSession] = useState(null)
  const [error, setError] = useState(null)
  const [step, setStep] = useState('checkin') // checkin | result

  const handleGenerate = async () => {
    if (!vocalState) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/coaching-checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vocalState: VOCAL_STATES.find(s => s.id === vocalState)?.label,
          timeAvailable,
          doshaKaal: getDoshaKaal(),
          prakriti: plan?.prakriti || null,
        }),
      })

      if (!res.ok) throw new Error('Could not generate session')
      const data = await res.json()
      setSession(data)
      setStep('result')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`card ${styles.card}`}>
        <div className={styles.loading}>
          <Loader2 size={28} color="var(--saffron)" className={styles.spinner} />
          <h3>Preparing your session...</h3>
          <p>Guru AI is reading your vocal state and crafting today's plan.</p>
        </div>
      </div>
    )
  }

  if (step === 'result' && session) {
    return (
      <div className={`card ${styles.card}`}>
        <div className={styles.resultHeader}>
          <div className={styles.resultHeaderLeft}>
            <div className={styles.guruIcon}><Sparkles size={16} color="var(--saffron)" /></div>
            <div>
              <p className={styles.guruLabel}>Guru AI · Today's Session</p>
              <h3 className={styles.greeting}>{session.greeting}</h3>
            </div>
          </div>
          <button className={styles.resetBtn} onClick={() => { setStep('checkin'); setSession(null); setVocalState(null) }}>
            <RefreshCw size={13} /> New check-in
          </button>
        </div>

        <p className={styles.overallAdvice}>{session.overallAdvice}</p>

        <div className={styles.focusBlock}>
          <span className={styles.focusLabel}>Focus for today</span>
          <span className={styles.focusText}>{session.focusToday}</span>
        </div>

        <div className={styles.sessionPlan}>
          {session.sessionPlan.map((phase, i) => (
            <div key={i} className={styles.phase} style={{ background: PHASE_COLORS[phase.phase] || PHASE_COLORS.default }}>
              <div className={styles.phaseTop}>
                <div className={styles.phaseLeft}>
                  <span className={styles.phaseNum}>{i + 1}</span>
                  <div>
                    <p className={styles.phaseName}>{phase.phase}</p>
                    <p className={styles.phaseExercise}>{phase.exercise}</p>
                  </div>
                </div>
                <span className={styles.phaseDuration}><Clock size={11} /> {phase.duration}</span>
              </div>
              <p className={styles.phaseInstruction}>{phase.instruction}</p>
              <p className={styles.phaseWhy}>💡 {phase.why}</p>
            </div>
          ))}
        </div>

        {session.skipToday?.length > 0 && (
          <div className={styles.skipBlock}>
            <p className={styles.skipLabel}>⚠ Skip today</p>
            {session.skipToday.map((s, i) => <p key={i} className={styles.skipItem}>{s}</p>)}
          </div>
        )}

        <div className={styles.motivation}>
          <p>{session.closingMotivation}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.header}>
        <div className={styles.headerIcon}><Sparkles size={16} color="var(--saffron)" /></div>
        <div>
          <h3 className={styles.title}>Guru AI Check-In</h3>
          <p className={styles.subtitle}>Get your personalized session for today</p>
        </div>
      </div>

      <p className={styles.question}>How is your voice today?</p>
      <div className={styles.states}>
        {VOCAL_STATES.map(s => (
          <button
            key={s.id}
            className={`${styles.stateBtn} ${vocalState === s.id ? styles.stateBtnActive : ''}`}
            onClick={() => setVocalState(s.id)}
          >
            <span className={styles.stateEmoji}>{s.emoji}</span>
            <div className={styles.stateText}>
              <span className={styles.stateLabel}>{s.label}</span>
              <span className={styles.stateDesc}>{s.desc}</span>
            </div>
            {vocalState === s.id && <Check size={14} color="var(--saffron)" />}
          </button>
        ))}
      </div>

      <p className={styles.question} style={{ marginTop: 20 }}>How much time do you have?</p>
      <div className={styles.timeOptions}>
        {TIME_OPTIONS.map(t => (
          <button
            key={t}
            className={`${styles.timeBtn} ${timeAvailable === t ? styles.timeBtnActive : ''}`}
            onClick={() => setTimeAvailable(t)}
          >
            {t} min
          </button>
        ))}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button
        className="btn-primary"
        onClick={handleGenerate}
        disabled={!vocalState}
        style={{ width: '100%', marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
      >
        Generate My Session <ChevronRight size={16} />
      </button>

      <p className={styles.hint}>
        <Mic size={11} /> {getDoshaKaal()}
      </p>
    </div>
  )
}

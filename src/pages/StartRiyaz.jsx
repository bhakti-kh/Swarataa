import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Clock, PlayCircle, Loader2, Sun, Wind, Music, Heart } from 'lucide-react'
import styles from './StartRiyaz.module.css'

const TIME_OPTIONS = [
  { value: 10, label: '10 min', desc: 'Quick session' },
  { value: 20, label: '20 min', desc: 'Standard session' },
  { value: 30, label: '30 min', desc: 'Full session' },
]

function getDoshaKaal() {
  const h = new Date().getHours()
  if (h >= 6 && h < 10) return { label: 'Kapha Kaal', time: '6–10 AM', raga: 'Raag Bhairav', desc: 'Deep alaap and sustained notes' }
  if (h >= 10 && h < 14) return { label: 'Pitta Kaal', time: '10 AM–2 PM', raga: 'Raag Sarang', desc: 'Fast taans and precision work' }
  if (h >= 14 && h < 18) return { label: 'Vata Kaal', time: '2–6 PM', raga: 'Raag Poorvi', desc: 'Improvisation and expression' }
  if (h >= 18 && h < 22) return { label: 'Kapha Kaal', time: '6–10 PM', raga: 'Raag Yaman', desc: 'Evening ragas, emotional depth' }
  return { label: 'Late Night', time: '10 PM–6 AM', raga: 'Raag Darbari', desc: 'Rest or light humming only' }
}

function buildSessionPlan(plan, totalMinutes) {
  const level = plan?.prakriti?.primary ? detectLevel(plan) : 'beginner'
  const dosha = getDoshaKaal()

  // Time distribution
  const warmupMins = Math.round(totalMinutes * 0.2)
  const alankarMins = Math.round(totalMinutes * 0.25)
  const ragaMins = Math.round(totalMinutes * 0.45)
  const cooldownMins = totalMinutes - warmupMins - alankarMins - ragaMins

  const warmupItems = plan?.riyazPlan?.warmup || ['Humming on Sa', 'Lip trills', 'Vowel exercises']
  const coreItems = plan?.riyazPlan?.core || ['Saral alankars', `${dosha.raga} aaroha-avaroha`, 'Slow alaap']
  const cooldownItems = plan?.riyazPlan?.cooldown || ['Soft humming', 'Deep breathing', 'Silence']

  return {
    level,
    totalMinutes,
    dosha,
    raga: plan?.riyazPlan ? extractRaga(plan.riyazPlan.core) || dosha.raga : dosha.raga,
    steps: [
      {
        id: 'warmup',
        phase: 'Warmup',
        emoji: '🌅',
        duration: warmupMins * 60,
        items: warmupItems.slice(0, 3),
        instruction: 'Start gently. Focus on breath and ease into your voice. No forcing.',
        videoCategory: 'warmup',
      },
      {
        id: 'alankars',
        phase: 'Alankar Practice',
        emoji: '🎵',
        duration: alankarMins * 60,
        items: coreItems.slice(0, 2),
        instruction: 'Systematic swara patterns. Slow first, then gradually increase pace.',
        videoCategory: 'alankars',
      },
      {
        id: 'raga',
        phase: 'Raga Riyaz',
        emoji: '🎼',
        duration: ragaMins * 60,
        items: coreItems.slice(2, 4).length ? coreItems.slice(2, 4) : [dosha.raga + ' practice', 'Alaap and bandish'],
        instruction: `Today's raga is ${plan?.riyazPlan ? extractRaga(plan.riyazPlan.core) || dosha.raga : dosha.raga}. Begin with slow alaap, then build to faster passages.`,
        videoCategory: 'raga',
      },
      {
        id: 'cooldown',
        phase: 'Cooldown',
        emoji: '🌙',
        duration: cooldownMins * 60,
        items: cooldownItems.slice(0, 2),
        instruction: 'Bring your voice down gently. Let the breath settle. End in silence.',
        videoCategory: 'cooldown',
      },
    ],
  }
}

function detectLevel(plan) {
  const exp = plan?.prakriti?.primary
  // Use experience from the quiz answer stored in scores
  const scores = plan?.prakriti?.scores
  if (!scores) return 'beginner'
  return 'intermediate' // default - can be improved
}

function extractRaga(coreItems) {
  if (!coreItems) return null
  const ragaKeywords = ['Yaman', 'Bhairav', 'Bhoopali', 'Todi', 'Marwa', 'Sarang', 'Darbari', 'Malkauns', 'Bhimpalasi', 'Poorvi']
  for (const item of coreItems) {
    for (const raga of ragaKeywords) {
      if (item.includes(raga)) return raga
    }
  }
  return null
}

export default function StartRiyaz({ plan, setSessionPlan }) {
  const navigate = useNavigate()
  const [time, setTime] = useState(20)
  const [generating, setGenerating] = useState(false)
  const dosha = getDoshaKaal()

  if (!plan) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyInner}>
          <span style={{ fontSize: 48 }}>🎵</span>
          <h2>Complete your Prakriti quiz first</h2>
          <p>Your riyaz session is personalized to your vocal constitution. Take the quiz to get started.</p>
          <button className="btn-primary" onClick={() => navigate('/onboarding')}>Take the Quiz →</button>
        </div>
      </div>
    )
  }

  const handleBegin = () => {
    setGenerating(true)
    setTimeout(() => {
      const session = buildSessionPlan(plan, time)
      setSessionPlan(session)
      navigate('/app/session')
    }, 1200)
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Start Riyaz</h1>
          <p>Your personalized session — generated from your vocal plan</p>
        </div>
        <div className={styles.doshaCard}>
          <Sun size={14} color="var(--saffron)" />
          <div>
            <span className={styles.doshaLabel}>{dosha.label} · {dosha.time}</span>
            <span className={styles.doshaRaga}>Recommended: {dosha.raga}</span>
          </div>
        </div>
      </div>

      {/* Plan summary */}
      <div className={styles.planSummary}>
        <div className={styles.planSummaryInner}>
          <Sparkles size={16} color="var(--saffron)" />
          <p className={styles.planSummaryText}>
            Based on your <strong>{plan.prakriti?.primary} prakriti</strong> plan ·
            Best practice time: <strong>{plan.riyazPlan?.bestTime || dosha.time}</strong>
          </p>
        </div>
      </div>

      {/* Time selection */}
      <div className="card" style={{ padding: 28 }}>
        <h3 className={styles.sectionTitle}>How much time do you have today?</h3>
        <div className={styles.timeGrid}>
          {TIME_OPTIONS.map(t => (
            <button
              key={t.value}
              className={`${styles.timeCard} ${time === t.value ? styles.timeCardActive : ''}`}
              onClick={() => setTime(t.value)}
            >
              <Clock size={18} color={time === t.value ? 'var(--saffron)' : 'var(--text-light)'} />
              <span className={styles.timeLabel}>{t.label}</span>
              <span className={styles.timeDesc}>{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Session preview */}
      <div className="card" style={{ padding: 28 }}>
        <h3 className={styles.sectionTitle}>Today's Session Preview</h3>
        <div className={styles.previewSteps}>
          {[
            { emoji: '🌅', phase: 'Warmup', mins: Math.round(time * 0.2), color: 'var(--soft-green)', items: plan.riyazPlan?.warmup?.slice(0, 2) || ['Humming on Sa', 'Lip trills'] },
            { emoji: '🎵', phase: 'Alankars', mins: Math.round(time * 0.25), color: 'var(--gold)', items: plan.riyazPlan?.core?.slice(0, 2) || ['Saral alankars', 'Swara patterns'] },
            { emoji: '🎼', phase: 'Raga Riyaz', mins: Math.round(time * 0.45), color: 'var(--saffron)', items: [dosha.raga + ' — ' + dosha.desc] },
            { emoji: '🌙', phase: 'Cooldown', mins: Math.max(1, time - Math.round(time * 0.2) - Math.round(time * 0.25) - Math.round(time * 0.45)), color: 'var(--deep-teal)', items: plan.riyazPlan?.cooldown?.slice(0, 2) || ['Soft humming', 'Deep breathing'] },
          ].map((step, i) => (
            <div key={i} className={styles.previewStep}>
              <div className={styles.previewStepLeft}>
                <span className={styles.previewEmoji}>{step.emoji}</span>
                <div>
                  <p className={styles.previewPhase}>{step.phase}</p>
                  <p className={styles.previewItems}>{step.items.join(' · ')}</p>
                </div>
              </div>
              <span className={styles.previewDuration} style={{ color: step.color }}>{step.mins} min</span>
            </div>
          ))}
        </div>
      </div>

      {/* Begin */}
      <button
        className="btn-primary"
        onClick={handleBegin}
        disabled={generating}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 17, padding: '18px 32px' }}
      >
        {generating ? (
          <><Loader2 size={18} className={styles.spin} /> Preparing your session...</>
        ) : (
          <><PlayCircle size={20} /> Begin {time}-Minute Session</>
        )}
      </button>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-light)', marginTop: -8 }}>
        Each step includes guided YouTube videos · Timer-based progression
      </p>
    </div>
  )
}

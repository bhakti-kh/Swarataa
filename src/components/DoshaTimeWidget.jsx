import { useState, useEffect } from 'react'
import { Wind, Flame, Droplets, Clock, Sparkles } from 'lucide-react'
import styles from './DoshaTimeWidget.module.css'

function getDoshaPeriod(hour) {
  if (hour >= 6 && hour < 10) return { dosha: 'kapha', label: 'Kapha Kaal', range: '6–10 AM', element: 'Earth + Water', qualities: ['Steady', 'Grounded', 'Stable'], advice: 'Perfect for deep alaap & slow-paced raags like Bhairav, Todi. Kapha stability supports sustained notes.', practice: 'Alaap & Vilambit Khayal', color: 'var(--soft-green)', bg: 'var(--light-teal)' }
  if (hour >= 10 && hour < 14) return { dosha: 'pitta', label: 'Pitta Kaal', range: '10 AM–2 PM', element: 'Fire + Water', qualities: ['Intense', 'Focused', 'Sharp'], advice: 'Peak energy for fast taans, layakari & challenging alankars. Pitta fuels precision and power.', practice: 'Taan & Drut Khayal', color: 'var(--saffron)', bg: 'rgba(232,135,58,0.08)' }
  if (hour >= 14 && hour < 18) return { dosha: 'vata', label: 'Vata Kaal', range: '2–6 PM', element: 'Air + Ether', qualities: ['Creative', 'Expressive', 'Mobile'], advice: 'Great for creative exploration — improvisation, bandish variations, and expressive meend practice.', practice: 'Improvisation & Meend', color: '#7B5EA7', bg: 'rgba(123,94,167,0.08)' }
  if (hour >= 18 && hour < 22) return { dosha: 'kapha', label: 'Kapha Kaal', range: '6–10 PM', element: 'Earth + Water', qualities: ['Calm', 'Deep', 'Resonant'], advice: 'Evening raags like Yaman, Bihag shine here. Kapha depth enriches resonance and emotional expression.', practice: 'Sandhya Raag & Bhajan', color: 'var(--soft-green)', bg: 'var(--light-teal)' }
  if (hour >= 22 || hour < 2) return { dosha: 'pitta', label: 'Pitta Kaal', range: '10 PM–2 AM', element: 'Fire + Water', qualities: ['Introspective', 'Digesting'], advice: 'Time for vocal rest & listening. Light humming only.', practice: 'Shravan & Vocal Rest', color: 'var(--saffron)', bg: 'rgba(232,135,58,0.08)' }
  return { dosha: 'vata', label: 'Vata Kaal', range: '2–6 AM', element: 'Air + Ether', qualities: ['Light', 'Subtle', 'Creative'], advice: 'Ideal for silent meditation & mental rehearsal. Voice is resting — avoid heavy singing.', practice: 'Dhyana & Swar Chintan', color: '#7B5EA7', bg: 'rgba(123,94,167,0.08)' }
}

const doshaIcons = { vata: Wind, pitta: Flame, kapha: Droplets }

export function DoshaTimeWidget({ plan }) {
  const [now, setNow] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t) }, [])

  const period = getDoshaPeriod(now.getHours())
  const Icon = doshaIcons[period.dosha]

  const prakritiScores = plan?.prakriti?.scores || { vata: 3, pitta: 4, kapha: 2 }
  const primaryDosha = plan?.prakriti?.primary || 'pitta'

  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Header */}
      <div className={styles.header} style={{ background: period.bg, borderBottom: `2px solid ${period.color}20` }}>
        <div className={styles.headerLeft}>
          <div className={styles.doshaIconWrap} style={{ background: period.color + '18' }}>
            <Icon size={18} color={period.color} />
          </div>
          <div>
            <p className={styles.headerLabel}>Dosha Kaal — Live</p>
            <h3 className={styles.headerTitle} style={{ color: period.color }}>{period.label}</h3>
            <p className={styles.headerElement}>{period.element}</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.time}><Clock size={13} color={period.color} /> {timeStr}</div>
          <p className={styles.timeRange}>{period.range}</p>
        </div>
      </div>

      <div className={styles.body}>
        {/* Qualities */}
        <div className={styles.qualities}>
          {period.qualities.map(q => (
            <span key={q} className={styles.quality} style={{ color: period.color, borderColor: period.color + '30', background: period.color + '10' }}>{q}</span>
          ))}
        </div>

        {/* Prakriti scores */}
        <div className={styles.doshaSection}>
          <div className={styles.doshaSectionHeader}>
            <Sparkles size={13} color="var(--text-light)" />
            <span className={styles.doshaSectionLabel}>Your Prakriti Correlation</span>
          </div>
          <div className={styles.doshaBars}>
            {[
              { d: 'vata', icon: Wind, color: '#7B5EA7' },
              { d: 'pitta', icon: Flame, color: 'var(--saffron)' },
              { d: 'kapha', icon: Droplets, color: 'var(--soft-green)' },
            ].map(({ d, icon: DIcon, color }) => {
              const score = prakritiScores[d] || 0
              const maxScore = Math.max(...Object.values(prakritiScores))
              const pct = maxScore > 0 ? (score / maxScore) * 100 : 0
              const isActive = d === period.dosha
              return (
                <div key={d} className={styles.doshaBarRow}>
                  <div className={styles.doshaBarLabel}>
                    <DIcon size={11} color={color} />
                    <span className={styles.doshaName}>{d.charAt(0).toUpperCase() + d.slice(1)}</span>
                    {d === primaryDosha && <span className={styles.dominant}>(dominant)</span>}
                    {isActive && <span className={styles.activeDot} style={{ background: color }} />}
                  </div>
                  <div className={styles.doshaTrack}>
                    <div className={styles.doshaFill} style={{ width: `${pct}%`, background: color, opacity: isActive ? 1 : 0.45 }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Advice */}
        <div className={styles.advice}>
          <p className={styles.adviceLabel}><Icon size={11} /> Recommended Now: {period.practice}</p>
          <p className={styles.adviceText}>{period.advice}</p>
        </div>
      </div>
    </div>
  )
}

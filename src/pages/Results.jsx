import { useNavigate } from 'react-router-dom'
import styles from './Results.module.css'

const DOSHA_COLORS = {
  vata: { bg: '#F0EAF8', accent: '#7B5EA7', label: 'Vata' },
  pitta: { bg: '#FFF0E8', accent: '#E8873A', label: 'Pitta' },
  kapha: { bg: '#E8F4F1', accent: '#4A7C6A', label: 'Kapha' },
}

export default function Results({ plan }) {
  const navigate = useNavigate()
  if (!plan) {
    return (
      <div className={styles.error}>
        <p>No results found. Please take the quiz first.</p>
        <button className="btn-primary" onClick={() => navigate('/quiz')}>Take Quiz</button>
      </div>
    )
  }

  const { prakriti, voiceProfile, riyazPlan, ayurveda, pranayama, yoga, swarSuraksha } = plan
  const primary = DOSHA_COLORS[prakriti.primary] || DOSHA_COLORS.vata
  const total = prakriti.scores.vata + prakriti.scores.pitta + prakriti.scores.kapha

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header} style={{ background: primary.bg }}>
        <div className={styles.headerInner}>
          <button className={styles.back} onClick={() => navigate('/')}>← Home</button>
          <div className={styles.doshaTag} style={{ background: primary.accent }}>
            {primary.label} Dominant
            {prakriti.secondary !== 'none' && ` · ${DOSHA_COLORS[prakriti.secondary]?.label || ''} Secondary`}
          </div>
          <h1 className={styles.title}>Your Vocal Health Plan</h1>
          <p className={styles.summary}>{prakriti.summary}</p>

          {/* Dosha bars */}
          <div className={styles.doshaBars}>
            {['vata', 'pitta', 'kapha'].map(d => (
              <div key={d} className={styles.doshaBar}>
                <span>{DOSHA_COLORS[d].label}</span>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${(prakriti.scores[d] / total) * 100}%`,
                      background: DOSHA_COLORS[d].accent
                    }}
                  />
                </div>
                <span className={styles.barNum}>{prakriti.scores[d]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.content}>

        {/* Voice Profile */}
        <section className={styles.section}>
          <h2>Your Voice Profile</h2>
          <div className={styles.twoCol}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle} style={{ color: primary.accent }}>✓ Strengths</h3>
              <ul className={styles.list}>
                {voiceProfile.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle} style={{ color: '#c0392b' }}>⚠ Watch Out For</h3>
              <ul className={styles.list}>
                {voiceProfile.vulnerabilities.map((v, i) => <li key={i}>{v}</li>)}
              </ul>
              <div className={styles.seasonal}>
                🌿 {voiceProfile.seasonalAdvice}
              </div>
            </div>
          </div>
        </section>

        {/* Riyaz Plan */}
        <section className={styles.section}>
          <h2>Your Personalized Riyaz Plan</h2>
          <div className={styles.riyazMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Best Time</span>
              <span className={styles.metaValue}>{riyazPlan.bestTime}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Session Duration</span>
              <span className={styles.metaValue}>{riyazPlan.duration}</span>
            </div>
          </div>
          <div className={styles.riyazPhases}>
            <div className={styles.phase}>
              <div className={styles.phaseHeader}>🌅 Warmup</div>
              {riyazPlan.warmup.map((w, i) => <div key={i} className={styles.phaseItem}>{w}</div>)}
            </div>
            <div className={styles.phase}>
              <div className={styles.phaseHeader}>🎵 Core Practice</div>
              {riyazPlan.core.map((c, i) => <div key={i} className={styles.phaseItem}>{c}</div>)}
            </div>
            <div className={styles.phase}>
              <div className={styles.phaseHeader}>🌙 Cool Down</div>
              {riyazPlan.cooldown.map((c, i) => <div key={i} className={styles.phaseItem}>{c}</div>)}
            </div>
          </div>
          <div className={styles.weeklyNote}>
            📅 {riyazPlan.weeklyStructure}
          </div>
        </section>

        {/* Ayurveda + Pranayama + Yoga */}
        <section className={styles.section}>
          <h2>Ayurveda & Holistic Support</h2>
          <div className={styles.threeCol}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>🥗 Diet</h3>
              <ul className={styles.list}>
                {ayurveda.dietTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
              <div className={styles.avoid}>
                <strong>Avoid:</strong> {ayurveda.toAvoid.join(', ')}
              </div>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>🌬️ Pranayama</h3>
              {pranayama.map((p, i) => (
                <div key={i} className={styles.practice}>
                  <div className={styles.practiceName}>{p.name} · {p.duration}</div>
                  <div className={styles.practiceDesc}>{p.benefit}</div>
                </div>
              ))}
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>🧘 Yoga</h3>
              {yoga.map((y, i) => (
                <div key={i} className={styles.practice}>
                  <div className={styles.practiceName}>{y.name}</div>
                  <div className={styles.practiceSanskrit}>{y.sanskrit}</div>
                  <div className={styles.practiceDesc}>{y.benefit}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SwarSuraksha */}
        <section className={styles.swarSection}>
          <div className={styles.swarInner}>
            <h2>🌿 SwarSuraksha — Your Herb Kit</h2>
            <p className={styles.swarSubtitle}>{swarSuraksha.kitName}</p>
            <div className={styles.herbGrid}>
              {swarSuraksha.herbs.map((h, i) => (
                <div key={i} className={styles.herbCard}>
                  <div className={styles.herbName}>{h.name}</div>
                  <div className={styles.herbForm}>{h.form}</div>
                  <div className={styles.herbBenefit}>{h.benefit}</div>
                </div>
              ))}
            </div>
            <div className={styles.gargle}>
              <strong>Morning Gargle:</strong> {swarSuraksha.morningGargle}
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className={styles.actions}>
          <button className="btn-secondary" onClick={() => navigate('/quiz')}>Retake Quiz</button>
          <button className="btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        </div>
      </div>
    </div>
  )
}

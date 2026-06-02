import { useNavigate } from 'react-router-dom'
import styles from './RiyazFramework.module.css'

const LEVELS = [
  {
    level: 'Fresher / Beginner',
    duration: '30–45 min',
    color: '#E8F4F1',
    accent: '#4A7C6A',
    focus: 'Foundation — Sa, Ma, Pa, basic alankars, breath control',
    phases: [
      { name: 'Warmup', time: '10 min', items: ['Humming on Sa', 'Vowel exercises (Aa, Ee, Oo)', 'Lip trills for breath support'] },
      { name: 'Swara Abhyas', time: '15 min', items: ['Shadja sthapana (finding Sa)', 'Saral alankars: 1–2–3–4–5', 'Practice in lower octave only'] },
      { name: 'Raga Introduction', time: '10 min', items: ['Simple raga like Yaman or Bhoopali', 'Aaroha–Avaroha practice', 'Slow alaap'] },
      { name: 'Cool Down', time: '5 min', items: ['Humming on Sa–Pa', 'Deep breathing', 'Complete silence (2 min)'] },
    ],
  },
  {
    level: 'Intermediate',
    duration: '60–90 min',
    color: '#FFF0E8',
    accent: '#E8873A',
    focus: 'Expression — taans, layakari, expanding raga repertoire',
    phases: [
      { name: 'Warmup', time: '15 min', items: ['Mandodatta exercises', 'Meend practice across octaves', 'Gamak exercises'] },
      { name: 'Alankars', time: '20 min', items: ['Complex alankars (5+ note patterns)', 'Layakari: vilambit, madhya', 'Taan patterns: seedhi, vakra'] },
      { name: 'Raga Practice', time: '40 min', items: ['Deep alaap in chosen raga', 'Vilambit khyal — bandish + badhat', 'Drut khyal with taans'] },
      { name: 'Cool Down', time: '10 min', items: ['Soft bhajan or folk melody', 'Humming cool-down', 'Breath awareness rest'] },
    ],
  },
  {
    level: 'Advanced',
    duration: '90–180 min',
    color: '#F0EAF8',
    accent: '#7B5EA7',
    focus: 'Mastery — improvisation, layakari, voice stamina',
    phases: [
      { name: 'Warmup', time: '20 min', items: ['Full range swara exercises', 'Murchhana practice', 'Complex gamak and andolan'] },
      { name: 'Deep Practice', time: '60+ min', items: ['Extended alaap with full raga exploration', 'Bandish mastery — multiple ragas', 'Advanced taan constructions', 'Sur-bahar or additional instrument practice if applicable'] },
      { name: 'Improvisation', time: '30 min', items: ['Free raga improvisation', 'Sargam patterns across ragas', 'Layakari experiments: tigun, chaugun'] },
      { name: 'Cool Down', time: '15 min', items: ['Slow vilambit alaap', 'Quiet humming', 'Vocal rest with steam if needed'] },
    ],
  },
]

const SWAR_SAMAY = [
  { time: '4–7 AM', ragas: 'Bhairav, Lalit, Todi', dosha: 'Kapha hour', note: 'Best for Kapha singers — voice is heavy and full' },
  { time: '7–10 AM', ragas: 'Bilawal, Alhaiya Bilawal', dosha: 'Transition', note: 'Good for all doshas — moderate energy' },
  { time: '10 AM–1 PM', ragas: 'Sarang, Shuddha Sarang', dosha: 'Pitta hour', note: 'Pitta singers peak — strong projection and clarity' },
  { time: '4–7 PM', ragas: 'Poorvi, Marwa, Shree', dosha: 'Transition', note: 'Vata singers prefer this calm transition window' },
  { time: '7–10 PM', ragas: 'Yaman, Bhimpalasi, Darbari', dosha: 'Kapha returns', note: 'Evening ragas — emotional depth, ideal for khyal' },
  { time: '10 PM–1 AM', ragas: 'Darbari Kanada, Malkauns', dosha: 'Night ragas', note: 'Late-night ragas — deep, meditative, for advanced singers' },
]

export default function RiyazFramework() {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <button className={styles.back} onClick={() => navigate('/')}>← Back to Home</button>
        <button className="btn-primary" onClick={() => navigate('/quiz')}>Get My Personal Plan →</button>
      </nav>

      <div className={styles.hero}>
        <h1>The Riyaz Framework</h1>
        <p>A structured approach to Hindustani classical vocal practice — from first lessons to mastery.</p>
      </div>

      {/* Levels */}
      <section className={styles.section}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Practice by Level</h2>
          <div className={styles.levels}>
            {LEVELS.map(level => (
              <div key={level.level} className={styles.levelCard} style={{ borderTop: `4px solid ${level.accent}` }}>
                <div className={styles.levelHeader} style={{ background: level.color }}>
                  <div>
                    <div className={styles.levelBadge} style={{ background: level.accent }}>{level.level}</div>
                    <div className={styles.levelMeta}>
                      <span>⏱ {level.duration}</span>
                    </div>
                  </div>
                  <p className={styles.levelFocus}>{level.focus}</p>
                </div>
                <div className={styles.phases}>
                  {level.phases.map(phase => (
                    <div key={phase.name} className={styles.phase}>
                      <div className={styles.phaseHeader}>
                        <span>{phase.name}</span>
                        <span className={styles.phaseTime}>{phase.time}</span>
                      </div>
                      <ul>
                        {phase.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Swar Samay */}
      <section className={styles.swarSamay}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitleLight}>Swar Samay — Raga Time Theory</h2>
          <p className={styles.swarDesc}>
            Each raga in Hindustani classical music has an ideal time of day for performance,
            aligned with the body's natural rhythms and the three doshas.
          </p>
          <div className={styles.timeGrid}>
            {SWAR_SAMAY.map(s => (
              <div key={s.time} className={styles.timeCard}>
                <div className={styles.timeBadge}>{s.time}</div>
                <div className={styles.timeRagas}>{s.ragas}</div>
                <div className={styles.timeDosha}>{s.dosha}</div>
                <div className={styles.timeNote}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Find Your Personalized Riyaz Time</h2>
        <p>Take the Prakriti quiz to get a riyaz schedule and raga recommendations matched to your constitution.</p>
        <button className="btn-primary" onClick={() => navigate('/quiz')}>
          Discover My Prakriti →
        </button>
      </section>
    </div>
  )
}

import { useState } from 'react'
import { BookOpen, Music, Wind, Heart, Play, Clock } from 'lucide-react'
import styles from './Library.module.css'

const categories = [
  { label: 'Alankars', icon: Music, color: 'var(--saffron)', count: 24 },
  { label: 'Ragas', icon: Music, color: 'var(--deep-teal)', count: 36 },
  { label: 'Pranayama', icon: Wind, color: 'var(--soft-green)', count: 12 },
  { label: 'Yogasana', icon: Heart, color: 'var(--gold)', count: 18 },
]

const resources = [
  { title: 'Saral Alankar 1–5', category: 'Alankars', level: 'Beginner', duration: '10 min', color: 'var(--saffron)' },
  { title: 'Raag Yaman — Aaroha Avaroha', category: 'Ragas', level: 'Intermediate', duration: '20 min', color: 'var(--deep-teal)' },
  { title: 'Bhramari Pranayama', category: 'Pranayama', level: 'All levels', duration: '8 min', color: 'var(--soft-green)' },
  { title: 'Raag Bhairav — Morning Practice', category: 'Ragas', level: 'Intermediate', duration: '25 min', color: 'var(--deep-teal)' },
  { title: 'Kapalbhati for Singers', category: 'Pranayama', level: 'Beginner', duration: '5 min', color: 'var(--soft-green)' },
  { title: 'Vakra Alankars', category: 'Alankars', level: 'Advanced', duration: '15 min', color: 'var(--saffron)' },
  { title: 'Sarvangasana for Voice', category: 'Yogasana', level: 'Intermediate', duration: '12 min', color: 'var(--gold)' },
  { title: 'Taan Patterns — Basic', category: 'Alankars', level: 'Intermediate', duration: '18 min', color: 'var(--saffron)' },
]

const RIYAZ_LADDER = [
  {
    level: 'Fresher / Beginner',
    duration: '30–45 min',
    accent: 'var(--soft-green)',
    focus: 'Foundation — Sa, Ma, Pa, basic alankars, breath control',
    phases: [
      { name: '🌅 Warmup', time: '10 min', items: ['Humming on Sa', 'Vowel exercises (Aa, Ee, Oo)', 'Lip trills for breath support'] },
      { name: '🎵 Swara Abhyas', time: '15 min', items: ['Shadja sthapana', 'Saral alankars: 1–2–3–4–5', 'Practice in lower octave only'] },
      { name: '🎼 Raga Intro', time: '10 min', items: ['Yaman or Bhoopali', 'Aaroha–Avaroha practice', 'Slow alaap'] },
      { name: '🌙 Cool Down', time: '5 min', items: ['Humming on Sa–Pa', 'Deep breathing', 'Silence (2 min)'] },
    ],
  },
  {
    level: 'Intermediate',
    duration: '60–90 min',
    accent: 'var(--saffron)',
    focus: 'Expression — taans, layakari, expanding raga repertoire',
    phases: [
      { name: '🌅 Warmup', time: '15 min', items: ['Mandodatta exercises', 'Meend practice across octaves', 'Gamak exercises'] },
      { name: '🎵 Alankars', time: '20 min', items: ['Complex alankars (5+ notes)', 'Layakari: vilambit, madhya', 'Taan patterns: seedhi, vakra'] },
      { name: '🎼 Raga Practice', time: '40 min', items: ['Deep alaap in chosen raga', 'Vilambit khyal + badhat', 'Drut khyal with taans'] },
      { name: '🌙 Cool Down', time: '10 min', items: ['Soft bhajan', 'Humming cool-down', 'Breath awareness'] },
    ],
  },
  {
    level: 'Advanced',
    duration: '90–180 min',
    accent: '#7B5EA7',
    focus: 'Mastery — improvisation, layakari, voice stamina',
    phases: [
      { name: '🌅 Warmup', time: '20 min', items: ['Full range swara exercises', 'Murchhana practice', 'Complex gamak and andolan'] },
      { name: '🎵 Deep Practice', time: '60+ min', items: ['Extended alaap', 'Bandish mastery', 'Advanced taan constructions'] },
      { name: '🎼 Improvisation', time: '30 min', items: ['Free raga improvisation', 'Sargam patterns', 'Layakari: tigun, chaugun'] },
      { name: '🌙 Cool Down', time: '15 min', items: ['Slow vilambit alaap', 'Quiet humming', 'Vocal rest'] },
    ],
  },
]

const SWAR_SAMAY = [
  { time: '4–7 AM', ragas: 'Bhairav, Lalit, Todi', note: 'Kapha hour — voice is heavy and full' },
  { time: '7–10 AM', ragas: 'Bilawal, Alhaiya Bilawal', note: 'Good for all doshas' },
  { time: '10 AM–1 PM', ragas: 'Sarang, Shuddha Sarang', note: 'Pitta hour — strong projection' },
  { time: '4–7 PM', ragas: 'Poorvi, Marwa, Shree', note: 'Vata hour — creative exploration' },
  { time: '7–10 PM', ragas: 'Yaman, Bhimpalasi, Darbari', note: 'Evening — emotional depth' },
  { time: '10 PM–1 AM', ragas: 'Darbari Kanada, Malkauns', note: 'Late night — advanced singers only' },
]

export default function Library() {
  const [tab, setTab] = useState('resources')

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Library</h1>
        <p>Practice resources and reference materials</p>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === 'resources' ? styles.tabActive : ''}`} onClick={() => setTab('resources')}>Resources</button>
        <button className={`${styles.tab} ${tab === 'riyaz' ? styles.tabActive : ''}`} onClick={() => setTab('riyaz')}>Riyaz Ladder</button>
        <button className={`${styles.tab} ${tab === 'swarsamay' ? styles.tabActive : ''}`} onClick={() => setTab('swarsamay')}>Swar Samay</button>
      </div>

      {tab === 'resources' && (
        <>
          <div className={styles.categories}>
            {categories.map(c => (
              <div key={c.label} className={`card ${styles.catCard}`}>
                <div className={styles.catIcon} style={{ background: c.color + '15' }}><c.icon size={20} color={c.color} /></div>
                <p className={styles.catLabel}>{c.label}</p>
                <p className={styles.catCount} style={{ color: c.color }}>{c.count} items</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className={styles.sectionTitle}>All Resources</h2>
            <div className={styles.resourceList}>
              {resources.map((r, i) => (
                <div key={i} className={`card ${styles.resource}`}>
                  <div className={styles.resourceLeft}>
                    <div className={styles.resourceIcon} style={{ background: r.color + '15' }}><Play size={13} color={r.color} style={{ marginLeft: 1 }} /></div>
                    <div>
                      <p className={styles.resourceTitle}>{r.title}</p>
                      <div className={styles.resourceMeta}>
                        <span className={styles.resourceCat} style={{ color: r.color }}>{r.category}</span>
                        <span>·</span><span>{r.level}</span>
                      </div>
                    </div>
                  </div>
                  <span className={styles.resourceDuration}><Clock size={11} /> {r.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'swarsamay' && (
        <div className={styles.swarSamayTab}>
          <p className={styles.riyazNote}>
            🕐 Each raga in Hindustani classical music has an ideal time of day — aligned with the body's natural rhythms and the three doshas. Your personalized riyaz timing is in <strong>My Vocal Plan</strong>.
          </p>
          <div className={styles.swarGrid}>
            {SWAR_SAMAY.map(s => (
              <div key={s.time} className={styles.swarCard}>
                <p className={styles.swarTime}>{s.time}</p>
                <p className={styles.swarRagas}>{s.ragas}</p>
                <p className={styles.swarNote2}>{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'riyaz' && (
        <div className={styles.riyazLadder}>
          <p className={styles.riyazNote}>
            📖 Reference guide — this is a read-only Riyaz Ladder. Your personalized riyaz schedule based on your prakriti is in <strong>My Vocal Plan</strong>.
          </p>

          <div className={styles.levels}>
            {RIYAZ_LADDER.map(level => (
              <div key={level.level} className="card" style={{ padding: 0, overflow: 'hidden', borderTop: `3px solid ${level.accent}` }}>
                <div className={styles.levelHeader} style={{ background: level.accent + '12' }}>
                  <div>
                    <span className={styles.levelBadge} style={{ background: level.accent }}>{level.level}</span>
                    <span className={styles.levelDuration}>⏱ {level.duration}</span>
                  </div>
                  <p className={styles.levelFocus}>{level.focus}</p>
                </div>
                <div className={styles.levelPhases}>
                  {level.phases.map(phase => (
                    <div key={phase.name} className={styles.levelPhase}>
                      <div className={styles.phaseRow}>
                        <span className={styles.phaseName}>{phase.name}</span>
                        <span className={styles.phaseTime}>{phase.time}</span>
                      </div>
                      <ul className={styles.phaseItems}>
                        {phase.items.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  )
}

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

export default function Library() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Practice Library</h1>
        <p>Alankars, ragas, pranayama, and yogasana — all in one place</p>
      </div>

      <div className={styles.categories}>
        {categories.map(c => (
          <div key={c.label} className="card" style={{ cursor: 'pointer', transition: 'transform 0.15s' }}>
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
                <div className={styles.resourceIcon} style={{ background: r.color + '15' }}><Play size={14} color={r.color} style={{ marginLeft: 1 }} /></div>
                <div>
                  <p className={styles.resourceTitle}>{r.title}</p>
                  <div className={styles.resourceMeta}>
                    <span className={styles.resourceCat} style={{ color: r.color }}>{r.category}</span>
                    <span>·</span>
                    <span>{r.level}</span>
                  </div>
                </div>
              </div>
              <span className={styles.resourceDuration}><Clock size={11} /> {r.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

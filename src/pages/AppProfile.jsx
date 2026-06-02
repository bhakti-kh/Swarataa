import { User, Music, Award, Settings, Bell, Shield, CreditCard } from 'lucide-react'
import styles from './AppProfile.module.css'

const COMING_FIELDS = [
  { icon: Music, label: 'Gharana / Tradition', placeholder: 'e.g. Kirana, Gwalior, Jaipur-Atrauli' },
  { icon: Award, label: 'Certifications & Exams', placeholder: 'e.g. Sangeet Visharad, Bhatkhande Level 3' },
  { icon: User, label: 'Guru / Teacher', placeholder: "Your current guru's name" },
  { icon: Music, label: 'Instruments', placeholder: 'e.g. Harmonium, Tanpura' },
]

const COMING_SECTIONS = [
  { icon: Bell, label: 'Notifications', desc: 'Riyaz reminders, streak alerts, community updates' },
  { icon: Shield, label: 'Privacy & Data', desc: 'Manage your data, download or delete your account' },
  { icon: CreditCard, label: 'Subscription', desc: 'SwarSuraksha kit, premium features' },
  { icon: Settings, label: 'Preferences', desc: 'Tanpura tuning, session defaults, language' },
]

export default function AppProfile({ user }) {
  const name = user?.displayName || 'Singer'
  const email = user?.email || ''
  const photo = user?.photoURL

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Profile</h1>
        <p>Your identity on Swarataa</p>
      </div>

      {/* Identity card */}
      <div className="card">
        <div className={styles.identity}>
          <div className={styles.avatarWrap}>
            {photo
              ? <img src={photo} className={styles.avatar} referrerPolicy="no-referrer" alt={name} />
              : <div className={styles.avatarFallback}>{name.charAt(0)}</div>
            }
          </div>
          <div>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.email}>{email}</p>
            <p className={styles.since}>Member since 2025</p>
          </div>
        </div>
      </div>

      {/* Singer profile fields — Coming Soon */}
      <div className="card">
        <div className={styles.sectionHeader}>
          <h3>Singer Profile</h3>
          <span className={styles.comingSoon}>Full profile — Coming Soon</span>
        </div>
        <div className={styles.fields}>
          {COMING_FIELDS.map(f => (
            <div key={f.label} className={styles.field}>
              <div className={styles.fieldIcon}><f.icon size={15} color="var(--text-light)" /></div>
              <div className={styles.fieldBody}>
                <label className={styles.fieldLabel}>{f.label}</label>
                <div className={styles.fieldInput}>{f.placeholder}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings sections — Coming Soon */}
      <div className="card">
        <div className={styles.sectionHeader}>
          <h3>Settings</h3>
          <span className={styles.comingSoon}>Coming Soon</span>
        </div>
        <div className={styles.settingsList}>
          {COMING_SECTIONS.map(s => (
            <div key={s.label} className={styles.settingItem}>
              <div className={styles.settingIcon}><s.icon size={16} color="var(--text-light)" /></div>
              <div>
                <p className={styles.settingLabel}>{s.label}</p>
                <p className={styles.settingDesc}>{s.desc}</p>
              </div>
              <span className={styles.settingArrow}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

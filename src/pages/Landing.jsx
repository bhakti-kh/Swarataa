import { useNavigate } from 'react-router-dom'
import { signOutUser } from '../utils/firebase'
import { useLanguage } from '../context/LanguageContext'
import styles from './Landing.module.css'

export default function Landing({ user, hasPlan }) {
  const navigate = useNavigate()
  const { lang, changeLang, t } = useLanguage()

  const handleCTA = () => {
    if (user && hasPlan) navigate('/app/dashboard')
    else if (user) navigate('/quiz')
    else navigate('/login')
  }

  return (
    <div className={styles.page}>
      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>स्व</span>
          <span className={styles.logoText}>Swarataa</span>
        </div>
        <div className={styles.navRight}>
          {/* Plan language switcher */}
          <div className={styles.langSwitcher}>
            <span className={styles.langSwitcherLabel}>Plan:</span>
            {['en', 'hi', 'mr'].map(code => (
              <button key={code} className={`${styles.langBtn} ${lang === code ? styles.langBtnActive : ''}`} onClick={() => changeLang(code)} title={`Generate your vocal plan in ${code === 'en' ? 'English' : code === 'hi' ? 'Hindi' : 'Marathi'}`}>
                {code === 'en' ? 'EN' : code === 'hi' ? 'हिं' : 'म'}
              </button>
            ))}
          </div>
          {user ? (
            <div className={styles.userArea}>
              {user.photoURL && <img src={user.photoURL} className={styles.avatar} alt={user.displayName} referrerPolicy="no-referrer" />}
              <span className={styles.userName}>{user.displayName?.split(' ')[0]}</span>
              <button className="btn-primary" onClick={() => navigate('/app/dashboard')} style={{ padding: '10px 20px', fontSize: 14 }}>
                Go to App
              </button>
              <button className={styles.signOut} onClick={() => signOutUser()}>Sign out</button>
            </div>
          ) : (
            <button className="btn-primary" onClick={() => navigate('/login')} style={{ padding: '10px 24px', fontSize: 14 }}>
              Sign in
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>AI-Powered Vocal Health</div>
          <h1 className={styles.heroTitle}>
            Harmonize Your Voice,<br />
            <span className={styles.accent}>Harmonize Your Life</span>
          </h1>
          <p className={styles.heroSub}>
            A personalized vocal health companion for Hindustani classical singers —
            blending Ayurveda, pranayama, and modern voice science into one guided practice.
          </p>
          <div className={styles.heroCta}>
            <button className="btn-primary" onClick={handleCTA}>
              {user && hasPlan ? t.goToDashboard : t.getStarted}
            </button>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.chakra}>
            <div className={styles.chakraRing1} />
            <div className={styles.chakraRing2} />
            <div className={styles.chakraRing3} />
            <div className={styles.chakraCenter}>
              <span>स्व</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>What Swarataa Offers</h2>
        <div className={styles.featureGrid}>
          {FEATURES.map(f => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.aiCta}>
        <div className={styles.aiCtaInner}>
          <h2>Your Personalized Vocal Plan</h2>
          <p>
            Answer 10 research-backed questions about your body, voice, and practice.
            Our AI generates a personalized riyaz schedule, Ayurvedic recommendations,
            and your SwarSuraksha herb kit — in under 2 minutes.
          </p>
          <button className="btn-primary" onClick={handleCTA}>
            {user && hasPlan ? 'View My Plan' : 'Get Started Free'}
          </button>
          <p className={styles.disclaimer}>
            Based on classical Ayurvedic texts and vocal science research
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>स्व</span>
          <span className={styles.logoText}>Swarataa</span>
        </div>
        <p>© 2025 Swarataa</p>
      </footer>
    </div>
  )
}

const FEATURES = [
  { icon: '🎵', title: 'Personalized Vocal Plan', desc: 'AI-generated riyaz schedule based on your prakriti, experience level, and Swar Samay timing.' },
  { icon: '🌿', title: 'SwarSuraksha Herb Kit', desc: 'Curated Ayurvedic herb recommendations matched to your dosha and vocal needs.' },
  { icon: '🧘', title: 'Yoga & Pranayama', desc: 'Targeted breathwork, yogasana, and chakradhyan practices to support your voice.' },
  { icon: '🤖', title: 'Guru AI Check-In', desc: 'Daily AI coaching — tell us how your voice feels, get a personalized session plan instantly.' },
]
